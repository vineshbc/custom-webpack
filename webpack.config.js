const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require('path');
module.exports = {
  "mode": "none",
  "entry": "./src/index.js",
  "output": {
    "path": __dirname + '/dist',
    "filename": "index.js"
  },
  plugins: [new MiniCssExtractPlugin({filename:'index.css'}), new CopyPlugin({
    patterns: [
      {
        from: "*.(png|jpg|html)",
        to({ context, absoluteFilename }) {
          return "[name][ext]";
        },

      },
    ],
  }),],
  devServer: {
    static: path.join(__dirname, '')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }

    ],
  },
}