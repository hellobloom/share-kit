import {renderRequestQRCode} from '../../src/elements/renderRequestQRCode'
import {RequestData, QROptions, ButtonOptions} from '../../src/types'

jest.mock('../../src/elements/utils', () => {
  return {
    ...jest.requireActual('../../src/elements/utils'),
    generateId: () => 'bloom-request-element-',
  }
})

describe('renderRequestQRCode', () => {
  let requestQRCode: {
    update: (config: {requestData: RequestData; buttonOptions: ButtonOptions; options?: Partial<QROptions>}) => void
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
    requestQRCode = renderRequestQRCode({
      container,
      requestData: {
        version: 1,
        token: 'token',
        url: 'https://receive-kit.bloom.co/api/receive',
        payload_url: 'https://receive-kit.bloom.co/api/get-payload',
      },
    })
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
