const path = require("path");
const WorkerConfig = require("./webpack/engine.config");
const AppConfig = require("./webpack/app.config");

//directories used multiple times
const build_directory = path.resolve(__dirname, 'build');
const source_directory = path.resolve(__dirname, "src");

//test if in production environment
const inProduction = process.argv.includes('prod');

//export config
module.exports = [
    WorkerConfig({inProduction, source_directory, build_directory}),
    AppConfig(inProduction, source_directory, build_directory)
]