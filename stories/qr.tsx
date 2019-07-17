import React, {useRef, useEffect, useState} from 'react'
import {storiesOf} from '@storybook/react'

import {RequestData, QROptions, RequestElementResult, renderRequestElement, Action} from '../src'

type CompProps = {
  requestData: RequestData
  qrOptions?: Partial<QROptions>
}

const Comp: React.FC<CompProps> = props => {
  const container = useRef<HTMLDivElement>(null)
  const requestElementResult = useRef<RequestElementResult | undefined>(undefined)

  const {requestData, qrOptions} = props

  useEffect(() => {
    if (!container.current) return

    if (requestElementResult.current) {
      requestElementResult.current.update({
        requestData,
        qrOptions,
        buttonOptions: {callbackUrl: ''},
      })
    } else {
      requestElementResult.current = renderRequestElement({
        container: container.current,
        requestData,
        shouldRenderButton: () => false,
        qrOptions,
        buttonOptions: {callbackUrl: ''},
      })
    }
  }, [container, requestData, qrOptions])

  return <div ref={container} />
}

const requestData: RequestData = {
  action: Action.attestation,
  token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
  url: 'https://receive-kit.bloom.co/api/receive',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['phone', 'email'],
}

const Updating: React.FC = () => {
  const [count, setCount] = useState(0)

  const data: RequestData = {
    action: Action.attestation,
    token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
    url: 'https://receive-kit.bloom.co/api/receive',
    org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
    org_name: `Bloom ${count}`,
    org_usage_policy_url: 'https://bloom.co/legal/terms',
    org_privacy_policy_url: 'https://bloom.co/legal/privacy',
    types: ['phone', 'email'],
  }

  return (
    <React.Fragment>
      <Comp requestData={data} />
      <button onClick={() => setCount(count + 1)}>Update QR Code</button>
    </React.Fragment>
  )
}

const Logo: React.FC = () => {
  const [logoHidden, setLogoHidden] = useState(false)

  return (
    <React.Fragment>
      <Comp requestData={requestData} qrOptions={{hideLogo: logoHidden}} />
      <button onClick={() => setLogoHidden(!logoHidden)}>{logoHidden ? 'Show' : 'Hide'} Logo</button>
    </React.Fragment>
  )
}

storiesOf('QR', module)
  .add('Basic', () => <Comp requestData={requestData} />)
  .add('Colors', () => (
    <Comp
      requestData={requestData}
      qrOptions={{
        bgColor: '#EBF0F1',
        fgColor: '#3C3C3D',
      }}
    />
  ))
  .add('Logo', () => <Logo />)
  .add('Size', () => <Comp requestData={requestData} qrOptions={{size: 300}} />)
  .add('Updating', () => <Updating />)
  .add('Padding', () => <Comp requestData={requestData} qrOptions={{padding: 10, bgColor: '#EBF0F1', fgColor: '#3C3C3D'}} />)
