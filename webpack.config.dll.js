const webpack = require("webpack");
const path = require("path");

module.exports = {
    context: __dirname,
    entry: {
        vendor: [path.join(__dirname, "vendor.js")]
    },
    devtool: "#source-map",
    mode: "development",
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "build", "[name]-manifest.json"),
            name: "[name]",
            format: true
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
