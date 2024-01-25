const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const SpliceWebpackPlugin = require("./plugin/SpliceWebpackPlugin.js");

module.exports = (prod, src, target) => {
    return {
        mode: prod? "production": "development",
        entry: [
            path.join(src, 'index.ts'),
            path.join(src, 'index.scss')
        ],
        devtool: prod? undefined: 'source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: { name: 'style.css'}
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /.html$/i,
                    type:'asset/source',
                    exclude: /node_modules/,
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.html'],
        },
        experiments: {
            outputModule: true
        },
        output: {
            filename: 'script.js',
            path: target,
            library: {
                type: 'module'
            }
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [{
                    to: target,
                    from: path.join(src, 'static')
                }]
            }),
            new SpliceWebpackPlugin()
        ],
        optimization: {
            minimize: prod,
            minimizer: prod? [
                new HtmlMinimizerPlugin(),
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ]: [
                new TerserPlugin()
            ],
            usedExports: true
        }
    }
};