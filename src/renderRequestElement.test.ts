import {renderRequestElement} from './renderRequestElement'
import {Action} from './types'

jest.mock('./elements/utils', () => {
  return {
    ...jest.requireActual('./elements/utils'),
    generateId: () => 'bloom-request-element-',
  }
})

/* tslint:disable:max-line-length */
const userAgents = {
  iOS:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
  macOs:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
}
/* tslint:enable:max-line-length */

describe('renderRequestElement', () => {
  let container: HTMLElement
  let prevUserAgent: string

  beforeAll(() => {
    container = document.createElement('div')
    prevUserAgent = window.navigator.userAgent
  })

  afterAll(() => {
    container.remove()
    Object.defineProperty(window.navigator, 'userAgent', {value: prevUserAgent, writable: false})
  })

  const renderElem = (userAgent: string, shouldRenderButton?: () => boolean) => {
    Object.defineProperty(window.navigator, 'userAgent', {value: userAgent, writable: true})
    const requestElement = renderRequestElement(
      container,
      {
        action: Action.attestation,
        token: 'token',
        url: 'https://receive-kit.bloom.co/api/receive',
        org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
        org_name: 'Bloom',
        org_usage_policy_url: 'https://bloom.co/legal/terms',
        org_privacy_policy_url: 'https://bloom.co/legal/privacy',
        types: ['phone', 'email'],
      },
      {},
      shouldRenderButton
    )

    return requestElement
  }

  test('renders a button on mobile', () => {
    const element = renderElem(userAgents.iOS)

    expect(container.querySelector('a')).not.toBeNull()
    expect(container.querySelector('canvas')).toBeNull()

    element.remove()
  })

  test('renders a QR code on desktop', () => {
    const element = renderElem(userAgents.macOs)

    expect(container.querySelector('canvas')).not.toBeNull()
    expect(container.querySelector('a')).toBeNull()

    element.remove()
  })

  test('renders a QR code on mobile with an overriden check', () => {
    const element = renderElem(userAgents.iOS, () => false)

    expect(container.querySelector('canvas')).not.toBeNull()
    expect(container.querySelector('a')).toBeNull()

    element.remove()
  })

  test('renders a button on desktop with an overriden check', () => {
    const element = renderElem(userAgents.macOs, () => true)

    expect(container.querySelector('a')).not.toBeNull()
    expect(container.querySelector('canvas')).toBeNull()

    element.remove()
  })
})
