const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    plugins: [

        new HtmlWebpackPlugin({

            title: 'ToDo app',
            template: './src/template.html'

        }),

    ],




    devtool: 'inline-source-map',
    

    devServer: {

        static: './dist',

    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/ToDo/",
        clean: true
    },

    module: {

        rules: [

            {

                test: /\.css$/i,

                use: ['style-loader', 'css-loader'],

            },
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset/resource',

            },

        ],

    },
    optimization: {

        runtimeChunk: 'single',

    },
};