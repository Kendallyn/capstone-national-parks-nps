var path = require('path');

var webpack = require('webpack');

//var packageData = require('./package.json');
//
//var filename = [packageData.name, packageData.version, 'js'];

module.exports = {
    entry: path.resolve(__dirname, 'public/index.js'),
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: 'index.js'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    }
};
