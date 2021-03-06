const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    devServer: {
        proxy:{
            '/getData': 'http://localhost:8086',
            '/location': 'http://localhost:8086',
            '/weather': 'http://localhost:8086',
            '/postTrip': 'http://localhost:8086',
            '/all': 'http://localhost:8086',
            '/pix': 'http://localhost:8086',
        }
        //port:8081 // By default webpack runs on port 8080, this will change default port
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
                use:['style-loader', 'css-loader', 'sass-loader'] // these run right to left, sass-loader first
            },

            {
                test: /\.(png|PNG|jpg|JPG|gif|GIF)$/,
                use:[{
                    loader:'url-loader',
                    options: {
                        limit: 8000,
                        name: 'media/[name].[ext]'
            }
                }] // these run right to left, sass-loader first
            },
        ]},
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin(),
        new dotenv(),
    ]
}
