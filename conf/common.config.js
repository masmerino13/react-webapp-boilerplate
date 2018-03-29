const HappyPack = require('happypack')
const crypto = require('crypto')
const path = require('path')
const pkg = require('../package.json')

module.exports = {
  ENTRY: path.resolve(__dirname, '..', pkg.main),
  OUTPUT_PATH: path.resolve(__dirname, '..', pkg.config.webpack.outputPath),
  STATS_PATH: path.resolve(__dirname, '..', '.vscode/webpack/stats.json'),
  PUBLIC_PATH: pkg.config.webpack.publicPath,
  FAVICON_OPTIONS: {
    logo: path.resolve(__dirname, '..', pkg.config.webpack.favicon),
    inject: true,
    favicons: {
      appName: pkg.displayName,
      appDescription: pkg.description,
      developerName: pkg.author,
      start_url: '/index.html?pwa=1', // eslint-disable-line
      icons: {
        android: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: false,
        windows: true,
        yandex: false,
      },
    },
  },
  HTML_OPTIONS: {
    title: pkg.displayName,
    description: pkg.description,
    template: path.resolve(__dirname, '..', 'src/index.ejs'),
  },
  MANIFEST_FILENAME: `${pkg.name}.json`,
  get MANIFEST_SEED() {
    try {
      return path.resolve(__dirname, '..', pkg.config.webpack.manifestFile)
    } catch (e) {
      return {}
    }
  },
  getHappyThreadPool(size) {
    return new HappyPack.ThreadPool({size})
  },
  vendors: Object.keys(pkg.dependencies || {}),
  md5(data) {
    return crypto
      .createHash('md5')
      .update(data)
      .digest('hex')
  },
}
