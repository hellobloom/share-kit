# data-request-kit

> Easily create a QR Code to request a user's Bloom data

## Installation

```
yarn add @bloom/data-request-kit
```

## Usage

### Plain

```typescript
import {createRequestQRCode} from 'data-request-kit'

const requestData = {}
const options = {
  size: 200,
  container: window.querySelector('#my-container'),
}

createRequestQRCode(requestData, options)
```

### React

```typescript
import * as React from 'react'
import {RequestQRCode} from 'data-request-kit'

const MyComponent: React.SFC = props => {
  const requestData = {}
  return <RequestQRCode requestData={requestData} size={200} />
}
```

## RequestData

## Options

| Name      | Description                                                                 | Type               | Default         |
| --------- | --------------------------------------------------------------------------- | ------------------ | --------------- |
| size      | The height and width of the QR code.                                        | `number`           | `128`           |
| bgColor   | The background color of the QR code.                                        | `string`           | `#fff`          |
| fgColor   | The foreground color of the QR code.                                        | `string`           | `#6067f1`       |
| renderAs  | What the QR code should render as.                                          | `"svg" | "canvas"` | `svg`           |
| container | Element to render the QR code into. (Not available via the React component) | `HTMLElement`      | `document.body` |
