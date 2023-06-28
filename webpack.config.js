const HtmlWebpackPlugin = require('html-webpack-plugin');
require('webpack');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  watch: true,
  entry: './src/index',
  mode: 'development',
  devServer: {
    compress: true,
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [ new HtmlWebpackPlugin({ template: './src/index.html' }), new CopyPlugin({
      patterns: [
        { from: "src/img", to: "img" },
        { from: "src/404.html", to: ""},
        // { from: "other", to: "public" },
      ],
    }),
  ],
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
};