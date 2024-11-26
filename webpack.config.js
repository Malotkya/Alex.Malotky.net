const path = require('path');
const fs = require('fs');
const EngineConfig = require("zim-engine/Webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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

const build_directory = path.resolve(__dirname, "build");
const source_directory = path.resolve(__dirname, "src");
const inProduction = process.argv.includes('prod');
const routes = path.join(source_directory, "routes");
const {elements, staticFiles} = bundleContent(routes, build_directory);

//Add global elements
allTsFiles(path.join(source_directory, "elements")).forEach(item=>elements.push(item));

//Adding other files
elements.push(path.join(source_directory, 'index.scss'));
elements.push(EngineConfig.BundlePath);

//Add base static directory
staticFiles.push({
    to: build_directory,
    from: path.join(source_directory, 'static')
});

const target = path.join(source_directory, "worker.ts");

module.exports = [
    EngineConfig({inProduction, buildTarget: build_directory, sourceFile:target}),
    {
        mode: inProduction? "production": "development",
        entry: elements,
        devtool: inProduction? undefined: 'source-map',
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
            alias: {
                "@": source_directory
            }
        },
        output: {
            filename: 'bundle.js',
            path: build_directory,
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: staticFiles
            }),
        ],
        optimization: {
            minimize: inProduction,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ]
        }
    }
];