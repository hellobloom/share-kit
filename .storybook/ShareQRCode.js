import React from 'react'
import {storiesOf} from '@storybook/react'

import {RequestQRCode, Action} from '../index'
import {Manager} from './Manager'

const defaultData = {
  action: Action.attestation,
  token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
  url: 'https://bloom.co/api/receiveData',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['phone', 'email'],
}

storiesOf('RequestQRCode', module)
  .add('Default', () => <RequestQRCode requestData={defaultData} />)
  .add('Colors', () => <RequestQRCode requestData={defaultData} bgColor={'#EBF0F1'} fgColor={'#3C3C3D'} />)
  .add('Size', () => <RequestQRCode requestData={defaultData} size={300} />)
  .add('Managed', () => <Manager requestData={defaultData} />)
