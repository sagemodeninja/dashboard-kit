const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.ts',
        demo: './src/app.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            chunks: ['demo']
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      https: false,
      port: 3004,
    },
    devtool: "source-map"
}