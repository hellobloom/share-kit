import React, {useRef, useEffect, useState} from 'react'
import {storiesOf} from '@storybook/react'

import {RequestElementResult, renderRequestElement, ButtonOptions, ButtonSize, JsonWebTokenConfig, RequestData, Action} from '../src'
import {generateJWT} from '../src'

type CompProps = {
  jwtConfig: JsonWebTokenConfig
  buttonOptions: ButtonOptions
}

const Comp: React.FC<CompProps> = props => {
  const container = useRef<HTMLDivElement>(null)
  const requestElementResult = useRef<RequestElementResult | undefined>(undefined)

  const {jwtConfig, buttonOptions} = props

  useEffect(() => {
    if (!container.current) return

    if (requestElementResult.current) {
      requestElementResult.current.update({
        jwtConfig,
        buttonOptions,
      })
    } else {
      requestElementResult.current = renderRequestElement({
        container: container.current,
        jwtConfig,
        shouldRenderButton: () => true,
        buttonOptions,
      })
    }
  }, [container, requestData, buttonOptions])

  return <div ref={container} style={{width: buttonOptions.size === 'lg' || buttonOptions.size === undefined ? '335px' : undefined}} />
}

const requestData: RequestData = {
  version: 1,
  action: Action.attestation,
  token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
  url: 'https://receive-kit.bloom.co/api/receive',
  payload_url: 'https://receive-kit.bloom.co/api/get-payload?token=',
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
      <Comp buttonOptions={buttonOptions} jwtConfig={jwtConfig} />
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
  .add('Basic', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions}} />)
  .add('Invalid', () => <Comp jwtConfig={invalidJwtConfig} buttonOptions={{...baseButtonOptions}} />)
  .add('Updating', () => <Updating />)

storiesOf('Button/Large', module)
  .add('Default', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions}} />)
  .add('Log In', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, type: 'log-in'}} />)
  .add('Sign Up', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, type: 'sign-up'}} />)
  .add('Connect', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, type: 'connect'}} />)
  .add('Bloom', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, type: 'bloom'}} />)

storiesOf('Button/Medium', module)
  .add('Verify', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'md'}} />)
  .add('Log In', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'md', type: 'log-in'}} />)
  .add('Sign Up', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'md', type: 'sign-up'}} />)
  .add('Connect', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'md', type: 'connect'}} />)
  .add('Bloom', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'md', type: 'bloom'}} />)

storiesOf('Button/Small', module)
  .add('Square', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'square'}} />)
  .add('Rounded Square', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'rounded-square'}} />)
  .add('Circle', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'circle'}} />)
  .add('Squircle', () => <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'squircle'}} />)
  .add('Inverted', () => (
    <div style={{backgroundColor: '#6262F6', padding: '4px', display: 'inline-block'}}>
      <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'square', invert: true}} />
      <div style={{height: '4px'}} />
      <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'rounded-square', invert: true}} />
      <div style={{height: '4px'}} />
      <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'circle', invert: true}} />
      <div style={{height: '4px'}} />
      <Comp jwtConfig={jwtConfig} buttonOptions={{...baseButtonOptions, size: 'sm', type: 'squircle', invert: true}} />
    </div>
  ))
