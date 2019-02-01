import {renderRequestButton} from './renderRequestButton'
import {Action, RequestData} from '../..'

jest.mock('./utils', () => {
  return {
    ...jest.requireActual('./utils'),
    generateId: () => 'bloom-request-element-',
  }
})

describe('renderRequestButton', () => {
  let requestButton: {update: (config: {requestData: RequestData}) => void; remove: () => void}
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
    })
  })

  afterEach(() => {
    requestButton.remove()
  })

  test('renders a button', () => {
    expect(container.innerHTML).toMatchSnapshot()

    const href = container.querySelector('a')!.href

    const requestQuery = href.replace('https://bloom.co/download?request=', '')

    expect(JSON.parse(window.atob(requestQuery))).toMatchSnapshot()
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
    })

    const href = container.querySelector('a')!.href

    const requestQuery = href.replace('https://bloom.co/download?request=', '')

    expect(JSON.parse(window.atob(requestQuery))).toMatchSnapshot()
  })

  test('removes the button', () => {
    requestButton.remove()

    expect(container.querySelector('a')).toBeNull()
  })
})
