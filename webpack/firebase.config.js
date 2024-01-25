const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (prod, src, target) => {
    return {
        mode: prod? "production": "development",
        entry: path.join(src, "firebase.ts"),
        devtool: prod? undefined: 'source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        experiments: {
            outputModule: true
        },
        output: {
            filename: 'firebase.js',
            path: target,
            library: {
                type: 'module'
            }
        },
        optimization: {
            minimize: prod,
            minimizer: prod? [
                new TerserPlugin()
            ]: [
                new TerserPlugin()
            ],
            usedExports: true
        },
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        }
    }
};