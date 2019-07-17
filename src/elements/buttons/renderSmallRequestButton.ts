import {oneLine, stripIndents} from 'common-tags'

import {renderBloomLogo} from './renderBloomLogo'
import {SmallButtonType} from '../../types'

const renderStyle = (id: string, type: SmallButtonType) => {
  const style = document.createElement('style')

  let borderRadius: string

  switch (type) {
    case 'circle':
      borderRadius = '100%'
      break
    case 'squircle':
      borderRadius = '12px'
      break
    case 'rounded-square':
      borderRadius = '8px'
      break
    case 'square':
    case 'inverted':
    default:
      borderRadius = '0'
      break
  }

  let styleText = stripIndents(oneLine)`
    #${id} {
      background-color: ${type === 'inverted' ? 'transparent' : '#6262F6'};
      color: ${type === 'inverted' ? '#6262F6' : '#fff'};
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: ${borderRadius};
    }
  `

  style.append(styleText)

  return style
}

const renderSmallRequestButton = (id: string, anchor: HTMLAnchorElement, type: SmallButtonType) => {
  anchor.append(renderStyle(id, type))
  anchor.append(renderBloomLogo(id))
}

export {renderSmallRequestButton}
