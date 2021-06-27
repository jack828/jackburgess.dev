---json
{
  "published": true,
  "title": "Preview Mode",
  "sell": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "coverImage": "https://img.clock.co.uk/1280x720",
  "coverImageSquare": "https://img.clock.co.uk/720x720",
  "tags": ["one", "two"],
  "date": "2020-03-16T05:35:07.322Z"
}
---

# H1 Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies.

## H2 Heading

Tristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.

  1. one
  2. two
  3. three
  4. four

test

  * one
  * one
  * one
  * one


### H3 Heading
* * *

underline above
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

> Lorem ipsum dolor sit amet, consectetur ~~adipiscing elit~~, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.


Lorem *ipsum dolor sit amet*, consectetur adipiscing elit, **sed do eiusmod tempor incididunt** ut labore et ***dolore magna aliqua***.

#### H4 Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

+++pullquote > "We are already a cyborg. Because we are so well integrated with our phones and our computers."
Elon Musk
+++

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

##### H5 Heading

Lorem ipsum dolor sit amet, `consectetur adipiscing elit`, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

* * *

![Alt text](https://img.clock.co.uk/100x100)

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

###### H6 Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

~~~js
const test = async (param, { param2: { param3 }}) => {
  await param2()
  Promise.all(param).then(function () {
    // test
  })
  if (param3) {
    return null
  }
}
var undefined,
    xui,
    window     = this,
    string     = new String('string'),
    document   = window.document,
    simpleExpr = /^#?([\w-]+)$/

function changeHeight(h) {
  var tds = document.getElementsByTagName("td");
  for(var i = 0; i < tds.length; i++) {
    tds[i].setAttribute("height", h + "px");
}}
~~~

and then in C

~~~c

#define UNICODE
#include <windows.h>

int main(int argc, char **argv) {
  int speed = 0, speed1 = 0, speed2 = 0; // 1-20
  printf("Set Mouse Speed by Maverick\n");

  SystemParametersInfo(SPI_GETMOUSESPEED, 0, &speed, 0);
  printf("Current speed: %2d\n", speed);

  if (argc == 1) return 0;
  if (argc >= 2) sscanf(argv[1], "%d", &speed1);
  if (argc >= 3) sscanf(argv[2], "%d", &speed2);

  if (argc == 2) // set speed to first value
    speed = speed1;
  else if (speed == speed1 || speed == speed2) // alternate
    speed = speed1 + speed2 - speed;
  else
    speed = speed1;  // start with first value

  SystemParametersInfo(SPI_SETMOUSESPEED, 0,  speed, 0);
  SystemParametersInfo(SPI_GETMOUSESPEED, 0, &speed, 0);
  printf("New speed:     %2d\n", speed);
  return 0;
}
~~~

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
