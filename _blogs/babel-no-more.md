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

If you're working on a legacy codebase (or even something not legacy!) it's pretty much guaranteed you'll encounter Babel. You may not be overly familiar with integrating with it - especially if you're a newer member of the team, since build issues or upgrades are usually conversations privy to the more senior members of the team.[^1]

It's easy to understand what Babel is exactly. Taken directly from [their documentation](https://babeljs.io/docs/en), Babel boils down to a "JavaScript compiler". It allows you to use newer syntax and features whilst still being able to support older browsers and enviroments.

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

We can also use our favourite 

what is Babel, age, usage levels etc

what is esbuild, age, usage levels etc

how do they compare



### Footnotes

[^1]: I've always wondered _why_ this is the case though. Fresh eyes are extremely valuable when trying to improve the developer experience - even more so when they're unfamiliar with any legacy nuances.
