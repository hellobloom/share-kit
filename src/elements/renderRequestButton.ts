import {oneLine, stripIndents} from 'common-tags'

import {generateId} from './utils'
import {RequestData} from '../types'

const renderStyle = (id: string) => {
  const style = document.createElement('style')

  const styleText = stripIndents(oneLine)`
    #${id} {
      background-image: linear-gradient(#7A7CF3, #6262F6);
      color: #fff;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      border-radius: 4px;
      padding: 16px;
    }
  `

  style.append(styleText)

  return style
}

/* tslint:disable:max-line-length */
const renderLockIcon = (fill: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 15 20')
  svg.setAttribute('width', '20px')
  svg.setAttribute('height', '15px')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

  path.setAttribute(
    'd',
    'M19.5833203,9.5 L18.3333203,9.5 L18.3333203,7.83332031 C18.3333203,4.61679687 15.7165625,2 12.5,2 C9.2834375,2 6.66667969,4.61679687 6.66667969,7.83332031 L6.66667969,9.5 L5.41667969,9.5 C5.18636719,9.5 5,9.68636719 5,9.91667969 L5,20.3333594 C5,21.2525391 5.74746094,22 6.66667969,22 L18.3333594,22 C19.2525391,22 20,21.2525391 20,20.3333203 L20,9.91667969 C20,9.68636719 19.8136328,9.5 19.5833203,9.5 Z M13.7475781,18.2040234 C13.7605859,18.3216016 13.7227734,18.4396094 13.6438281,18.5279297 C13.5648828,18.6162109 13.4517578,18.6666797 13.3333594,18.6666797 L11.6666797,18.6666797 C11.5482813,18.6666797 11.4351563,18.6162109 11.3562109,18.5279297 C11.2772656,18.4396484 11.2394141,18.3216406 11.2524609,18.2040234 L11.5153125,15.8403516 C11.0884766,15.5298828 10.8333594,15.03875 10.8333594,14.5 C10.8333594,13.5808203 11.5808203,12.8333203 12.5000391,12.8333203 C13.4192578,12.8333203 14.1667188,13.5807812 14.1667188,14.5 C14.1667188,15.03875 13.9116016,15.5298828 13.4847656,15.8403516 L13.7475781,18.2040234 Z M15.8333203,9.5 L9.16667969,9.5 L9.16667969,7.83332031 C9.16667969,5.99535156 10.6620313,4.5 12.5,4.5 C14.3379688,4.5 15.8333203,5.99535156 15.8333203,7.83332031 L15.8333203,9.5 Z'
  )

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  g.setAttribute('transform', 'translate(-5, -2)')
  g.setAttribute('fill', fill)

  g.appendChild(path)
  svg.appendChild(g)

  return svg
}
/* tslint:enable:max-line-length */

const getLink = (data: RequestData) => `https://bloom.co/download?request=${window.btoa(JSON.stringify(data))}`

const renderRequestButton = (container: HTMLElement, data: RequestData) => {
  const id = generateId()

  const anchor = document.createElement('a')
  anchor.id = id

  anchor.href = getLink(data)
  anchor.target = '_blank'
  anchor.rel = 'norefferer noopener'

  anchor.appendChild(renderStyle(id))
  anchor.appendChild(renderLockIcon(''))
  anchor.append('Tap to share!')

  container.append(anchor)

  return {
    update: updateRequestButton(id, container),
    remove: removeRequestButton(id, container),
  }
}

const updateRequestButton = (id: string, container: HTMLElement) => (data: RequestData) => {
  const button = container.querySelector<HTMLAnchorElement>(`#${id}`)

  if (!button) return

  button.href = getLink(data)
}

const removeRequestButton = (id: string, container: HTMLElement) => () => {
  const button = container.querySelector(`#${id}`)

  if (button) button.remove()
}

export {renderRequestButton}
