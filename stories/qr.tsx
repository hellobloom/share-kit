import React, {useRef, useEffect, useState} from 'react'
import {storiesOf} from '@storybook/react'

import {QROptions, RequestElementResult, renderRequestElement, JsonWebTokenConfig, RequestData, Action} from '../src'
import {generateJWT} from '../src'

type CompProps = {
  jwtConfig: JsonWebTokenConfig
  qrOptions?: Partial<QROptions>
}

const Comp: React.FC<CompProps> = props => {
  const container = useRef<HTMLDivElement>(null)
  const requestElementResult = useRef<RequestElementResult | undefined>(undefined)

  const {jwtConfig, qrOptions} = props

  useEffect(() => {
    if (!container.current) return

    if (requestElementResult.current) {
      requestElementResult.current.update({
        jwtConfig,
        qrOptions,
        buttonOptions: {callbackUrl: ''},
      })
    } else {
      requestElementResult.current = renderRequestElement({
        container: container.current,
        jwtConfig,
        shouldRenderButton: () => false,
        qrOptions,
        buttonOptions: {callbackUrl: ''},
      })
    }
  }, [container, jwtConfig, qrOptions])

  return <div ref={container} />
}

const requestData: RequestData = {
  version: 1,
  action: Action.attestation,
  token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
  url: 'https://receive-kit.bloom.co/api/receive',
  payload_url: 'https://receive-kit.bloom.co/api/get-payload?token=a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
}

const jwtConfig: JsonWebTokenConfig = {
  token: generateJWT(requestData, 'shhhhh'),
  secretOrPublicKey: 'shhhhh',
}

const invalidJwtConfig: JsonWebTokenConfig = {
  token: generateJWT(requestData, 'shhhhh'),
  secretOrPublicKey: 'invalid',
}

const Updating: React.FC = () => {
  const [count, setCount] = useState(0)

  const data: RequestData = {
    version: 1,
    action: Action.attestation,
    token: `a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf - ${count}`,
    url: 'https://receive-kit.bloom.co/api/receive',
    payload_url: 'https://receive-kit.bloom.co/api/get-payload?token=a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
  }

  const jwtConfig = {
    token: generateJWT(data, 'shhhhh'),
    secretOrPublicKey: 'shhhhh',
  }

  return (
    <React.Fragment>
      <Comp jwtConfig={jwtConfig} />
      <button onClick={() => setCount(count + 1)}>Update QR Code</button>
    </React.Fragment>
  )
}

const Logo: React.FC = () => {
  const [logoHidden, setLogoHidden] = useState(false)

  return (
    <React.Fragment>
      <Comp jwtConfig={jwtConfig} qrOptions={{hideLogo: logoHidden}} />
      <button onClick={() => setLogoHidden(!logoHidden)}>{logoHidden ? 'Show' : 'Hide'} Logo</button>
    </React.Fragment>
  )
}

storiesOf('QR', module)
  .add('Basic', () => <Comp jwtConfig={jwtConfig} />)
  .add('Invalid', () => <Comp jwtConfig={invalidJwtConfig} />)
  .add('Colors', () => (
    <Comp
      jwtConfig={jwtConfig}
      qrOptions={{
        bgColor: '#EBF0F1',
        fgColor: '#3C3C3D',
      }}
    />
  ))
  .add('Logo', () => <Logo />)
  .add('Size', () => <Comp jwtConfig={jwtConfig} qrOptions={{size: 300}} />)
  .add('Updating', () => <Updating />)
  .add('Padding', () => <Comp jwtConfig={jwtConfig} qrOptions={{padding: 10, bgColor: '#EBF0F1', fgColor: '#3C3C3D'}} />)
