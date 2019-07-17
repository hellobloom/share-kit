import React, {useRef, useEffect, useState} from 'react'
import {storiesOf} from '@storybook/react'

import {RequestElementResult, renderRequestElement, ButtonOptions, RequestData, Action, ButtonSize} from '../src'

type CompProps = {
  requestData: RequestData
  buttonOptions: ButtonOptions
}

const Comp: React.FC<CompProps> = props => {
  const container = useRef<HTMLDivElement>(null)
  const requestElementResult = useRef<RequestElementResult | undefined>(undefined)

  const {requestData, buttonOptions} = props

  useEffect(() => {
    if (!container.current) return

    if (requestElementResult.current) {
      requestElementResult.current.update({
        requestData,
        buttonOptions,
      })
    } else {
      requestElementResult.current = renderRequestElement({
        container: container.current,
        requestData,
        shouldRenderButton: () => true,
        buttonOptions,
      })
    }
  }, [container, requestData, buttonOptions])

  return <div ref={container} style={{width: buttonOptions.size === 'lg' || buttonOptions.size === undefined ? '335px' : undefined}} />
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
  const [size, setSize] = useState<ButtonSize>('lg')

  let buttonOptions: ButtonOptions

  switch (size) {
    case 'sm':
      buttonOptions = {
        callbackUrl: 'https://mysite.com/bloom-callback',
        size,
        type: 'squircle',
      }
      break
    case 'md':
      buttonOptions = {
        callbackUrl: 'https://mysite.com/bloom-callback',
        size,
        type: 'log-in',
      }
      break
    case 'lg':
      buttonOptions = {
        callbackUrl: 'https://mysite.com/bloom-callback',
        size,
        type: 'connect',
      }
      break
    default:
      throw new Error('Unsupported type')
  }

  return (
    <React.Fragment>
      <Comp buttonOptions={buttonOptions} requestData={requestData} />
      <div style={{paddingTop: '8px'}}>
        <label>
          <input
            type="radio"
            name="size"
            value="sm"
            checked={size === 'sm'}
            onChange={() => {
              setSize('sm')
            }}
          />
          Small
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value="md"
            checked={size === 'md'}
            onChange={() => {
              setSize('md')
            }}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            name="size"
            value="lg"
            checked={size === 'lg'}
            onChange={() => {
              setSize('lg')
            }}
          />
          Large
        </label>
      </div>
    </React.Fragment>
  )
}

const baseButtonOptions: ButtonOptions = {
  callbackUrl: 'https://mysite.com/bloom-callback',
}

storiesOf('Button', module)
  .add('Basic', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions}} />)
  .add('Updating', () => <Updating />)

storiesOf('Button/Large', module)
  .add('Default', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions}} />)
  .add('Log In', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, type: 'log-in'}} />)
  .add('Sign Up', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, type: 'sign-up'}} />)
  .add('Connect', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, type: 'connect'}} />)
  .add('Bloom', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, type: 'bloom'}} />)

storiesOf('Button/Medium', module)
  .add('Verify', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'md'}} />)
  .add('Log In', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'md', type: 'log-in'}} />)
  .add('Sign Up', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'md', type: 'sign-up'}} />)
  .add('Connect', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'md', type: 'connect'}} />)
  .add('Bloom', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'md', type: 'bloom'}} />)

storiesOf('Button/Small', module)
  .add('Square', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'square'}} />)
  .add('Rounded Square', () => (
    <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'rounded-square'}} />
  ))
  .add('Circle', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'circle'}} />)
  .add('Squircle', () => <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'squircle'}} />)
  .add('Inverted', () => (
    <div style={{backgroundColor: '#6262F6', padding: '4px', display: 'inline-block'}}>
      <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'square', invert: true}} />
      <div style={{height: '4px'}} />
      <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'rounded-square', invert: true}} />
      <div style={{height: '4px'}} />
      <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'circle', invert: true}} />
      <div style={{height: '4px'}} />
      <Comp requestData={requestData} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'squircle', invert: true}} />
    </div>
  ))
