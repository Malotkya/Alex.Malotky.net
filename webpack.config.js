const path = require('path');

//config files
const app = require("./webpack/app.config");
const firebase = require("./webpack/firebase.config");
const modules = require("./webpack/module.config");

//directories used multiple times
const build_directory = path.resolve(__dirname, 'build');
const source_directory = path.resolve(__dirname, "src");

//test if in production environment
const inProduction = process.argv.includes('prod');

//export config
module.exports = [
  app(inProduction, source_directory, build_directory),
  firebase(inProduction, source_directory, build_directory),
  modules(inProduction, source_directory, build_directory),
]