---json
{
  "published": false,
  "title": "Babel No More - Replacing Babel for esbuild",
  "sell": "Upgrading a legacy codebase to use esbuild instead of Babel - how, and why?",
  "coverImage": "https://img.clock.co.uk/1280x720",
  "coverImageSquare": "https://img.clock.co.uk/720x720",
  "tags": ["JavaScript", "NodeJS", "Babel", "esbuild"],
  "date": "2022-05-29T13:00:00.000Z"
}
---

## Preamble

This post isn’t telling you to run into your boss’s office and demand the team drop what they’re doing and move to esbuild - I’m only sharing some thoughts and experiences. Ultimately, it’s down to the team as a whole to evaluate if it is worth the risks and time. Personally, if it fits the bill, it’s going to be worth it - even only for the performance and speed gains!

## Babel

If you’re working on a legacy codebase (or even something not legacy!) it’s pretty much guaranteed you’ll encounter Babel. You may not be overly familiar with integrating with it - especially if you’re a newer member of the team, since build issues or upgrades are usually conversations privy to the more senior members of the team.[^1]

The first commit to the Babel project was in 2014. As of the time of writing, version 7 is the latest with over 39.7 million weekly downloads of the core package.

It’s easy to understand what Babel is exactly. Taken directly from [their documentation](https://babeljs.io/docs/en), Babel boils down to a "JavaScript compiler". It allows you to use newer syntax and features whilst still being able to support older browsers and environments.

Take their simple example:

~~~js
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
~~~

For those that can’t restrict support to the bleeding edge (or are stuck supporting IE), this is incredibly valuable. We can use new and fancy language features without having to worry too much about browser support.

We can also use our favourite front-end tooling - React - and its syntax features if we add Babel compilation to our toolchain. This is because the JSX syntax isn’t part of the standard for JavaScript. We need to compile the syntax into something browsers can easily understand.

It has an incredibly healthy ecosystem surrounding it - hundreds of plugins and presets are available for huge numbers of needs.

### Babel’s Caveats

Recent versions of Babel opted for a plugin-heavy configuration option rather than including lots of often-unused features within the core package. This provides some barrier to entry for most - it’s difficult to find the right configuration for exactly what you need it for. There are many guides, however, that can assist someone in getting started.

Babel requires a set of polyfills for it to be compatible with most browsers. This is provided by the [`core-js`](https://npmjs.com/core-js) package. If you’ve ever fought with upgrading this package before - you will immediately understand how complex and confusing it can be. I’ve encountered projects that had hidden transitive dependencies within their dependencies that required core-js@2 when I wanted to compile the project with core-js@3.

Babel recently (to me!) went through a major refactor and reorganisation during the transition to version 7. This caused every single Babel guide at the time to become irrelevant and out of date, as well as breaking many links to the documentation. Some plugins for babel@6 stopped working, relying on open-source maintainers to perform the work to upgrade the entire ecosystem. As a result, its incredibly easy to find you can’t support what you used to when migrating.[^2]

In addition to this, it’s written in JavaScript, which is single-threaded. This provides a disadvantage to the usage - it’s slow, sometimes incredibly painfully slow.


## Esbuild

A relatively new addition to the JavaScript tooling ecosystem is [esbuild](https://esbuild.github.io). First appearing on GitHub in January 2020, it uses Go for a highly parallelised JavaScript compiler.

Despite its age, the ecosystem surrounding it is very much alive and thriving. With over 4.4 million weekly downloads, you certainly can’t say nobody uses it.

Its goal is similar to Babel’s - compile newer JavaScript features into an older version. It provides out-of-the-box support for source maps and minification, including bundling code (and other non-js assets through its loader system).


### Esbuild’s Caveats

As it has not yet reached a major version release, things are very much likely to be changed in breaking ways between minor versions. This can cause some engineers to immediately turn away from esbuild - but it isn’t in its infancy like a few years ago. The project has a comprehensive test suite to catch and prevent regressions.

It also requires an ES6 environment - which means completely dropping support for IE11, or some niche environments missing certain features. However, you can bring your own polyfill and avoid un-translatable features if you _need_ to support these - in which case, you will have to go down the core-js rabbit hole.[^3]

Some things are missing - a younger community and ecosystem means all the boxes are not yet ticked. But with time and development, this will become less and less true.


## Migrating

Now that I have chosen the successor to Babel, it’s necessary to fully understand its usage within the project.

In my case, this is three main areas - development node binary, Webpack, and a build stage.

### Migrating Development Node Binary

By "development node binary", I am referring to how in development Node is started. When you’re using language features not supported by your current version, it becomes a necessity to perform just-in-time (JIT) compilation.

This was done using the [@babel/node](https://npmjs.com/@babel/node). It uses the same setup as any normal Babel compilation stage.

It wasn’t _too_ hard to find an esbuild alternative - [tsx](https://npmjs.com/tsx). It sounds like part of the TypeScript ecosystem, and that’s because it does support it - but in this project, TypeScript is nowhere to be found.[^4]

It’s a simple drop-in replacement in our `nodemon.config.json`:

~~~diff
{
  "restartable": "api",
- "exec": "babel-node",
+ "exec": "tsx",
  "ext": "js",
  "signal": "SIGINT",
  "watch": ["api", "components/api", "components/service"]
}
~~~

A quick and dirty speed comparison yields:

| Executable | Time to boot |
|:----------:|-------------:|
| babel-node |       1.786s |
|    tsx     |       1.526s |

Tests were re-run 5 times and the total time was summed and then averaged.

Alright - not the 9001% increase we were hoping for - but the project isn’t _massive_ and the nature of the usage isn’t going to be the most performant either. We still get a **14.5%** decrease in startup time.

Just think about it - 0.26 seconds saved each time you make a change - roughly 100 restarts every day, 5 days a week, for about 40 weeks a year - that’s almost 1.5 hours saved _per year!_ [^5]

### Migrating Webpack

I haven’t gone full throttle here yet - due to some advanced styling requirements (I use Stylus with some preprocessing plugins) I haven’t yet gotten around to _completely_ removing Webpack in favour of esbuild’s bundling feature.

However, we can retire babel-loader from the mix as our transpiler. In the old webpack configuration we can see how babel-loader is set up:

~~~js
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve(__dirname, '../..')]
      }
    ]
  },
~~~

The babel config used here isn’t too relevant - it was outdated, and simply reduced the code to ES6.

We can easily replace this with [esbuild-loader](https://npmjs.com/esbuild-loader):

~~~js
const esbuild = require('esbuild')
const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader',
        options: {
          implementation: esbuild,
          loader: 'js',
          target: 'es2016'
        }
      }
    ]
  }
}
~~~

I’ve also opted to directly provide the loader with my chosen version of esbuild - despite potential breaking changes, I do this to keep a clearer understanding of the used version of esbuild throughout the project.

You can also see I’ve chosen to increase the target to ES2016 - [browser support for this](https://kangax.github.io/compat-table/es2016plus/) has reached a level I deem good enough to drop support for those browsers that haven’t yet caught up.

A quick and dirty speed comparison yields:

| Transpiler | Time to bundle |
|:----------:|---------------:|
|   babel    |         49.44s |
|  esbuild   |         14.38s |

Tests were re-run 5 times and the total time was summed and then averaged. I’m glad I only chose 5 for this one too because _wow_ that was slow.

In this migration, we obtained a massive **70.9%** decrease in the compile time. This is just in the production compile stage, however. In development watch mode we can expect a similar level of speed increase.

This directly translates into an extremely positive developer experience - I’ve worked on projects that took _minutes_ to rebundle in development mode.

I should also add that the tests were not exactly like-for-like, since I enabled minification on the esbuild one using the available minifier plugin:

~~~js
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const config = {
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2016'
      })
    ]
  }
}
~~~

This just means esbuild was _even more fasterer_.

### Migrating build

The final piece of the Babel puzzle is the build stage of the project’s pipeline.

This took all the files and used Babel to compile the new syntax and features to the version supported in NodeJS that the project was running with.

it happens as part of a package.json script:

~~~
"build:babel": "for i in components api lib; do babel $i --ignore '**.test.js' --copy-files -s --out-dir dist/$i; done",
~~~

It’s quite simple: For each of the main application folders, call `babel` to compile, and copy the files, with source maps, to the relevant output folder. (And exclude test files)

This, however, was not used optimally. Due to having two separate compilation environments, it becomes tricky to maintain two separate babel configuration files, and oftentimes the same is used for the browser and server code which can lead to unnecessary transformations to remove supported features for polyfills.

To migrate this to esbuild, we must understand the CLI interface to access the transform API, which for your reference is simply `esbuild target-file.js --platform=node`.

Esbuild only operates on files, so we can use the shell to quickly expand this, and this follows on to the first step - just a drop-in replacement:

~~~
"build:esbuild": "for i in components api lib; do esbuild `find $i -not -iname "*.test.js" -type f` --platform=node --format=cjs --outdir=dist/$i; done",
~~~

Now if your project is 100% `.js` files you are all done here. In this project, however, there were some text files read in by Node for templating with the extension `.tpl`, which caused the following errors during the build:

~~~
✘ [ERROR] No loader is configured for ".tpl" files: lib/templates/error-email.tpl

1 error
node:child_process:867
    throw err;
    ^
~~~

This error is understandable, we are asking esbuild to compile the file, and it expects us to know what it can and cannot handle.

In the babel case, it simply copies any unknown files to the output directory untouched.

To emulate this behaviour, we need to write a little script to help us along.

~~~js
const esbuild = require('esbuild')
const { join } = require('path')
const fs = require('fs')

// 1
const naverc = fs
  .readFileSync(join(__dirname, '../.naverc'), 'utf8')
  .replace('\n', '')

// 2
const [, , dir, ...files] = process.argv

// 3
const filesToTranspile = []
const filesToCopy = []
files.forEach((file) => {
  if (/\.test\.js?$/u.test(file) || /\/test\//u.test(file)) {
    // ignore test files '*.test.js'
    // ignore anything in a `/test/` directory - fixtures etc
  } else if (/\.js$/u.test(file)) {
    // Transpile only '*.js'
    filesToTranspile.push(file)
  } else {
    // And copy anything else
    filesToCopy.push(file)
  }
})

;(async () => {
  // 4
  const result = await esbuild.build({
    entryPoints: filesToTranspile,
    platform: 'node',
    format: 'cjs',
    outdir: `dist/${dir}`,
    target: `node${naverc}`,
    logLevel: 'info'
  })

  // 5
  await Promise.all(
    filesToCopy.map(async (file) => {
      const destinationFile = join(__dirname, '../dist', file)
      const destinationDir = destinationFile.slice(
        0,
        destinationFile.lastIndexOf('/')
      )
      await fs.promises.mkdir(destinationDir, { recursive: true })
      await fs.promises.copyFile(file, destinationFile)
    })
  )
  console.log(`[esbuild] Result for dir '${dir}'`, result)
})()
~~~

The above script may seem complicated but it isn’t in reality.

1) It begins by reading in the `.naverc` file in the project root - which contains the NodeJS version number the project requires - and saves it for later.

2) It requires arguments in the form of `directory file1 file2 ... fileN`, and separates the script’s arguments into this format.

3) It performs a better filter of the input files - removing tests and test fixtures, and sorting out every file we intend to compile from those we just want to be copied.

4) It then begins the build using esbuild - and using our saved NodeJS version from (1), we can tell esbuild _exactly_ what feature set we need to target.

5) We finish the build by copying the files we can’t (or don’t need to) compile to the output directory - same as babel.

Once this script has been written it can be re-substituted into the build command:

~~~
"build:esbuild": "for i in components api lib; do node tasks/build-esbuild.js $i `find $i -type f`; done",
~~~

A final quick and dirty speed comparison yields:

| Build tool | Time to compile |
|:----------:|----------------:|
|   babel    |           8.37s |
|  esbuild   |           0.51s |

Tests were re-run 5 times and the total time was summed and then averaged.

**93.9%** decrease in the build stage. Need I say the same thing I have said twice already?

## Conclusion

This blog went on a bit longer than I originally expected - sorry - but I thought it was worth sharing my experiences with it.

In conclusion, so long as you’re not shackled by IE11 (or wish to spend the time polyfilling), I think it’s certainly worth the effort to migrate a legacy system to esbuild. Even if you do it incrementally - one week swap it out in webpack, the next in your build stage, etc - it can bring new life into an ageing project. Perhaps next time a project is due NodeJS runtime & dependency upgrades, you consider removing the beast of Babel.

### Footnotes

[^1]: I’ve always wondered _why_ this is the case though. Fresh eyes are extremely valuable when trying to improve the developer experience - even more so when they’re unfamiliar with any legacy nuances.
[^2]: This isn’t to say the major changes are a net negative to the community. Often having a strict requirement on backwards compatibility just causes the slow death of the thing struggling to keep support for unused things.
[^3]: See more <https://github.com/evanw/esbuild/issues/297>
[^4]: I know I know, I tried adding it but there are far too many project-specific packages that I simply don’t have the time to add type definitions for. And some core features aren’t type-able.
[^5]: I’ve wasted more time ~pooping at work~ solving complex configuration problems
