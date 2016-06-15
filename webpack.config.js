var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));
var _ = require('lodash');
ExtractTextPlugin = require("extract-text-webpack-plugin");


var DEBUG = !argv.release;
var config = {
    entry: "./src/app.js",
    output: {
        path: "./build/public",
        filename: "app.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.js', '.jsx', 'ts', 'tsx']
    },
    devtool: 'source-map',
    plugins: (DEBUG ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]).concat([
                new webpack.DefinePlugin({
                    "process.env": {
                        NODE_ENV: JSON.stringify(DEBUG ? "development" : "production"),
                        API: JSON.stringify(DEBUG ? "/api" : "/api"),
                        PAGE_SIZE: 10
                    }
                }),
                new ExtractTextPlugin('style.css')
            ]),
    module: {
        loaders: [
            {
                test: /\.(eot|ttf)$/,
                loader: 'file'
            },
            {
                test: /\.woff2?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.gif/,
                loader: 'url?limit=10000&mimetype=image/gif'
            },
            {
                test: /\.jpg/,
                loader: 'url?limit=10000&mimetype=image/jpg'
            },
            {
                test: /\.png/,
                loader: 'url?limit=10000&mimetype=image/png'
            },
            {
                test: /\.svg/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.json/,
                loader: 'json'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    node: {
        child_process: 'empty',
        fs: "empty"
    }
};

module.exports = config;