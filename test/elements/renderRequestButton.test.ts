import jwt from 'jsonwebtoken'

import {renderRequestButton} from '../../src/elements/renderRequestButton'
import {ButtonOptions, JsonWebTokenConfig} from '../../src/types'
import {publicKey, privateKey} from '../keys'

jest.mock('../../src/elements/utils', () => {
  return {
    ...jest.requireActual('../../src/elements/utils'),
    generateId: () => 'bloom-request-element-',
  }
})

describe('renderRequestButton', () => {
  let requestButton: {
    update: (config: {jwtConfig: JsonWebTokenConfig; buttonOptions: ButtonOptions}) => void
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
      jwtConfig: {
        token: jwt.sign(
          {
            version: 1,
            action: 'request_attestation_data',
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

    const callbackUrlQuery = urlParams.get('callback-url')!

    expect(callbackUrlQuery).toMatchSnapshot()
  })

  test('throws when the JWT is invalid', () => {
    expect(() => {
      requestButton.update({
        jwtConfig: {
          token: jwt.sign(
            {
              version: 1,
              action: 'request_attestation_data',
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
        },
        buttonOptions: {
          callbackUrl: 'https://bloom.co/callback-url',
          size: 'md',
        },
      })
    }).toThrowErrorMatchingSnapshot()
  })

  test('renders a medium button', () => {
    requestButton.update({
      jwtConfig: {
        token: jwt.sign(
          {
            version: 1,
            action: 'request_attestation_data',
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
      buttonOptions: {
        callbackUrl: 'https://bloom.co/callback-url',
        size: 'md',
      },
    })

    expect(container.innerHTML).toMatchSnapshot()
  })

  test('renders a small button', () => {
    requestButton.update({
      jwtConfig: {
        token: jwt.sign(
          {
            version: 1,
            action: 'request_attestation_data',
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
      jwtConfig: {
        token: jwt.sign(
          {
            version: 1,
            action: 'request_attestation_data',
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
      buttonOptions: {
        callbackUrl: 'https://bloom.co/callback-url-2',
      },
    })

    const search = container.querySelector('a')!.href.replace('https://bloom.co/download', '')
    const urlParams = new URLSearchParams(search)

    const callbackUrlQuery = urlParams.get('callback-url')!

    expect(callbackUrlQuery).toMatchSnapshot()
  })

  test('removes the button', () => {
    requestButton.remove()

    expect(container.querySelector('a')).toBeNull()
  })
})
