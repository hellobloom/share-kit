# data-request-kit

> Easily create a QR Code to request a user's Bloom data

## Installation

```
yarn add @bloom/share-kit
```

## Usage

### Plain

```typescript
import {createShareQRCode} from '@bloom/share-kit'

const requestData = {}
const options = {
  size: 200,
  container: window.querySelector('#my-container'),
}

createShareQRCode(requestData, options)
```

### React

```typescript
import * as React from 'react'
import {ShareQRCode} from '@bloom/share-kit'

const MyComponent: React.SFC = props => {
  const requestData = {}
  return <ShareQRCode requestData={requestData} size={200} />
}
```

## ShareData

## Options

| Name      | Description                                                                 | Type               | Default         |
| --------- | --------------------------------------------------------------------------- | ------------------ | --------------- |
| size      | The height and width of the QR code.                                        | `number`           | `128`           |
| bgColor   | The background color of the QR code.                                        | `string`           | `#fff`          |
| fgColor   | The foreground color of the QR code.                                        | `string`           | `#6067f1`       |
| renderAs  | What the QR code should render as.                                          | `"svg" | "canvas"` | `svg`           |
| container | Element to render the QR code into. (Not available via the React component) | `HTMLElement`      | `document.body` |
