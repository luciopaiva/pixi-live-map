
# pixi.js live map example

Proof-of-concept to show how to load a live map view with thousands of moving elements.

## Install

Either install `nvm` or manage your Node.js version (which ideally should match the one in `.nvmrc`, but other versions can work as well too). 

    nvm use  # skip this if not using nvm
    npm i

## Development

    npx webpack

## Dependencies

### TypeScript

Used here to have type checking.

### Webpack

I decided to adopt it because I tried transpiling directly with tsc with no success.

I first tried generating ES6 code, thus not having to worry about generating module code (the browser will just use `import`). Set both `target` and `module` in `tsconfig.json` to `es6`. The first problem was with:

    import * as PIXI from "pixi.js";

Because the browser doesn't know how to resolve this dependency. Including the PIXI library manually in the HTML did not work. The browser just complains about:

    Uncaught TypeError: Failed to resolve module specifier "pixi.js". Relative references must start with either "/", "./", or "../".

This [article](http://dplatz.de/blog/2019/es6-bare-imports.html) talks about the problem and tries different solutions (the least intrusive one seeming to be pika, but I haven't tried it). Seems the author ends up using Webpack.

Another problem of not using a bundler is that TypeScript will produce one file for each module if I choose to target ES6. I don't like this because this means the main module has to be fully downloaded and parsed so that its dependencies can then be downloaded. This could be resolved by using HTTP push, but I don't have control over this feature in some scenarios, like when serving a static page from Github.

I wouldn't mind targeting an older JavaScript version if TypeScript was able to turn ES6 modules into IIFEs or something, but I it can't and they are [not willing to do it](https://github.com/microsoft/TypeScript/issues/32463).

I didn't want to use blunders just to be able to code in TypeScript, but I guess there's no other option.

I tried Parcel first, but the problems start right after npm install finishes running. npm complained about two potentially dangerous dependencies. I tried letting npm fix them, but then it ended up finding another group of dangerous dependencies. Trying to resolve that returned back to the original two, so I just gave up. It's disgusting how many dependencies these bundlers depend on. This [project](https://github.com/FlorianRappl/bundler-comparison) compares several of them. 

### ts-loader

Needed by Webpack.

### webpack-cli

Needed to run Webpack.
