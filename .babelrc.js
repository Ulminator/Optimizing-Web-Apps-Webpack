module.exports = {
    presets: [['@babel/preset-env', {
                debug: false,  //Shows enabled plugins
                modules: false, //Enable transofrmation of ES6 module syntax to another (default is true)
                targets: {
                    browsers: ['> 1%']  //Look at browserslist github repository | could add ,'not IE < 12'
                },
                useBuiltIns: 'usage'
                // useBuiltIns: 'entry' //Replaces @babel/polyfill with correct polyfills for the browser reqs
            }]
    ]
}