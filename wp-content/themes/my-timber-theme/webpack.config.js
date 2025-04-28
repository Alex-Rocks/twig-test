const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const fs = require("fs");

const jsFiles = fs.readdirSync(path.resolve(__dirname, "src/js")).filter(file => file.endsWith(".js"));

const entries = {};

jsFiles.forEach(file => {
    const name = path.parse(file).name; // Наприклад: main.js => main
    entries[name] = `./src/js/${file}`;
});

// Додаємо також стилі (якщо треба один загальний SCSS)
entries["style"] = "./src/scss/style.scss";

module.exports = {
    mode: "production",
    devtool: "source-map",
    context: __dirname,

    entry: entries,

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: "url-loader",
                },
            },
        ],
    },


    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            includePaths: [path.resolve("./node_modules")],
        }),

        new BrowserSyncPlugin({
            files: "**/*.php",
            proxy: "http://base-theme.local/",
        }),

        new MiniCssExtractPlugin({
            filename: "main.css",
        }),
    ],
};
