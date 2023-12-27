const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const SpliceWebpackPlugin = require("./webpack/SpliceWebpackPlugin.js");
const ModuleBundler = require("./webpack/ModuleBunder.js");

//directories used multiple times
const build_directory = path.resolve(__dirname, 'build');
const source_directory = path.resolve(__dirname, "src");

const [modules, files] = ModuleBundler(build_directory, source_directory)("routes");

//test if in production environment
const inProduction = process.argv.includes('prod');

//export config
module.exports = {
  mode: "production",
  entry: {
    script: [
      path.join(source_directory, 'index.ts'),
      path.join(source_directory, 'index.scss')
    ],
    firebase: path.join(source_directory, "firebase.ts"),
    ...modules
  },
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.html'],
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
      patterns: files.concat([
        {
          to: build_directory,
          from: path.join(source_directory, 'static')
        }
      ])
    }),
    new SpliceWebpackPlugin()
  ],
  optimization: {
    minimize: inProduction,
    minimizer: inProduction? [
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]: [
      new TerserPlugin()
    ],
    usedExports: true
  },
};