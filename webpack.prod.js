const path = require('path')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('brotli-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common.js')

let plugins = [
  new HtmlPlugin({
    template: "./src/index.html",
    excludeChunks: ["base"],
    filename: "200.html",
    minify: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
    },
  }),
  new CompressionPlugin({
    algorithm: "gzip",
    asset: "[path].gz[query]",
    test: /\.(html|js|css|svg|ttf|eot|otf|woff|ico)$/,
    minRatio: 0.8,
  }),
]
module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
          priority: 20
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
      }),
    ],
  },
  plugins,
})