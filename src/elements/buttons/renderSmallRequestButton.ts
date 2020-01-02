import {oneLine, stripIndents} from 'common-tags'

import {renderBloomLogo} from './renderBloomLogo'
import {SmallButtonType} from '../../types'

const renderStyle = (id: string, type: SmallButtonType, invert?: boolean) => {
  const style = document.createElement('style')

  let borderRadius: string

  switch (type) {
    case 'circle':
      borderRadius = '100%'
      break
    case 'squircle':
      borderRadius = '8px'
      break
    case 'rounded-square':
      borderRadius = '4px'
      break
    case 'square':
      borderRadius = '0'
      break
    default:
      throw new Error(`Unsupported type: ${type}`)
  }

  const styleText = stripIndents(oneLine)`
    #${id} {
      background-color: ${invert ? '#fff' : '#6262F6'};
      color: ${invert ? '#6262F6' : '#fff'};
      border-radius: ${borderRadius};
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      height: 34px;
      width: 34px;
    }

    #${id}-logo {
      width: 20px;
    }
  `

  style.append(styleText)

  return style
}

export const renderSmallRequestButton = (id: string, anchor: HTMLAnchorElement, type: SmallButtonType, invert?: boolean) => {
  anchor.append(renderStyle(id, type, invert))
  anchor.append(renderBloomLogo(id))
}
