---json
{
  "published": false,
  "title": "Babel No More - Replacing Babel for esbuild",
  "sell": "Upgrading a legacy codebase to use esbuild instead of Babel - how, and more importantly, why?",
  "coverImage": "https://img.clock.co.uk/1280x720",
  "coverImageSquare": "https://img.clock.co.uk/720x720",
  "tags": ["JavaScript", "NodeJS", "Babel", "esbuild"],
  "date": "2022-05-29T13:00:00.000Z"
}
---

## Preamble

This post isn't telling you to run into your boss's office and demand the team drop what they're doing and move to esbuild - I'm only sharing some thoughts and experiences. Ultimately, it's down to the team as a whole to evaluate if it is worth the risks and time. Personally, if it fits the bill, it's going to be worth it - even only for the speed!

## Babel

If you're working on a legacy codebase (or even something not legacy!) it's pretty much guaranteed you'll encounter Babel. You may not be overly familiar with integrating with it - especially if you're a newer member of the team, since build issues or upgrades are usually conversations privy to the more senior members of the team.[^1]

The first commit to the Babel project was XXXX. As of the time of writing, version 7 is the latest with over 39.7 million weekly downloads of the core package.

It's easy to understand what Babel is exactly. Taken directly from [their documentation](https://babeljs.io/docs/en), Babel boils down to a "JavaScript compiler". It allows you to use newer syntax and features whilst still being able to support older browsers and environments.

Take their simple example:

~~~js
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
~~~

For those that can't restrict support to the bleeding-edge (or are stuck supporting IE), this is incredibly valuable. We can use new and fancy language features without having to worry too much about browser support.

We can also use our favourite front-end tooling - React - and it's syntax features if we add Babel compilation to our toolchain. This is because the JSX syntax isn't part of the standard for JavaScript. We need to compile the syntax into something browsers can easily understand.

It has an incredibly healthy ecosystem surrounding it - hundreds of plugins and presets are available for huge numbers of needs.

### Babel's Caveats

Recent versions of Babel opted for a plugin-heavy configuration option rather than including lots of often-unused features within the core package. This provides some barrier to entry for most - it's difficult to find the right configuration for exactly what you need it for. There are many guides, however, that can assist someone getting started.

Babel requires a set of polyfills for it to be compatible with most browsers. This is provided by the [`core-js`](https://npmjs.com/core-js) package. If you've ever fought with upgrading this package before - you will immediately understand how complex and confusing it can be. I've encountered projects that had hidden transitive dependencies within their dependencies that required core-js@2, when I wanted to compile the project with core-js@3.

Babel recently (to me!) went though a major refactor and reorganisation during the transition to version 7. This caused every single Babel guide at the time to become irrelevant and out of date, as well as breaking many links to the documentation. Some plugins for babel@6 stopped working, relying on open-source maintainers to perform the work to upgrade the entire ecosystem. As a result, its incredibly easy to find you can't support what you used to when migrating.[^2]

In addition to this, it's written in JavaScript, which is single threaded. This clearly provides a disadvantage to the usage - it's slow, sometimes incredibly painfully slow.


## Esbuild

A relatively new addition to the JavaScript tooling ecosystem is [esbuild](https://esbuild.github.io). First appearing on GitHub in January of 2020, it uses Go for a highly parallelised JavaScript compiler.

Despite it's age, the ecosystem surrounding it is very much alive and thriving. With over 4.4 million weekly downloads, you certainly can't say nobody uses it.

It's goal is similar to Babel's - compile newer JavaScript features into an older version. It provides out-of-the-box support for sourcemaps and minification, including bundling code (and other non-js assets though it's loader system).


### Esbuild's Caveats

As it has not yet reached a major version release yet, things are very much likely to be changed in breaking ways between minor versions. This can cause some engineers to immediately turn away from esbuild - but it isn't in it's infancy like a few years ago. The project has a comprehensive test suite to catch and prevent regressions.

It also requires an ES6 environment - which means completely dropping support for IE11, or some niche environments missing certain features. However, you can bring your own polyfill and avoid un-translatable features if you _need_ to support these - in which case, you will have to go down the core-js rabbit hole.[^3]

Some things are missing - a younger community and ecosystem means all the boxes are not yet ticked. But with time and development, this will become less and less true.

## Comparison

speed


## Migrating

Now that I have chosen the successor to Babel, it's necessary to fully understand it's usage within the project.

In my case, this is three main areas - development node binary, Webpack, and a build stage.

### Migrating Development Node Binary

babel-node

tsx

### Migrating Webpack

old webpack configuration

enabled features

new webpack configuration

### Migrating build

babel build step

used as a transpilation stage
blindly does every file

esbuild equivalent line

breaks on a .tpl file - what can we do?


### Footnotes

[^1]: I've always wondered _why_ this is the case though. Fresh eyes are extremely valuable when trying to improve the developer experience - even more so when they're unfamiliar with any legacy nuances.
[^2]: This isn't to say the major changes are a net negative to the community. Often times having a strict requirement on backwards compatibility just causes the slow death of the thing struggling to keep support for unused things.
[^3]: See more <https://github.com/evanw/esbuild/issues/297>
