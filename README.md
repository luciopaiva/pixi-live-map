
# pixi.js live map example

Proof-of-concept to show how to load a live map view with thousands of moving elements.

It expands on [this other project](https://github.com/luciopaiva/web-graphics-comparison) I did to benchmark different solutions.

## Install

Either install `nvm` or manage your Node.js version (which ideally should match the one in `.nvmrc`, but other versions can work as well too since Node.js is only used to run the development tools). 

    nvm use  # skip this if not using nvm
    npm i

## Development

There are two possible workflows: Webpack or Rollup.

For Webpack, run:

    npm run webpack

For Rollup, you need two terminals:

    npm run ts      # terminal 1, will watch & transpile TypeScript
    npm run rollup  # terminal 2, will watch & bundle

Either way, run this in another terminal:

    npx run serve

It will run browser-sync to watch for source updates and automatically refresh the browser.

## Dependencies

See [here](dependencies.md) for the list of dependencies and why they are being used.
