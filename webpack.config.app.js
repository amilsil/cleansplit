const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
    context: __dirname,
    // Ends up creating a main.js with the app.jsx references,
    // That contains the whole application build.
    entry: path.join(__dirname, "src", "app.jsx"),
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
    devServer: {
        contentBase: "./build",
    },
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
