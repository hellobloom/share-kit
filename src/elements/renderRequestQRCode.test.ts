import {renderRequestQRCode} from './renderRequestQRCode'
import {Action, RequestData} from '../..'
import {QROptions} from '../types'

jest.mock('./utils', () => {
  return {
    ...jest.requireActual('./utils'),
    generateId: () => 'bloom-request-element-',
  }
})

describe('renderRequestQRCode', () => {
  let requestQRCode: {update: (data: RequestData, options: Partial<QROptions>) => void; remove: () => void}
  let container: HTMLDivElement

  beforeAll(() => {
    container = document.createElement('div')
  })

  afterAll(() => {
    container.remove()
  })

  beforeEach(() => {
    requestQRCode = renderRequestQRCode(
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
      {}
    )
  })

  afterEach(() => {
    requestQRCode.remove()
  })

  test('renders the qr code', () => {
    expect(container.innerHTML).toMatchSnapshot()
  })

  test('removes qr code', () => {
    requestQRCode.remove()

    expect(container.querySelector('canvas')).toBeNull()
  })
})
