import React from 'react'
import {storiesOf} from '@storybook/react'

import {ShareQRCode} from '../index'
import {Manager} from './Manager'

storiesOf('ShareQRCode', module)
  .add('Default', () => <ShareQRCode shareData={{}} />)
  .add('Colors', () => <ShareQRCode shareData={{}} bgColor={'#EBF0F1'} fgColor={'#3C3C3D'} />)
  .add('Size', () => <ShareQRCode shareData={{}} size={300} />)
  .add('Canvas', () => <ShareQRCode shareData={{}} renderAs="canvas" />)
  .add('Managed', () => <Manager />)
