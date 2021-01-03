
const path = require("path");

module.exports = {
    entry: "./index.ts",
    devtool: "source-map",
    mode: "development",
    externals: {
        "pixi.js": "PIXI"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
