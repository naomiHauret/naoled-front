const path = require('path')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('brotli-webpack-plugin')
const common = require('./webpack.common.js')

let plugins = [
  new HtmlPlugin({
    template: "./src/index.html",
    excludeChunks: ["base"],
    filename: "index.html",
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
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8,
          warnings: false,
          compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
            drop_debugger: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
          sourceMap: false,
          pure_funcs: ['console.log'],
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
      }),
    ],
  },
  plugins,
})