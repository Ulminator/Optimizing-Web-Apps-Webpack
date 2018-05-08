const path = require('path');
module.exports = {
    module:{
        rules:[
            {
                test: /\.js$/, //Any js file will be subject to this rule (does same as include)
                exclude: /(node_modules|bower_components)/, //makes compilation faster
                // use: {  //Uncomment this out for real usage
                //     loader: 'babel-loader', //will look for babelrc.js file
                //     // options: {
                //     //     babelrc: false COULD HAVE THIS IF USING BABELRC FILE FOR SOMETHING ELSE
                //     // }
                // }
                use: [
                    // 'tee-loader?label=after', //Older approach (preferred is options)
                    'babel-loader',
                    // {
                    //     loader: 'tee-loader',
                    //     options: {
                    //         label: 'before'
                    //     }
                    // }
                    // tee-loader(babel-loader(source)) Loaders run in reverse order
                ]
            }
        ]
    },
    resolveLoader: {
        alias: {
            'tee-loader': path.resolve(__dirname, 'tee-loader.js')
        }
    }
}