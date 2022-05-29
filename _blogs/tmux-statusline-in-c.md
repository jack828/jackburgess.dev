---json
{
  "published": false,
  "title": "A tmux statusline in C",
  "sell": "Because when the need for speed is too great, you always go a level down.",
  "coverImage": "https://img.clock.co.uk/1280x720",
  "coverImageSquare": "https://img.clock.co.uk/720x720",
  "tags": ["TMUX", "C"],
  "date": "2022-01-17T04:20:00.000Z"
}
---

# TMUX Statusline in C

Those of us that _love_ tmux usually _love_ having a convienient display of handy information in their statusline (TODO: link docs)

In my setup, I have my window information on the left hand side and my custom statusline on the right hand side.

There's a long list of benefits (and drawbacks) to cramming information in the statusline - you can very quickly grow it larger than the size of your screen! Or, more often than not, fill it with stuff you'll never think to look at.

Most people opt for something relatively basic - especially if they've grabbed something from a Tmux quick start guide (not that this is bad, everyone starts off somehow!):

```

set -g status-left ''
set-option -ag status-right '#[fg=colour234,bold,bg=colour12] %R '

setw -g window-status-format '#[fg=colour236,bold,bg=colour180] #I #[fg=colour180,bold,bg=colour236] #W '
setw -g window-status-current-format '#[fg=colour180,bold,bg=colour236] #I #[fg=colour236,bold,bg=colour180] #W '
```

> For those unfamiliar with tmux configuration, all the above does is set `status-left` to blank, `status-right` to the current time, and then set the `window-status-{,current-}format` options. The colours are derived from the 256 colour set, visible here: [jonasjacek.github.io/colors](https://jonasjacek.github.io/colors/).

And eventually, they expand upon it, trying to split things out using the append option `a` to try and bring meaning to the mayhem:

```
## Power
set-option -ag status-right '#[fg=colour231,bg=colour237] #(grep -q 1 /sys/class/power_supply/AC/online && echo "#[fg=colour118,bold]AC ⌁" || printf '%%04s' $(cat /sys/class/power_supply/BAT0/capacity)%%) '
## CPU Temp
set-option -ag status-right '#[fg=colour231,bg=colour236] #(sed s/...$/°C/ /sys/class/hwmon/hwmon1/temp1_input) '

## VPN status
set-option -ag status-right '#[fg=colour231,bg=colour237] #(grep "wg0:" /proc/net/dev -q && echo "#[fg=colour118,bold]VPN ↑" || echo "#[fg=colour196,bold]VPN ↓") '
## Day Month, Year
set-option -ag status-right '#[fg=colour146,bold,bg=colour236] %d #[fg=colour176,bold,bg=colour236]%B, #[fg=colour173,bold,bg=colour236]%Y#[fg=default] '
## Time
set-option -ag status-right '#[fg=colour234,bold,bg=colour12] %R '
```

This is more complicated to explain - but it remains _relatively simple_[^citation needed]. It does use some shell wizardry to optimise - which we'll get onto in a moment.

# Optimising Statuslines

As with anything your computer does, it requires processing power - CPU, RAM, and battery are all used. The more it does, the more it will use.

This will normally only be noticeable exceptional circumstances, but, if it's there to optimise, why not optimise it?

Take this line to infer VPN status for example:

```
set -g status-right 'VPN: #(ifconfig | grep "^wg0" -q && echo "Connected" || echo "Disconnected")'
```

This calls `ifconfig` - with all the overhead - just to see if a particular string is within the output.


We can run this though a simple shell command using the power of `zsh`'s `typeset` command (TODO: expand? https://unix.stackexchange.com/a/204807)

^ precision, overhead compared to `date -%s%N`

```zsh
#!/bin/zsh

typeset -F SECONDS=0

# Command under test, discard output
ifconfig > /dev/null

echo $SECONDS
```

Then run through a `for` loop:

```
# for i in {1..100}; do ./timer.sh; done | awk -v OFMT='%f' '{sum += $0} END {print sum / NR}'
```

On my machine, running this gives me an average execution time for:

`ifconfig | grep "^wg0" -q && echo "Connected" || echo "Disconnected" > /dev/null`

of:

`0.001599` seconds, or `1.599` milliseconds - not great, not terrible!

We can improve this significantly, just by removing the call to `ifconfig` and all it's overhead. Looking closer at how WireGuard configures interfaces, we can see that a file exists if the interface is connected:

```
/proc/net/dev_snmp6/wg0
```
>File location and naming will differ per-system and per-interface.

We can then re-write the command as:

```
test -f /proc/net/dev_snmp6/wg0 && echo "Connected" || echo "Disconnected" > /dev/null
```

And re-run to see the improvement:

`0.000054` seconds, or `0.054` milliseconds, over **30x better!**

## Super-speed!

Can we make this even faster? We can certainly try!

Now that we've optimised out `ifconfig` the core logic is clear. Check for a file, and output something based on that.

We can easily re-write this in C:

```c
#include <stdio.h>
#include <sys/stat.h>

#define WIREGUARD_INTERFACE_FILE "/proc/net/dev_snmp6/wg0"

int main () {
  struct stat buffer;
  int exists = stat(WIREGUARD_INTERFACE_FILE, &buffer);
  if (exists == 0) {
    fputs("Connected", stdout);
  } else {
    fputs("Disconnected", stdout);
  }
}
```

Compiling with defaults enabled `gcc -o vpncheck.c vpncheck` and amending our test script gives us a runtime of:

`0.000652` seconds, or `0.652` milliseconds.

We're **10x worse** now :c

But, it's not all bad here. Rewriting just this one section of the statusline in C gives us a good start to expand the script into capturing and outputting _all_ of our statusline information.

## The Full Monty

Despite our C underperforming an optimised oneliner by an order of magnitude, we'll compare it's performance when expanded to a full statusline.

Taking the original config version first:

```bash
## Power
grep -q 1 /sys/class/power_supply/AC/online && echo "AC ⌁" || printf '%%04s' $(cat /sys/class/power_supply/BAT0/capacity)%%
## CPU Temp
sensors | rg Package | cut -d" " -f5 | sed "s/.//" | sed "s/\.0//"

## VPN status
grep "wg0:" /proc/net/dev -q && echo "VPN ↑" || echo "VPN ↓"
## Day Month, Year
# These are calls to strftime under the hood. Here we replace with "date" to emulate what bash can do.
date "+%d %B, %Y %R"
```
> NOTE: For the sake of demonstration, and tidyness, I've removed the `set-option` calls and the colour configuration.

And a version written in C:

```c
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/ioctl.h>
#include <sys/stat.h>
#include <time.h>

#define AC_STATUS_FILE "/sys/class/power_supply/AC/online"
#define BATTERY_LEVEL_FILE "/sys/class/power_supply/BAT0/capacity"
#define CPU_TEMP_FILE "/sys/class/hwmon/hwmon1/temp1_input"
#define WIREGUARD_INTERFACE_FILE "/proc/net/dev_snmp6/wg0"

int main() {
  /* Power */

  FILE *acStatusFile = fopen(AC_STATUS_FILE, "r");
  char acStatus = fgetc(acStatusFile);
  fclose(acStatusFile);

  if (acStatus == '1') {
    fputs(" AC ⌁ ", stdout);
  } else {
    FILE *batteryLevelFile = fopen(BATTERY_LEVEL_FILE, "r");

    char batteryLevelString[4];
    fgets(batteryLevelString, 4, batteryLevelFile);
    fclose(batteryLevelFile);

    int batteryLevel = atoi(batteryLevelString);
    fprintf(stdout, " %2d %% ", batteryLevel);
  }

  /* CPU Temp */
  FILE *cpuTempFile = fopen(CPU_TEMP_FILE, "r");
  char cpuTempString[3];
  fgets(cpuTempString, 3, cpuTempFile);
  fclose(cpuTempFile);

  int cpuTemp = atoi(cpuTempString);
  fprintf(stdout, " %d°C ", cpuTemp);

  /* VPN Status */
  struct stat buffer;
  int exists = stat(WIREGUARD_INTERFACE_FILE, &buffer);
  if (exists == 0) {
    fputs(" VPN ↑ ", stdout);
  } else {
    fputs(" VPN ↓ ", stdout);
  }

  /* Day Month, Year */
  char day[3];
  char month[10];
  char year[5];
  time_t rawtime;
  struct tm *info;

  time(&rawtime);
  info = localtime(&rawtime);

  strftime(day, sizeof(day), "%d", info);
  strftime(month, sizeof(month), "%B", info);
  strftime(year, sizeof(year), "%Y", info);

  fprintf(stdout, " %s %s, %s", day, month, year);

  /* Time 24HR */
  char time[6];
  strftime(time, sizeof(time), "%R", info);

  fprintf(stdout, " %s ", time);

  return 0;
}
```

Now we can compare the average run times of each:

| Bash | C |
|------|---|
| 0.006552 | 0.002400 |

#### Notes

With all the [awesome-tmux plugins available](https://github.com/rothgar/awesome-tmux) this can really quickly become unwieldy.
