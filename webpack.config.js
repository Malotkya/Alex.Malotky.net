const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const SpliceWebpackPlugin = require("./webpack/SpliceWebpackPlugin.js");
const TemplateBuilder = require("./webpack/TemplateBundler.js");

//directories used multiple times
const build_directory = path.resolve(__dirname, 'build');
const source_directory = path.resolve(__dirname, "src");

const bundleTemplates = TemplateBuilder(build_directory, source_directory);;

//test if in production environment
const prod = process.argv.includes('prod');

//create minify requirements if in production
const minify = prod ? {
  minimize: true,
  minimizer:[
    new HtmlMinimizerPlugin(),
    new CssMinimizerPlugin(),
    new TerserPlugin()
  ]
} : undefined;

//export config
module.exports = {
  mode: prod? "production": "development",
  entry: {
    script: [
      path.join(source_directory, 'index.ts'),
      path.join(source_directory, 'index.scss')
    ],
    firebase: path.join(source_directory, "firebase.ts"),
  },
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
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  experiments: {
    outputModule: true
},
  output: {
    filename: '[name].js',
    path: build_directory,
    library: {
      type: 'module'
  }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: bundleTemplates("routes") .concat([
        {
          to: build_directory,
          from: path.join(source_directory, 'static')
        }
      ])
    }),
    new SpliceWebpackPlugin()
  ],
  optimization: minify,
};