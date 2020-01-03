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
        shouldRenderButton: false,
        qrOptions,
        buttonOptions: {callbackUrl: ''},
      })
    }

    return () => {
      requestElementResult.current?.remove()
      requestElementResult.current = undefined
    }
  }, [container, requestData, qrOptions])

  return <div ref={container} />
}

const Updating: React.FC<{requestData: RequestData}> = props => {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <Comp
        requestData={{
          ...props.requestData,
          token: `${props.requestData.token} ${count}`,
        }}
      />
      <button onClick={() => setCount(count + 1)}>Update QR Code</button>
    </React.Fragment>
  )
}

const Logo: React.FC<{requestData: RequestData}> = props => {
  const [logoHidden, setLogoHidden] = useState(false)

  return (
    <React.Fragment>
      <Comp requestData={props.requestData} qrOptions={{hideLogo: logoHidden}} />
      <button onClick={() => setLogoHidden(!logoHidden)}>{logoHidden ? 'Show' : 'Hide'} Logo</button>
    </React.Fragment>
  )
}

const allVersions: {label: string; requestData: RequestData}[] = [
  {
    label: 'V1',
    requestData: {
      version: 1,
      token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
      url: 'https://receive-kit.bloom.co/api/receive',
      payload_url: 'https://receive-kit.bloom.co/api/payload/a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
    },
  },
  {
    label: 'Legacy',
    requestData: {
      action: Action.attestation,
      token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
      url: 'https://receive-kit.bloom.co/api/receive',
      org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
      org_name: 'Bloom',
      org_usage_policy_url: 'https://bloom.co/legal/terms',
      org_privacy_policy_url: 'https://bloom.co/legal/privacy',
      types: ['phone', 'email'],
    },
  },
]

allVersions.forEach(({label, requestData}) => {
  storiesOf(`QR/${label}`, module)
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
    .add('Logo', () => <Logo requestData={requestData} />)
    .add('Size', () => <Comp requestData={requestData} qrOptions={{size: 300}} />)
    .add('Updating', () => <Updating requestData={requestData} />)
    .add('Padding', () => <Comp requestData={requestData} qrOptions={{padding: 10, bgColor: '#EBF0F1', fgColor: '#3C3C3D'}} />)
})
