const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const generateId = () => {
  let rand = ''
  for (let i = 0; i < 4; i++) {
    rand += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return 'bloom-request-element-' + rand
}

export const logoWithColors = (config: {fgColor: string; bgColor: string}) =>
  `<svg width="25" height="25" viewBox="0 0 710 705" xmlns="http://www.w3.org/2000/svg">
    <path fill="${config.bgColor}" d="M0 0h710v705H0z"/>
    <path fill="${config.fgColor}" d="M454.416 188.193C454.258 241.685 410.797 285 357.208 285c-53.59 0-97.05-43.315-97.208-96.807 0 0-3.503-18.079 15.18-58.318 31.939-68.792 80.762-98.557 80.762-98.557s52.935 33.24 84.462 98.557c16.54 34.266 14.012 58.318 14.012 58.318zm0 328.614C454.258 463.315 410.797 420 357.208 420c-53.59 0-97.05 43.315-97.208 96.807 0 0-3.503 18.079 15.18 58.318 31.939 68.792 80.762 98.557 80.762 98.557s52.935-33.24 84.462-98.557c16.54-34.266 14.012-58.318 14.012-58.318zm49.391-261.223c-53.492.158-96.807 43.619-96.807 97.208 0 53.59 43.315 97.05 96.807 97.208 0 0 18.079 3.503 58.318-15.18 68.792-31.939 98.557-80.762 98.557-80.762s-33.24-52.935-98.557-84.462c-34.266-16.54-58.318-14.012-58.318-14.012zm-297.614-1c53.492.158 96.807 43.619 96.807 97.208 0 53.59-43.315 97.05-96.807 97.208 0 0-18.079 3.503-58.318-15.18-68.792-31.939-98.557-80.762-98.557-80.762s33.24-52.935 98.557-84.462c34.266-16.54 58.318-14.012 58.318-14.012z"/>
  </svg>`

export const getBloomLogo = (config?: {fgColor?: string; bgColor?: string}) => {
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

/**
 * Slightly modified from: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
 * @param str The string to be copied to the clipboard
 */
export const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea') // Create a <textarea> element
  el.value = str // Set its value to the string that you want copied
  el.setAttribute('readonly', '') // Make it readonly to be tamper-proof
  el.style.position = 'absolute'
  el.style.left = '-9999px' // Move outside the screen to make it invisible
  document.body.appendChild(el) // Append the <textarea> element to the HTML document
  const selection = document.getSelection()
  const selected = !selection
    ? false
    : selection.rangeCount > 0 // Check if there is any content selected previously
    ? selection.getRangeAt(0) // Store selection if found
    : false // Mark as false to know no selection existed before
  el.select() // Select the <textarea> content
  document.execCommand('copy') // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el) // Remove the <textarea> element
  if (selected && selection) {
    // If a selection existed before copying
    selection.removeAllRanges() // Unselect everything on the HTML document
    selection.addRange(selected) // Restore the original selection
  }
}
