const path = require('path')
module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('ts-loader'),
  })
  defaultConfig.resolve.extensions.push('.ts', '.tsx')
  return defaultConfig
}
