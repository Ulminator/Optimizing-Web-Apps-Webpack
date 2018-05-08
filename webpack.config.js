const path = require('path');
const webpack = require('webpack');

const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const isDevelopment = process.env.NODE_ENV === "development";
// console.log(`This is a ${isDevelopment ? "development" : "production"} build`);


// if(isDevelopment){
//     baseConfig.plugins.push(
//         new webpack.NamedModulesPlugin(),
//         new webpack.HotModuleReplacementPlugin() //want updates but not an entirely new bundle
//     )
// }

module.exports = function(env) {
    const isDevelopment = env ==='development';
    console.log(`This is a ${isDevelopment ? "development" : "production"} build`);

    const baseConfig = {
        entry: './app/app.js',
        // devtool: 'source-map',  //debug links to file with error instead of app.bundle.js (makes a new file)
        // devtool: 'eval', //debug links to file with error but also shows post transpillation (in line source mapping)
        // devtool: 'eval-source-map',  //good for debugging (adding source mapping to inline)
        // devtool: 'hidden-source-map',  
        // devtool: 'hidden-nosources-source-map', //will produce mapping and link to it but no source code (good for sending to a logger)
        output: {
            path: path.resolve(__dirname, 'app/dist'), //Must be absolute path
            filename:'app.bundle.js',
            publicPath: '/dist/' //Lets webpack know where to look for the hot update json files
        },
        plugins: [
            //USE THIS IN PROJECT
            // new CleanWebpackPlugin(['app/dist']),  //Wipeout output folder before making bundle or any other files
            new webpack.DefinePlugin({
                ENV_IS: JSON.stringify(isDevelopment ? "development" : "production"), //otherwise will just print development without quotes
                ENV_IS: JSON.stringify(env) //or this
            }),
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].map',
                noSources: true,
            })
        ]
    };

    if (isDevelopment){
        return merge(baseConfig, {
            devServer: {
                contentBase: path.resolve(__dirname, 'app'), //Content base set to app folder
                publicPath: '/dist/',  //Output from webpack is served from here
                watchContentBase: false,  //Watches for changes not a part of the bundle. i.e. static assets like html
                hotOnly: true,  //Reload fallback disabled. Only hot updates
                overlay: true //Displays error on url (looks cool)
            },
            plugins: [
                new webpack.NamedModulesPlugin(),
                new webpack.HotModuleReplacementPlugin(),
                // {//Created own plugin
                //     apply(compiler) {
                //         compiler.plugin("done", function (params) {
                //             console.log(require('util').inspect(compiler.options));
                //         });
                //     }
                // }
            ]
        })
        // baseConfig.plugins.push(
        //     new webpack.NamedModulesPlugin(),
        //     new webpack.HotModuleReplacementPlugin() //want updates but not an entirely new bundle
        // )
    }
    else {  //Don't need to use it for dev in a modern web browser environment (ie new chrome)
        return merge(baseConfig, require('./babelLoader'));//https://github.com/babel/babel/issues/6808
    }
};