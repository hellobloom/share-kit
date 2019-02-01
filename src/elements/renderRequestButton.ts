import {oneLine, stripIndents} from 'common-tags'

import {generateId} from './utils'
import {RequestData, RequestButtonResult} from '../types'

/* tslint:disable:max-line-length */
const backgroundPattern =
  'data:image/png;base64,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'
/* tslint:enable:max-line-length */

const renderStyle = (id: string) => {
  const style = document.createElement('style')

  const styleText = stripIndents(oneLine)`
    #${id} {
      background-image: url(${backgroundPattern}), linear-gradient(to right, #7A7CF3, #6262F6);
      background-repeat: no-repeat;
      background-position: left 39px center, left center;
      background-size: 282px 100%, 100% 100%;
      color: #fff;
      text-decoration: none;
      display: flex;
      align-items: center;
      border-radius: 4px;
      padding: 12px 39px;
      font-size: 14px;
      box-sizing: border-box;
    }

    #${id}-lock-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      width: 24px;
      margin-left: -24px;
    }

    #${id}-text-and-logo {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      margin-left: 12px;
      margin-right: 12px;
    }

    #${id}-logo {
      margin-right: 8px;
    }
  `

  style.append(styleText)

  return style
}

/* tslint:disable:max-line-length */
const renderLockIcon = (id: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.id = `${id}-lock`
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
  g.setAttribute('fill', '#6263F6')

  g.appendChild(path)
  svg.appendChild(g)

  const container = document.createElement('span')
  container.id = `${id}-lock-container`

  container.appendChild(svg)

  return container
}
/* tslint:enable:max-line-length */

/* tslint:disable:max-line-length */
const renderBloomLogo = (id: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.id = `${id}-logo`
  svg.setAttribute('viewBox', '0 0 710 705')
  svg.setAttribute('width', '22px')
  svg.setAttribute('height', '22px')

  const renderLeafPath = () => {
    const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    leaf.setAttribute(
      'd',
      'M194.415739,215.192523 C194.258317,268.684765 150.797287,312 97.2080838,312 C43.6188804,312 0.157850908,268.684765 0.000429008653,215.192523 C2.08721929e-14,215.192523 -3.50299401,197.114019 15.1796407,156.874766 C47.118659,88.0834938 95.9422811,58.317757 95.9422811,58.317757 C95.9422811,58.317757 148.877246,91.5588785 180.404192,156.874766 C196.94399,191.141061 194.416168,215.192523 194.416168,215.192523 Z'
    )

    return leaf
  }

  const firstLeaf = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  firstLeaf.setAttribute('transform', 'translate(260.000000, -27.000000)')
  firstLeaf.appendChild(renderLeafPath())

  const secondLeaf = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  secondLeaf.setAttribute(
    'transform',
    'translate(357.500000, 576.000000) scale(1, -1) translate(-357.500000, -576.000000) translate(260.000000, 420.000000)'
  )
  secondLeaf.appendChild(renderLeafPath())

  const thirdLeaf = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  thirdLeaf.setAttribute(
    'transform',
    'translate(563.000000, 352.500000) scale(1, -1) rotate(90.000000) translate(-563.000000, -352.500000) translate(465.500000, 196.500000)'
  )
  thirdLeaf.appendChild(renderLeafPath())

  const fourthLeaf = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  fourthLeaf.setAttribute(
    'transform',
    'translate(147.000000, 351.500000) scale(-1, -1) rotate(90.000000) translate(-147.000000, -351.500000) translate(49.500000, 195.500000)'
  )
  fourthLeaf.appendChild(renderLeafPath())

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  g.setAttribute('fill', '#fff')

  g.appendChild(firstLeaf)
  g.appendChild(secondLeaf)
  g.appendChild(thirdLeaf)
  g.appendChild(fourthLeaf)

  svg.appendChild(g)

  return svg
}
/* tslint:enable:max-line-length */

/* tslint:disable:max-line-length */
const renderText = (id: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.id = `${id}-text`
  svg.setAttribute('viewBox', '0 0 111 15')
  svg.setAttribute('width', '111px')
  svg.setAttribute('height', '15px')

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  text.setAttribute(
    'd',
    'M.35 1.354h1.554l2.058 7.168 2.072-7.168h1.54L4.662 11H3.276L.35 1.354zM15.148 7.71c0 .154 0 .392-.014.532H9.94c.14 1.008.952 1.638 2.002 1.638.728 0 1.442-.336 1.778-.938.364.168.798.35 1.176.518-.574 1.148-1.792 1.68-3.024 1.68-1.862 0-3.36-1.358-3.36-3.43s1.498-3.388 3.36-3.388c1.862 0 3.276 1.316 3.276 3.388zM9.94 7.192h3.794c-.14-1.022-.882-1.61-1.862-1.61-1.008 0-1.792.602-1.932 1.61zm8.176 1.456V11h-1.442V4.462h1.442V5.96c.336-1.162.98-1.638 1.792-1.638.462 0 .952.112 1.162.252l-.238 1.33c-.364-.182-.686-.224-.966-.224-1.232 0-1.75 1.232-1.75 2.968zM23.688 11H22.26V4.462h1.428V11zm-1.68-9.184c0-.518.448-.91.966-.91.532 0 .952.392.952.91s-.42.91-.952.91c-.518 0-.966-.392-.966-.91zm7.616-.91v1.386h-.714c-.952 0-1.162.742-1.162 1.568v.602h1.47v1.19h-1.47V11h-1.456V5.652h-1.246v-1.19h1.246V3.86c0-1.792.826-2.954 2.618-2.954h.714zm6.846 3.556l-4.046 9.73h-1.512l1.414-3.5-2.59-6.23h1.54l1.82 4.48 1.834-4.48h1.54zm14.434 0L48.51 11h-1.19l-1.666-4.634L44.058 11h-1.176l-2.464-6.538h1.54l1.512 4.41 1.512-4.41h1.344l1.512 4.41 1.526-4.41h1.54zM53.592 11h-1.428V4.462h1.428V11zm-1.68-9.184c0-.518.448-.91.966-.91.532 0 .952.392.952.91s-.42.91-.952.91c-.518 0-.966-.392-.966-.91zm5.656.168v2.478h1.386v1.19h-1.386V11h-1.442V5.652H54.95v-1.19h1.176V1.984h1.442zm4.186 5.502V11h-1.442V.906h1.442v4.55c.364-.798 1.386-1.134 2.072-1.134 1.666 0 2.646 1.092 2.646 2.954V11H65.03V7.36c0-1.022-.644-1.624-1.456-1.624-.826 0-1.82.462-1.82 1.75zm16.828-3.584c0 .756-.308 1.596-1.246 1.96 1.134.252 1.764 1.386 1.764 2.31C79.1 9.698 78.022 11 76.202 11h-3.99V1.354h3.696c1.638 0 2.674.98 2.674 2.548zM73.71 5.316h2.142c.784 0 1.19-.63 1.19-1.358 0-.784-.49-1.246-1.288-1.246H73.71v2.604zm2.38 1.274h-2.38v3.052h2.422c.896 0 1.414-.742 1.414-1.484 0-.714-.532-1.568-1.456-1.568zM80.766 11V.906h1.442V11h-1.442zm6.44-1.26c1.092 0 1.988-.798 1.988-2.03 0-1.204-.896-1.974-1.988-1.974-1.078 0-1.974.77-1.974 1.974 0 1.232.896 2.03 1.974 2.03zm0 1.4c-1.848 0-3.402-1.358-3.402-3.43s1.554-3.388 3.402-3.388c1.862 0 3.43 1.316 3.43 3.388s-1.568 3.43-3.43 3.43zm8.008-1.4c1.092 0 1.988-.798 1.988-2.03 0-1.204-.896-1.974-1.988-1.974-1.078 0-1.974.77-1.974 1.974 0 1.232.896 2.03 1.974 2.03zm0 1.4c-1.848 0-3.402-1.358-3.402-3.43s1.554-3.388 3.402-3.388c1.862 0 3.43 1.316 3.43 3.388s-1.568 3.43-3.43 3.43zm12.474-5.404c-.952 0-1.582.7-1.582 1.75V11h-1.442V7.332c-.014-1.008-.56-1.596-1.33-1.596-.84 0-1.652.476-1.652 1.75V11h-1.442V4.462h1.442v.98c.434-.91 1.54-1.12 2.058-1.12 1.036 0 1.694.476 2.058 1.302.616-1.134 1.596-1.302 2.198-1.302 1.61 0 2.52 1.05 2.52 2.912V11h-1.442V7.36c0-1.022-.546-1.624-1.386-1.624z'
  )
  text.setAttribute('fill', '#fff')

  svg.appendChild(text)

  return svg
}
/* tslint:enable:max-line-length */

const renderTextAndLogo = (id: string) => {
  const textAndLogo = document.createElement('span')
  textAndLogo.id = `${id}-text-and-logo`
  textAndLogo.appendChild(renderBloomLogo(id))
  textAndLogo.appendChild(renderText(id))

  return textAndLogo
}

const getLink = (data: RequestData) => `https://bloom.co/download?request=${window.btoa(JSON.stringify(data))}`

const renderRequestButton = (container: HTMLElement, data: RequestData): RequestButtonResult => {
  const id = generateId()

  const anchor = document.createElement('a')
  anchor.id = id

  anchor.href = getLink(data)
  anchor.target = '_blank'
  anchor.rel = 'norefferer noopener'

  anchor.appendChild(renderStyle(id))
  anchor.appendChild(renderLockIcon(id))
  anchor.appendChild(renderTextAndLogo(id))

  container.appendChild(anchor)

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
