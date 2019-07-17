module.exports = ({config}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: 'babel-loader',
    options: {
      customize: require.resolve('babel-preset-react-app/webpack-overrides'),
      presets: [['react-app', {flow: false, typescript: true}]],
    },
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
