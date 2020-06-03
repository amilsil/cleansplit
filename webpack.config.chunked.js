const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    context: __dirname,
    entry: {
        // When the entry point is changed to `app.jsx`,
        // The app build itself does not include any src code changes.
        // Why???
        main: [path.join(__dirname, "src", "app.jsx")]
    },
    devtool: "#source-map",
    mode: "development",
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
        library: "[name]"
    },
    plugins: [
        // so that file hashes don't change unexpectedly
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        }),
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
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace("@", "")}`;
                    }
                }
            }
        }
    }
};
