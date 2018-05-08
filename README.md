Webpack Benefits
----------------

    Ineractive Coding - Hot Module Reload (HMR)

    Seamless Compilation of anything - Code, styles, layout, images, fonts, etc.

Compiling HTML down to a render function - Ahead of Time Compilation
    Compile at build time rather than run time. template-compiler

Sophisticated Bundling - bundle per page, bundle/code splitting, minify, lazy loading bundles, remove unused code

Caching - Can be tailored to development and production separately
    Don't want in development (change isn't working or did the page just not reload)
    Production - Want it to improve user experience.
        But when you do a deployment you want to make sure users get the latest version

Source Map - Can map back to original code. 

Platform for Transformation - Loaders - through babel, but also webpack - codegen, codemon, inject features like
offline support (offline-plugin) - Uses ServiceWorker and if that doesn't work it uses AppCache, etc.

Everything you plugin can benefit from Ahead of Time Compilation

Incremenal builds - Even without interactive coding you can benefit from only compiling changed modules

Webpack is a Compiler Platform - Extensible via Plugins and Loaders
DO NOT NEED TO USE npx FOR A SCRIPT IN PACKAGE.JSON
`npx webpack source destination`

Script "prestart" will always run before anything else

"use strict";
webpack can detect if an import is a js file and will automatically use strict
Polyfil into browsers that don't understand js modules.

webpack-stats-graph

    npx webpack app/app.js app/dist/app.bundle.js --json > stats.json
    webpack-stats-graph
    or (--help for more options)
    webpack-stats-graph --show-size

Turned out to be an encoding issue with Powershell. VSCode used it for integrated terminal on my machine. For future users stumbling across this, use the following command to get build stats file in Powershell -
webpack --profile --json | Out-file 'dist/stats.json' -Encoding OEM
webpack --profile --json > dist/stats.json (Can generate stats with a webpack config file)

Watch Mode
    npx webpack --watch app/app.js app/dist/app.bundle.js
        It's watching for files to change

Refresh (Live Reload)
    webpack-dev-server (dev dependency)
    npx webpack-dev-server --open (open up browser window)
    NEEDS webpack.config.js

    Static assets (i.e. html) are not a part of the bundle and webpack-dev-server will not watch for changes.

Webpack-dev-server serves the webpack output from an in memory file system.

Good trouble shootin point:
    localhost:8080/webpack-dev-server

|||||Preserve log option to make sure rapidly changing console.logs or network requests do not vanish.

Hot Module Replacement
    Instead of reloading we can have code that simply updates part of the application, in memory in the browser.

    Can use Redux HMR instead of configuring webpack for this.

nodemon -w webpack.config.js -x webpack-dev-server -- --open
Tells nodemon to watch for changes to webpack.config.js and the execute webpack-dev-server when changes are detected.
The -- --open tells nodemon that those arguments are not for it.

cross-env node package needed!
cross-env NODE_ENV=production (Will work on Mac and Windows)

Webpack Environment Options
    webpack --env.prod --env min

Exporting Multiple Configurations by Name

-------------

babel-loader : Webpack plugin for Babel
    Loder is just a transformation

babel-core : Compiler

Babel is composed of plugins that perform the transformations
A preset is just a group of plugins

babel-preset-env : Browserslist to specify constraints
    Which browser should I use??

@babel/polyfill just used for IE browser since it can't handle promises etc
Should have automated tests for the polyfills

---------

The grouping in tee-loader.js is well understood in Chrome debugger. Accessed below
Get node inspector manager
node --inspect-brk node_modules/.bin/webpack --env production (Can see in debugger in chrome)

REALLY USEFUL
    node --inspect-brk node_modules/webpack/bin/webpack --env production (WINDOWS)

cache-loader (to cache the output of babel for example)
    if a file hasn't changed, you could cache to disk and speed up that scenario
    Pitching Loader!!

From Dev to Prod
    Clean up files (so previous build artifacts don't accidentally get released)
    Copy files like HTML page
    Fingerprint of application page
    Take all deploy files and Zip them up

npm-install-plugin (Dev Task - Useful to download node modules without stopping dev server)

copy-webpack-plugin (Acts like the npm run build script)

compression-plugin (Reduce size of plugin)

HtmlWebpackPlugin (Simplifies creation of HTML files to serve webpack bundles)

Awesome Webpack github repository

Maybe Use Gulp.js?? Just let Webpack do bundling??

-------------

Source Maps - Give ability to reference back to original code
NOT NECESSARILY NEEDED

hidden-source-map - Can prevent clients from seeing our source maps in prouduction 
nosource-source-map - Can only map line numbers and original files but no code

Can apply source maps with plugins instead of a string
