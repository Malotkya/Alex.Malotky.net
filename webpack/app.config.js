const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const SpliceWebpackPlugin = require("./plugin/SpliceWebpackPlugin.js");

/** Bundle Content
 * 
 * @param {string} routeDir 
 * @param {string} target 
 * @returns {{elements:Array<string>, staticFiles:Array<Object>}}
 */
function bundleContent(routeDir, target){
    const staticFiles = [];
    const elements = [];

    for(let route of fs.readdirSync(routeDir)){
        const directory = path.join(routeDir, route);
        
        for(let file of fs.readdirSync(directory)){
            switch (file){
                case "static":
                    staticFiles.push({
                        to: target,
                        from: path.join(directory, file)
                    });
                    break;

                case "element":
                    allTsFiles(path.join(directory, file)).forEach(item=>elements.push(item)); 
                    break;
            }
        }
    }

    return {elements, staticFiles};
}

/** Get All Ts Files
 * 
 * @param {string} dir 
 * @returns {Array<string>}
 */
function allTsFiles(dir){
    let output = [];

    for(let name of fs.readdirSync(dir)){
        name = path.join(dir, name);

        if(fs.statSync(name).isDirectory()){
            output = output.concat(allTsFiles(name));
        } else {
            if(name.match(/ts$/)){
                output.push(name);
            }
        }
    }

    return output;
}

/** App Webpack Configuration
 * 
 * @param {boolean} prod 
 * @param {string} src 
 * @param {string} target 
 * @returns {Object}
 */
module.exports = (prod, src, target) => {

    const routes = path.join(src, "routes");
    const {elements, staticFiles} = bundleContent(routes, target);

    //Add global elements
    allTsFiles(path.join(src, "elements")).forEach(item=>elements.push(item));

    //Add styliing file
    elements.push(path.join(src, 'index.scss'));

    //Add base static directory
    staticFiles.push({
        to: target,
        from: path.join(src, 'static')
    });

    return {
        mode: prod? "production": "development",
        entry: elements,
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
                    use: [
                        {
                            loader: 'file-loader',
                            options: { name: 'style.css'}
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: target,
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: staticFiles
            }),
            new SpliceWebpackPlugin()
        ],
        optimization: {
            minimize: prod,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ]
        }
    }
};