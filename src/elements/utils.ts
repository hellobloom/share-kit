const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const generateId = () => {
  let rand = ''
  for (var i = 0; i < 4; i++) {
    rand += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return 'bloom-request-button-' + rand
}

export {generateId}
