
# Dependencies

These are dependencies listed in package.json and why they are needed. I wrote this so I can later come back and criticize the choices made.

## TypeScript

Used here to have type checking.

## browser-sync

Nice tool to live-reload the browser whenever something changes.

## Webpack (and a rant about bundlers)

I decided to adopt it because I tried transpiling directly with tsc with no success.

I first tried generating ES6 code, thus not having to worry about generating module code (the browser will just use `import`). Set both `target` and `module` in `tsconfig.json` to `es6`. The first problem was with:

    import * as PIXI from "pixi.js";

Because the browser doesn't know how to resolve this dependency. Including the PIXI library manually in the HTML did not work. The browser just complains about:

    Uncaught TypeError: Failed to resolve module specifier "pixi.js". Relative references must start with either "/", "./", or "../".

This [article](http://dplatz.de/blog/2019/es6-bare-imports.html) talks about the problem and tries different solutions (the least intrusive one seeming to be pika, but I haven't tried it). Seems the author ends up using Webpack.

Another problem of not using a bundler is that TypeScript will produce one file for each module if I choose to target ES6. I don't like this because this means the main module has to be fully downloaded and parsed so that its dependencies can then be downloaded. This could be resolved by using HTTP push, but I don't have control over this feature in some scenarios, like when serving a static page from Github.

I wouldn't mind targeting an older JavaScript version if TypeScript was able to turn ES6 modules into IIFEs or something, but I it can't and they are [not willing to do it](https://github.com/microsoft/TypeScript/issues/32463) - the OP mentions using Rollup after tsc, which can be interesting (more on the Rollup section below).

I didn't want to use blunders just to be able to code in TypeScript, but I guess there's no other option.

Worth mentioning that I tried Parcel before Webpack, but the problems started right after npm install finished running. npm complained about two potentially dangerous dependencies. I tried letting npm fix them, but then it ended up finding another group of dangerous dependencies. Trying to resolve those returned me back to the original two, so I just gave up. It frightens me how many dependencies these bundlers depend on.

For future reference, this [project](https://github.com/FlorianRappl/bundler-comparison) compares several bundlers.

## ts-loader

Needed by Webpack.

## webpack-cli

Needed to run Webpack.

## Rollup

I also tried Rollup and it was a positive surprise. The nice thing about it is that it does exactly what I wanted TypeScript to do. For instance:

    npx rollup dist/index.js --file dist/bundle.js --format iife

Will get the output from tsc and bundle it using IIFEs, generating a single file that is easy to read and a lot better than the mess that Webpack outputs (still not minified, just to be clear).

The current downside is that I have to run tsc watch in a separate terminal window. This is what I came up with so far:

    npm run ts      # terminal 1
    npm run rollup  # terminal 2
    npm run serve   # terminal 3

## rollup-plugin-terser

Used by Rollup to minify the bundled code.

## Possible dependencies to evaluate

### esbuild

Suggested by [@leeoniya](https://github.com/leeoniya) [here](https://github.com/luciopaiva/pixi-live-map/issues/1) as an alternative bundler.
