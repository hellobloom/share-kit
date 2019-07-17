const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const generateId = () => {
  let rand = ''
  for (var i = 0; i < 4; i++) {
    rand += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return 'bloom-request-element-' + rand
}

const logoWithColors = (config: {fgColor: string; bgColor: string}) =>
  `<svg width="25" height="25" viewBox="0 0 710 705" xmlns="http://www.w3.org/2000/svg">
    <path fill="${config.bgColor}" d="M0 0h710v705H0z"/>
    <path fill="${config.fgColor}" d="M454.416 188.193C454.258 241.685 410.797 285 357.208 285c-53.59 0-97.05-43.315-97.208-96.807 0 0-3.503-18.079 15.18-58.318 31.939-68.792 80.762-98.557 80.762-98.557s52.935 33.24 84.462 98.557c16.54 34.266 14.012 58.318 14.012 58.318zm0 328.614C454.258 463.315 410.797 420 357.208 420c-53.59 0-97.05 43.315-97.208 96.807 0 0-3.503 18.079 15.18 58.318 31.939 68.792 80.762 98.557 80.762 98.557s52.935-33.24 84.462-98.557c16.54-34.266 14.012-58.318 14.012-58.318zm49.391-261.223c-53.492.158-96.807 43.619-96.807 97.208 0 53.59 43.315 97.05 96.807 97.208 0 0 18.079 3.503 58.318-15.18 68.792-31.939 98.557-80.762 98.557-80.762s-33.24-52.935-98.557-84.462c-34.266-16.54-58.318-14.012-58.318-14.012zm-297.614-1c53.492.158 96.807 43.619 96.807 97.208 0 53.59-43.315 97.05-96.807 97.208 0 0-18.079 3.503-58.318-15.18-68.792-31.939-98.557-80.762-98.557-80.762s33.24-52.935 98.557-84.462c34.266-16.54 58.318-14.012 58.318-14.012z"/>
  </svg>`

const getBloomLogo = (config?: {fgColor?: string; bgColor?: string}) => {
  const defaultedConfig = Object.assign(
    {
      fgColor: '#6067f1',
      bgColor: '#fff',
    },
    config || {},
  )
  defaultedConfig.fgColor = encodeURIComponent(defaultedConfig.fgColor)
  defaultedConfig.bgColor = encodeURIComponent(defaultedConfig.bgColor)

  return `data:image/svg+xml;utf8,${logoWithColors(defaultedConfig)}`
}

export {generateId, getBloomLogo}
