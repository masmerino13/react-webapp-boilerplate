const CopyPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HappyPack = require('happypack')
const HtmlCriticalPlugin = require('html-critical-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const NameAllModulesPlugin = require('name-all-modules-plugin')
const OfflinePlugin = require('offline-plugin')
const ScriptExtPlugin = require('script-ext-html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const WebAppPlugin = require('webapp-webpack-plugin')
const webpack = require('webpack')
const {default: Config} = require('webpack-config')

const happyThreadPool = new HappyPack.ThreadPool({size: 5})
const {
  FAVICON_OPTIONS,
  HTML_OPTIONS,
  MANIFEST_FILENAME,
  MANIFEST_SEED,
  OUTPUT_PATH,
  md5,
} = require('./common.config')

module.exports = new Config().extend('conf/webpack.base').merge({
  plugins: [
    new HappyPack({
      loaders: ['babel-loader'],
      id: 'babel',
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
            minimize: {
              discardComments: {
                removeAll: true,
              },
              zindex: false,
            },
          },
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
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: true,
            minimize: {
              discardComments: {
                removeAll: true,
              },
              zindex: false,
              minifyFontValues: false,
            },
          },
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
    new webpack.HashedModuleIdsPlugin(),
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash:10].js',
      minChunks(module) {
        return module.context && module.context.includes('node_modules')
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ManifestPlugin({
      fileName: MANIFEST_FILENAME,
      seed: MANIFEST_SEED,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV || '"development"',
    }),
    new CopyPlugin([], {debug: 'info'}),
    new StylelintPlugin({failOnError: true}),
    new HtmlPlugin(
      Object.assign(HTML_OPTIONS, {
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          preserveLineBreaks: true,
          removeComments: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          keepClosingSlash: true,
        },
      }),
    ),
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
    new ExtractTextPlugin({
      filename: 'css/[name]-[chunkhash:10].css',
      allChunks: true,
    }),
    new HtmlCriticalPlugin({
      base: OUTPUT_PATH,
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      height: 1024,
      width: 768,
      penthouse: {
        blockJSRequests: false,
      },
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: true,
      },
      parallel: true,
    }),
    new OfflinePlugin(),
  ],
})
