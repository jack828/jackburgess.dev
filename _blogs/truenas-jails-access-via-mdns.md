---json
{
  "published": false,
  "title": "Easy access to TrueNAS jails via mDNS",
  "sell": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "coverImage": "https://img.clock.co.uk/1280x720",
  "coverImageSquare": "https://img.clock.co.uk/720x720",
  "tags": ["TrueNAS", "mDNS", "jails"],
  "date": "2020-06-27T18:00:00.828Z"
}
---

## Preamble

So you've got yourself quite the setup now, right? A kick-ass TrueNAS with way more storage than you managed to rationalise to your partner (you'll need more...) and you've been setting up services left, right, and centre.

Your bookmarks folder on your browser is getting quite full - and you can only tell what goes where by the bookmark name - the IP address & port are a forgotten memory from the day you set it up.

But then, you realise you've setup one service a little differently...the jail it's in is assigned a local IP by DHCP! You forgot to set a static one for it!

Wouldn't it be great if you could access all these services using their name? Just whack in `http://netdata` into the browser bar and bam, [Netdata](https://www.netdata.cloud/)!

Well, I've done quite a bit of ~googling~ duckduckgo-ing on this topic and couldn't find a solution that didn't require adding entries to my hosts file or one that was as plug'n'play as I wanted.

So, I figured out my own way!

This uses zeroconf mDNS to advertise the jail on your local internal network - e.g. you can access your netdata jail at `http://netdata.local`.

I've written a [kickstart script](https://gist.github.com/jack828/b8375b16b6fb9eae52201d4deb563ab7) that has a handy one-liner in it to get you up and running faster, but I'll explain what the script does in detail here.

Quite a major caveat (for me and my network at least) is that this may not allow resolution of .local domains on Android phones, for a couple[^1] of reasons[^2] that don't belong here.

## Let's Get Started

This guide also assumes you've got a jail up and running, and a root shell in there already - and that you've set the hostname to something you want.

We'll be using a popular mDNS daemon service [Avahi](http://avahi.org/). It is supported on most distributions of pretty much anything.

We'll also require [socat](http://www.dest-unreach.org/socat/), a multipurpose relay tool. This will allow us to access our services on port 80 instead of whatever port they use.

~~~
root@jail:/ # pkg install -y avahi-app socat
~~~

Once those are done, go ahead and enable the services for them all. `dbus` is required by avahi.

~~~
root@jail:/ # sysrc dbus_enable="YES"
root@jail:/ # sysrc avahi_daemon_enable="YES"
root@jail:/ # sysrc socat_enable="YES"
~~~

Now, avahi comes with two services enabled by default - which I never use. So to keep the network nice and tidy we'll go ahead and remove them.

~~~
root@jail:/ # rm /usr/local/etc/avahi/services/*.service
~~~

This directory is where avahi will look for service definitions - if you do want to add other ones, this is where you put it.

We'll add the definition for our service in here too.

~~~
root@jail:/ # nano /usr/local/etc/avahi/services/http.service
~~~

And put in

~~~xml
<?xml version="1.0" standalone='no'?><!--*-nxml-*-->
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
  <name replace-wildcards="yes">%h</name>
  <service>
    <type>_http._tcp</type>
    <port>80</port>
  </service>
</service-group>
~~~


Now avahi knows to respond to mDNS queries with our jail's hostname and what type of service it is running.

To redirect traffic to the correct port, lets setup socat. Like avahi, it already has some instances defined, so open its config file:

~~~
root@jail:/ # nano /usr/local/etc/socat-instances.conf
~~~

And add to the bottom, replacing the word `PORT` with the numerical value of your port, e.g. 3000

~~~
[jailredirect]
daemonuser=root
flags="tcp-listen:80,reuseaddr,fork tcp:localhost:PORT"
~~~

Finally, we can enable all the services.

~~~
root@jail:/ # service dbus start
root@jail:/ # service avahi-daemon start
root@jail:/ # service socat start jailredirect
~~~

And give it a test by connecting to http://hostname.local.

## Debugging Tools

You can usee [mdns-scan](https://github.com/alteholz/mdns-scan) to scan and poll your local network for devices.

Alternatively, see what's broadcasting in your network using avahi by running `avahi-browse --resolve _http._tcp` on another device.

Example:

~~~
jack@jack-laptop:/ # avahi-browse --resolve _http._tcp
+ wlp3s0 IPv4 moneta                                        Web Site             local
= wlp3s0 IPv4 moneta                                        Web Site             local
   hostname = [moneta.local]
   address = [192.168.1.10]
   port = [80]
   txt = []
+ wlp3s0 IPv4 plex                                          Web Site             local
= wlp3s0 IPv4 plex                                          Web Site             local
   hostname = [plex.local]
   address = [192.168.1.13]
   port = [80]
   txt = []
+ wlp3s0 IPv6 grafana                                       Web Site             local
= wlp3s0 IPv6 grafana                                       Web Site             local
   hostname = [grafana.local]
   address = [fe80::2cf0:5dff:fe36:9c76]
   port = [3000]
   txt = []
+ wlp3s0 IPv4 grafana                                       Web Site             local
= wlp3s0 IPv4 grafana                                       Web Site             local
   hostname = [grafana.local]
   address = [192.168.1.7]
   port = [3000]
   txt = []
+ wlp3s0 IPv4 transmission                                  Web Site             local
= wlp3s0 IPv4 transmission                                  Web Site             local
   hostname = [transmission.local]
   address = [192.168.1.11]
   port = [80]
   txt = []
~~~

Or, for single hostname lookup, you can use dig - `dig @224.0.0.251 -p 5353 +short hostname.local`

Example:

~~~
jack@jack-laptop:/ # dig @224.0.0.251 -p 5353 +short grafana.local
192.168.1.7
~~~

The IP address used above is a [Multicast DNS Address](https://en.wikipedia.org/wiki/Multicast_DNS).
It is a reserved address specifically assigned to the mDNS ecosystem.

### Footnotes

[^1]: <https://android.stackexchange.com/questions/49188/how-to-get-mdns-working-for-chrome-on-android>
[^2]: <https://bugs.chromium.org/p/chromium/issues/detail?id=405925>