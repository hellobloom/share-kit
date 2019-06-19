import {renderRequestElement} from '../src/renderRequestElement'
import {Action} from '../src/types'
import * as qr from '../src/elements/renderRequestQRCode'
import * as btn from '../src/elements/renderRequestButton'

jest.mock('../src/elements/utils', () => {
  return {
    ...jest.requireActual('../src/elements/utils'),
    generateId: () => 'bloom-request-element-',
  }
})

/* tslint:disable:max-line-length */
const userAgents = {
  iOS:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
  macOs: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
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

  const renderElem = (config: {userAgent: string; shouldRenderButton?: () => boolean; url?: string}) => {
    Object.defineProperty(window.navigator, 'userAgent', {value: config.userAgent, writable: true})
    const requestElement = renderRequestElement({
      container,
      requestData: {
        action: Action.attestation,
        token: 'token',
        url: config.url || 'https://receive-kit.bloom.co/api/receive',
        org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
        org_name: 'Bloom',
        org_usage_policy_url: 'https://bloom.co/legal/terms',
        org_privacy_policy_url: 'https://bloom.co/legal/privacy',
        types: ['phone', 'email'],
      },
      shouldRenderButton: config.shouldRenderButton,
      buttonCallbackUrl: 'https://bloom.co/callback-url',
    })

    return requestElement
  }

  test('renders a button on mobile', () => {
    const element = renderElem({userAgent: userAgents.iOS})

    expect(container.querySelector('a')).not.toBeNull()
    expect(container.querySelector('canvas')).toBeNull()

    element.remove()
  })

  test('renders a QR code on desktop', () => {
    const element = renderElem({userAgent: userAgents.macOs})

    expect(container.querySelector('canvas')).not.toBeNull()
    expect(container.querySelector('a')).toBeNull()

    element.remove()
  })

  test('renders a QR code on mobile with an overriden check', () => {
    const element = renderElem({userAgent: userAgents.iOS, shouldRenderButton: () => false})

    expect(container.querySelector('canvas')).not.toBeNull()
    expect(container.querySelector('a')).toBeNull()

    element.remove()
  })

  test('renders a button on desktop with an overriden check', () => {
    const element = renderElem({userAgent: userAgents.macOs, shouldRenderButton: () => true})

    expect(container.querySelector('a')).not.toBeNull()
    expect(container.querySelector('canvas')).toBeNull()

    element.remove()
  })

  describe('appends the share-kit-from query correctly', () => {
    describe('on desktop when', () => {
      test('there are no existing query params', () => {
        const qrSpy = jest.spyOn(qr, 'renderRequestQRCode')

        renderElem({userAgent: userAgents.macOs})

        expect(qrSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            requestData: expect.objectContaining({url: 'https://receive-kit.bloom.co/api/receive?share-kit-from=qr'}),
          }),
        )
      })

      test('there are existing query params', () => {
        const qrSpy = jest.spyOn(qr, 'renderRequestQRCode')

        renderElem({userAgent: userAgents.macOs, url: 'https://receive-kit.bloom.co/api/receive?test='})

        expect(qrSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            requestData: expect.objectContaining({
              url: 'https://receive-kit.bloom.co/api/receive?test=&share-kit-from=qr',
            }),
          }),
        )
      })
    })

    describe('on mobile when', () => {
      test('there are no existing query params', () => {
        const btnSpy = jest.spyOn(btn, 'renderRequestButton')

        renderElem({userAgent: userAgents.iOS})

        expect(btnSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            requestData: expect.objectContaining({
              url: 'https://receive-kit.bloom.co/api/receive?share-kit-from=button',
            }),
          }),
        )
      })

      test('there are existing query params', () => {
        const btnSpy = jest.spyOn(btn, 'renderRequestButton')

        renderElem({userAgent: userAgents.iOS, url: 'https://receive-kit.bloom.co/api/receive?test='})

        expect(btnSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            requestData: expect.objectContaining({
              url: 'https://receive-kit.bloom.co/api/receive?test=&share-kit-from=button',
            }),
          }),
        )
      })
    })
  })
})
