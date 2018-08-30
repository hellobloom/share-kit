import {configure} from '@storybook/react'

function loadStories() {
  require('./ShareQRCode')
}

configure(loadStories, module)
