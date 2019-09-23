import {renderRequestQRCode} from '../../src/elements/renderRequestQRCode'
import {QROptions, ButtonOptions, JsonWebTokenConfig, Action} from '../../src/types'
import {generateJWT} from '../../src/jwt'
import {publicKey, privateKey} from '../keys'

jest.mock('../../src/elements/utils', () => {
  return {
    ...jest.requireActual('../../src/elements/utils'),
    generateId: () => 'bloom-request-element-',
  }
})

describe('renderRequestQRCode', () => {
  let requestQRCode: {
    update: (config: {jwtConfig: JsonWebTokenConfig; buttonOptions: ButtonOptions; options?: Partial<QROptions>}) => void
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
      jwtConfig: {
        token: generateJWT(
          {
            version: 1,
            action: Action.attestation,
            token: 'token',
            url: 'https://receive-kit.bloom.co/api/receive',
            payload_url: 'https://receive-kit.bloom.co/api/get-payload',
          },
          privateKey,
          {
            algorithm: 'RS512',
          },
        ),
        secretOrPublicKey: publicKey,
        options: {
          algorithms: ['RS512'],
        },
      },
    })
  })

  afterEach(() => {
    requestQRCode.remove()
  })

  test('renders the qr code', () => {
    expect(container.innerHTML).toMatchSnapshot()
  })

  test('throws when the JWT is invalid', () => {
    expect(() => {
      requestQRCode.update({
        jwtConfig: {
          token: generateJWT(
            {
              version: 1,
              action: Action.attestation,
              token: 'token',
              url: 'https://receive-kit.bloom.co/api/receive',
              payload_url: 'https://receive-kit.bloom.co/api/get-payload',
            },
            privateKey,
            {
              algorithm: 'RS512',
            },
          ),
          secretOrPublicKey: 'invalid',
          options: {
            algorithms: ['RS512'],
          },
        },
        buttonOptions: {callbackUrl: 'https://bloom.co/callback-url'},
      })
    }).toThrowErrorMatchingSnapshot()
  })

  test('removes qr code', () => {
    requestQRCode.remove()

    expect(container.querySelector('canvas')).toBeNull()
  })
})
