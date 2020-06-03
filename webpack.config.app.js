const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
    context: __dirname,
    entry: path.join(__dirname, "app.jsx"),
    devtool: "#source-map",
    mode: "development",
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./build/vendor-manifest.json")
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, "./build/vendor.js")
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
