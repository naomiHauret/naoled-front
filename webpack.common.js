const path = require("path")
const webpack = require("webpack")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const Dotenv = require("dotenv-webpack")
const exludedFolders = [path.join(__dirname, "node_modules")]

let plugins = [
  new Dotenv(),
  new CopyPlugin([
    { from: "./src/assets/fonts", to: "./assets/fonts" },
  ]),
  new MiniCssExtractPlugin({
    filename: "assets/stylesheets/[name].[hash].css",
  }),
]

module.exports = {
  entry: {
    client: "./src/index.js",
  },
  output: {
    filename: "assets/scripts/[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].js",
  },
  resolve: {
    modules: [
      path.resolve("./src"),
      path.resolve("./src/app"),
      path.resolve("./node_modules"),
    ],
  },
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: exludedFolders,
        use: "babel-loader",
      },
      // CSS
      {
        test: /src(\/|\\).*\.css$/,
        exclude: exludedFolders,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: false,
            },
          },
          'postcss-loader',
        ],
      },
      // Assets
      {
        test: /\.(png|jpg|jpeg|gif|svg|mp3|wav|ogg|flac|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(frag|vert|glsl)$/,
        use: [
          {
            loader: 'glsl-shader-loader',
            options: {}
          }
        ]
      }
    ],
  },
  plugins,
}