const {default: Config, environment} = require('webpack-config')

module.exports = (env = {}) => {
  environment.setAll({
    env() {
      return env.prod ? 'build' : 'dev'
    },
  })

  return new Config().extend('conf/webpack.[env]')
}
