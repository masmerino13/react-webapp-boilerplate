const config = require('./common.config')
const {resolve} = require('path')

const IS_BUILD =
  process.env.NODE_ENV === 'production' ||
  process.env.npm_lifecycle_event === 'build'

module.exports.entry = {
  app: config.ENTRY,
}

module.exports.output = {
  path: config.OUTPUT_PATH,
  filename: 'js/[name]-[hash:10].js',
  chunkFilename: 'js/[name]-[chunkhash:10].js',
  publicPath: config.PUBLIC_PATH,
}

module.exports.devtool = 'source-map'

module.exports.module = {
  rules: [
    {
      test: /\.jsx?$/i,
      exclude: /node_modules|bower_components|jspm_packages/,
      loader: 'eslint-loader',
      enforce: 'pre',
    },
    {
      test: /\.jsx?$/i,
      exclude: /node_modules|bower_components|jspm_packages/,
      loader: 'happypack/loader?id=babel',
    },
    {
      test: /\.css$/i,
      use: {
        loader: 'happypack/loader',
        options: {id: 'css'},
      },
    },
    {
      test: /\.scss$/i,
      use: {
        loader: 'happypack/loader',
        options: {id: 'scss'},
      },
    },
    {
      test: /\.json5/i,
      loader: 'json5-loader',
    },
    {
      test: /\.svg$/i,
      exclude: /fonts?/i,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {extract: true},
        },
        {
          loader: 'img-loader',
          options: {
            enabled: IS_BUILD,
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:10].[ext]',
            outputPath: 'img/',
          },
        },
        {
          loader: 'img-loader',
          options: {
            enabled: IS_BUILD,
          },
        },
      ],
    },
    {
      test: /\.(woff2?|[ot]tf|eot|svg)(\?v=\d+(\.\d+\.\d+)?)?$/i,
      loader: 'file-loader',
      include: /fonts?|icons?/i,
      options: {
        outputPath: 'fonts/',
        name: '[name]-[hash:10].[ext]',
      },
    },
  ],
}

module.exports.resolve = {
  extensions: ['.js', '.json', '.json5', '.css', '.scss'],
  modules: [
    resolve(__dirname, '..', 'src'),
    resolve(__dirname, '..', 'node_modules'),
  ],
}
