let plugins = [
  require('postcss-import')(),
  require('postcss-url')(),
  require('rucksack-css')({
    fallbacks: true,
    reporter: true,
  }),
  require('postcss-short'),
  require('postcss-cssnext')({
    warnForDuplicates: false,
    browsers: ['Chrome >= 53'],
  }),
  require('postcss-logical-props'),
  require('postcss-media-minmax'),
]

if (
  process.env.NODE_ENV === 'production' ||
  process.env.npm_lifecycle_event === 'build'
) {
  plugins = [
    ...plugins,
    require('css-mqpacker')(),
    require('postcss-mq-keyframes')(),
  ]
}
plugins = [...plugins, require('postcss-reporter')()]

module.exports = {
  plugins,
}
