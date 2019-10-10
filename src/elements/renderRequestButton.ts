import {generateId} from './utils'
import {renderSmallRequestButton} from './buttons/renderSmallRequestButton'
import {renderMediumRequestButton} from './buttons/renderMediumRequestButton'
import {renderLargeRequestButton} from './buttons/renderLargeRequestButton'
import {RequestData, RequestElementResult, ButtonOptions} from '../types'
import {appendQuery} from '../append'

const getLink = (data: RequestData, callbackUrl: string) => {
  data.url = appendQuery(data.url, {'share-kit-from': 'button'})

  return `https://bloom.co/download?request=${window.btoa(JSON.stringify(data))}&callback-url=${encodeURIComponent(callbackUrl)}`
}

const render = (id: string, anchor: HTMLAnchorElement, config: {requestData: RequestData; buttonOptions: ButtonOptions}) => {
  anchor.href = getLink(config.requestData, config.buttonOptions.callbackUrl)

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

const updateRequestButton = (id: string, container: HTMLElement) => (config: {requestData: RequestData; buttonOptions: ButtonOptions}) => {
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
  requestData: RequestData
  buttonOptions: ButtonOptions
}): RequestElementResult => {
  const id = generateId()

  const anchor = document.createElement('a')
  anchor.id = id

  anchor.href = getLink(config.requestData, config.buttonOptions.callbackUrl)
  anchor.target = '_blank'
  anchor.rel = 'norefferer noopener'

  render(id, anchor, config)

  config.container.appendChild(anchor)

  return {
    update: updateRequestButton(id, config.container),
    remove: removeRequestButton(id, config.container),
  }
}

export {renderRequestButton, updateRequestButton}
