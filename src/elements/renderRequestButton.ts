import {generateId} from './utils'
import {renderSmallRequestButton} from './buttons/renderSmallRequestButton'
import {renderMediumRequestButton} from './buttons/renderMediumRequestButton'
import {renderLargeRequestButton} from './buttons/renderLargeRequestButton'
import {verifyJWT} from '../jwt'
import {RequestElementResult, ButtonOptions, JsonWebTokenConfig} from '../types'

const getLink = (jwtConfig: JsonWebTokenConfig, callbackUrl: string) =>
  `https://bloom.co/download?request=${window.btoa(JSON.stringify(jwtConfig))}&callback-url=${encodeURIComponent(callbackUrl)}`

const render = (id: string, anchor: HTMLAnchorElement, config: {jwtConfig: JsonWebTokenConfig; buttonOptions: ButtonOptions}) => {
  verifyJWT(config.jwtConfig)

  anchor.href = getLink(config.jwtConfig, config.buttonOptions.callbackUrl)

  // Clear all children
  while (anchor.lastChild) {
    anchor.removeChild(anchor.lastChild)
  }

  const buttonOptions = config.buttonOptions

  if (buttonOptions.size === 'sm') {
    renderSmallRequestButton(id, anchor, buttonOptions.type, buttonOptions.invert)
  } else if (buttonOptions.size === 'md') {
    renderMediumRequestButton(id, anchor, buttonOptions.type || 'verify')
  } else {
    renderLargeRequestButton(id, anchor, buttonOptions.type || 'verify')
  }
}

const updateRequestButton = (id: string, container: HTMLElement) => (config: {
  jwtConfig: JsonWebTokenConfig
  buttonOptions: ButtonOptions
}) => {
  const anchor = container.querySelector<HTMLAnchorElement>(`#${id}`)

  if (!anchor) return

  render(id, anchor, config)
}

const removeRequestButton = (id: string, container: HTMLElement) => () => {
  const anchor = container.querySelector(`#${id}`)

  if (anchor) anchor.remove()
}

const renderRequestButton = (config: {
  container: HTMLElement
  jwtConfig: JsonWebTokenConfig
  buttonOptions: ButtonOptions
}): RequestElementResult => {
  const id = generateId()

  const anchor = document.createElement('a')
  anchor.id = id

  anchor.href = getLink(config.jwtConfig, config.buttonOptions.callbackUrl)
  anchor.target = '_blank'
  anchor.rel = 'norefferer noopener'

  render(id, anchor, config)

  config.container.appendChild(anchor)

  return {
    update: updateRequestButton(id, config.container),
    remove: removeRequestButton(id, config.container),
  }
}

export {renderRequestButton}
