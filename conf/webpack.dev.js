const CopyPlugin = require('copy-webpack-plugin')
const HappyPack = require('happypack')
const HtmlPlugin = require('html-webpack-plugin')
const NameAllModulesPlugin = require('name-all-modules-plugin')
const ScriptExtPlugin = require('script-ext-html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const WebAppPlugin = require('webapp-webpack-plugin')
const webpack = require('webpack')
const {default: Config} = require('webpack-config')

const {ENTRY, FAVICON_OPTIONS, HTML_OPTIONS, md5} = require('./common.config')
const happyThreadPool = new HappyPack.ThreadPool({size: 5})

module.exports = new Config().extend('conf/webpack.base').merge({
  entry: {
    app: ['react-hot-loader/patch', ENTRY],
  },
  output: {
    pathinfo: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new HappyPack({
      loaders: ['babel-loader'],
      id: 'babel',
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {importLoaders: 1, sourceMap: true},
        },
        {
          loader: 'postcss-loader',
          options: {sourceMap: true},
        },
      ],
      id: 'css',
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {importLoaders: 1, sourceMap: true},
        },
        {
          loader: 'postcss-loader',
          options: {sourceMap: true},
        },
        'resolve-url-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            includePaths: [],
          },
        },
      ],
      id: 'scss',
      threadPool: happyThreadPool,
    }),
    new webpack.NamedChunksPlugin(
      chunk =>
        chunk.name
          ? chunk.name
          : md5(chunk.mapModules(m => m.identifier()).join()).slice(0, 10),
    ),
    new NameAllModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new CopyPlugin([], {debug: 'warning'}),
    new StylelintPlugin(),
    new HtmlPlugin(HTML_OPTIONS),
    new ScriptExtPlugin({
      defer: /app/,
      preload: /runtime/,
      module: /app|runtime/,
      custom: {
        test: /legacy/,
        attribute: 'nomodule',
      },
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new WebAppPlugin(FAVICON_OPTIONS),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    overlay: true,
    hot: true,
  },
})
