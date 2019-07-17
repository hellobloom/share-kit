import {renderRequestButton} from '../../src/elements/renderRequestButton'
import {Action, RequestData, ButtonOptions} from '../../src/types'

jest.mock('../../src/elements/utils', () => {
  return {
    ...jest.requireActual('../../src/elements/utils'),
    generateId: () => 'bloom-request-element-',
  }
})

describe('renderRequestButton', () => {
  let requestButton: {
    update: (config: {requestData: RequestData; buttonOptions: ButtonOptions}) => void
    remove: () => void
  }
  let container: HTMLDivElement

  beforeAll(() => {
    container = document.createElement('div')
  })

  afterAll(() => {
    container.remove()
  })

  beforeEach(() => {
    requestButton = renderRequestButton({
      container,
      requestData: {
        action: Action.attestation,
        token: 'token',
        url: 'https://receive-kit.bloom.co/api/receive',
        org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
        org_name: 'Bloom',
        org_usage_policy_url: 'https://bloom.co/legal/terms',
        org_privacy_policy_url: 'https://bloom.co/legal/privacy',
        types: ['phone', 'email'],
      },
      buttonOptions: {
        callbackUrl: 'https://bloom.co/callback-url',
      },
    })
  })

  afterEach(() => {
    requestButton.remove()
  })

  test('renders a button', () => {
    expect(container.innerHTML).toMatchSnapshot()

    const search = container.querySelector('a')!.href.replace('https://bloom.co/download', '')
    const urlParams = new URLSearchParams(search)

    const requestQuery = urlParams.get('request')!
    const callbackUrlQuery = urlParams.get('callback-url')!

    expect(JSON.parse(window.atob(requestQuery))).toMatchSnapshot()
    expect(callbackUrlQuery).toMatchSnapshot()
  })

  test('renders a medium button', () => {
    requestButton.update({
      requestData: {
        action: Action.attestation,
        token: 'token',
        url: 'https://receive-kit.bloom.co/api/receive',
        org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
        org_name: 'Bloom',
        org_usage_policy_url: 'https://bloom.co/legal/terms',
        org_privacy_policy_url: 'https://bloom.co/legal/privacy',
        types: ['phone', 'email'],
      },
      buttonOptions: {
        callbackUrl: 'https://bloom.co/callback-url',
        size: 'md',
      },
    })

    expect(container.innerHTML).toMatchSnapshot()
  })

  test('renders a small button', () => {
    requestButton.update({
      requestData: {
        action: Action.attestation,
        token: 'token',
        url: 'https://receive-kit.bloom.co/api/receive',
        org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
        org_name: 'Bloom',
        org_usage_policy_url: 'https://bloom.co/legal/terms',
        org_privacy_policy_url: 'https://bloom.co/legal/privacy',
        types: ['phone', 'email'],
      },
      buttonOptions: {
        callbackUrl: 'https://bloom.co/callback-url',
        size: 'sm',
        type: 'square',
      },
    })

    expect(container.innerHTML).toMatchSnapshot()
  })

  test('updates the button', () => {
    requestButton.update({
      requestData: {
        action: Action.attestation,
        token: 'token 2',
        url: 'https://receive-kit.bloom.co/api/receive',
        org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
        org_name: 'Bloom',
        org_usage_policy_url: 'https://bloom.co/legal/terms',
        org_privacy_policy_url: 'https://bloom.co/legal/privacy',
        types: ['phone', 'email'],
      },
      buttonOptions: {
        callbackUrl: 'https://bloom.co/callback-url-2',
      },
    })

    const search = container.querySelector('a')!.href.replace('https://bloom.co/download', '')
    const urlParams = new URLSearchParams(search)

    const requestQuery = urlParams.get('request')!
    const callbackUrlQuery = urlParams.get('callback-url')!

    expect(JSON.parse(window.atob(requestQuery))).toMatchSnapshot()
    expect(callbackUrlQuery).toMatchSnapshot()
  })

  test('removes the button', () => {
    requestButton.remove()

    expect(container.querySelector('a')).toBeNull()
  })
})
