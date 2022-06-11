---json
{
  "published": false,
  "title": "Page title goes here, keep under 80 characters",
  "sell": "Longer sell goes here, summarising the article in a short sentance.",
  "coverImage": "https://img.clock.co.uk/1280x720",
  "coverImageSquare": "https://img.clock.co.uk/720x720",
  "tags": ["relevant", "tags"],
  "date": "2022-04-20T12:00:00.000Z"
}
---

# Published Checklist

 - Update `date` to today
 - Modify title + sell if changed since initial writing
 - Add relevant tags
 - Make sure footnotes link correctly and add value
 - Replace dumb quotes with <https://smartquotesforsmartpeople.com>
 - Go live with `"published": true`!


## Preamble

Longer summary of the article, maybe a bit about the background of why it's being written.[^1]

Various text modifiers:

_italic text_

**bold text**

~strikethrough text~

Venenatis cras sed _felis eget velit_. Consectetur libero **id faucibus nisl tincidunt**. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Volutpat consequat mauris nunc congue nisi vitae. Id aliquet risus feugiat in ante metus dictum at tempor. Sed blandit libero volutpat sed cras. Sed odio morbi quis commodo odio aenean sed adipiscing. Velit euismod in pellentesque massa placerat. Mi bibendum neque egestas congue quisque egestas diam in arcu. Nisi lacus sed viverra tellus in. Nibh cras pulvinar mattis nunc sed. Luctus accumsan tortor posuere ac ut consequat semper viverra. Fringilla ut morbi tincidunt augue interdum velit euismod.[^2]

| Table demo | Align columns |
|:----------:|--------------:|
| babel-node |        1.786s |
|    tsx     |        1.526s |


## Headings

```
# Sample H1
## Sample H2
### Sample H3
```

will produce
# Sample H1
## Sample H2
### Sample H3

---

## Horizontal Rules

Horizontal rule is created using `---` on a line by itself.

---
## Hyperlinks
- GFMD will automatically detect URL and convert them to links like this http://www.futureworkz.com
- To specify a link on a text, do this:

```
This is [an example](http://example.com/ "Title") inline link.
[This link](http://example.net/) has no title attribute.
```

This is [an example](http://example.com/ "Title") inline link.
[This link](http://example.net/) has no title attribute.

---

## Creating list

Adding a `-` will change it into a list:

```
- Item 1
- Item 2
- Item 3
```

will produce

- Item 1
- Item 2
- Item 3

Numbered lists:

1. Item 1
2. Item 2
3. Item 3

---

## Quoting

You can create a quote using `>`:

```
> This is a quote
```

will produce

> This is a quote

## Lorem Ipsum

Tristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.

## Section

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

### Footnotes

[^1]: Full links <https://example.com>
[^2]: Markdown links [example.com](https://example.com)
