const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },

            {
                test: /\.(png|PNG)$/,
                use:[{
                    loader:'url-loader',
                    options: {
                        limit: 8000,
                        name: 'media/[name].[ext]'
            }
                }] // these run right to left, sass-loader first
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),

        new WorkboxPlugin.GenerateSW(),

        new MiniCssExtractPlugin(),
        new dotenv(),
    ]
}
