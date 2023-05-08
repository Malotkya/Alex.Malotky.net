const path = require('path');

const dev = process.argv.includes('-d');
const public_directory = path.resolve(__dirname, 'public');

module.exports = {
  mode: dev? "development": "production",
  entry: './src/index.ts',
  devtool: dev? 'source-map': undefined,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'app.js',
    path: public_directory
  }
};