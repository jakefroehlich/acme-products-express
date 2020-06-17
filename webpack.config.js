const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "./app.js"),
    output: {
        filename : 'main.js',
        path: path.join(__dirname, "./dist")
    },
    devtool: 'source-map',
    watch: true,
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader",
                },
                exclude: /(node_modules)/,
            }
        ]
    }
} 