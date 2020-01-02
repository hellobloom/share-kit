import {renderRequestButton} from '../../src/elements/renderRequestButton'
import {RequestData, ButtonOptions} from '../../src/types'

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
        version: 1,
        token: 'token',
        url: 'https://receive-kit.bloom.co/api/receive',
        payload_url: 'https://receive-kit.bloom.co/api/get-payload',
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
        version: 1,
        token: 'token',
        url: 'https://receive-kit.bloom.co/api/receive',
        payload_url: 'https://receive-kit.bloom.co/api/get-payload',
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
        version: 1,
        token: 'token',
        url: 'https://receive-kit.bloom.co/api/receive',
        payload_url: 'https://receive-kit.bloom.co/api/get-payload',
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
        version: 1,
        token: 'token',
        url: 'https://receive-kit.bloom.co/api/receive',
        payload_url: 'https://receive-kit.bloom.co/api/get-payload',
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
