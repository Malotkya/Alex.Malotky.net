const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

module.exports = (prod, src, target) => {

    const modules = {};
    const files = [];

    const routes = path.join(src, "routes");

    for(let module of fs.readdirSync(routes)){
        const directory = path.join(routes, module);
        const name = path.join("module", module);

        for(let file of fs.readdirSync(directory)){
            switch (file){
                case "static":
                    files.push({
                        to: target,
                        from: path.join(directory, file)
                    });
                    break;
                    
                case "module.ts":
                    modules[name] = path.join(directory, "module.ts");
                    break;
            }
        }
    }

    return {
        mode: prod? "production": "development",
        entry: modules,
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
                    type:'asset/source',
                    exclude: /node_modules/,
                    use: 'sass-loader'
                },
                {
                    test: /.html$/i,
                    type:'asset/source',
                    exclude: /node_modules/,
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.html'],
        },
        experiments: {
            outputModule: true
        },
        output: {
            filename: '[name].js',
            path: target,
            library: {
                type: 'module'
            }
        },
        plugins: [
            new CopyWebpackPlugin({ patterns: files })
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
}