const path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'webpack-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }], exclude: /node_modules/
            },
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ]
    },
    mode: 'development',
    watch: true
};