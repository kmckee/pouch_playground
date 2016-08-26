module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname + '/dist/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "file?name=[name].[ext]" }
        ]
    }
};
