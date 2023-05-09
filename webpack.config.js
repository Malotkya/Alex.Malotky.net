const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

//directories used multiple times
const build_directory = path.resolve(__dirname, 'build');
const source_directory = path.resolve(__dirname, "src");

//test if in dev environment
const dev = process.argv.includes('-d');

//create minify requirements if in dev
const minify = dev? {
  minimize: true,
  minimizer:[
    new HtmlMinimizerPlugin(),
    new CssMinimizerPlugin()
  ]
} : undefined;

//export config
module.exports = {
  mode: dev? "development": "production",
  entry: [
    path.join(source_directory, 'scripts', 'index.ts'),
    path.join(source_directory, 'styles', 'main.scss')
  ],
  devtool: dev? 'source-map': undefined,
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
  output: {
    filename: 'script.js',
    path: build_directory,
    clean: !dev
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          to: build_directory,
          from: path.join(source_directory, 'static')
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          to: path.join(build_directory, 'templates'),
          from: path.join(source_directory, 'views')
        }
      ]
    }),
    
  ],
  optimization: minify
};