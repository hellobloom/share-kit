![Share Kit](logo.png)

# Share Kit

Easily allow your users to share their verified personal information directly with your application by scanning a QR code.

## Installation

```
yarn add @bloom/share-kit
```

## Usage

### Plain

```typescript
import {createShareQRCode, removeShareQRCode} from '@bloom/share-kit'

const shareData = {}
const options = {
  size: 200,
}

const shareQRCodeId = createShareQRCode(shareData, window.querySelector('#my-container'), options)

// Some time later
removeShareQRCode(shareQRCodeId)
```

### React

```typescript
import * as React from 'react'
import {ShareQRCode} from '@bloom/share-kit'

const MyComponent: React.SFC = props => {
  const shareData = {}
  return <ShareQRCode shareData={shareData} size={200} />
}
```

## ShareData

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
|      |             |      |         |

## Options

| Name     | Description                          | Type               | Default   |
| -------- | ------------------------------------ | ------------------ | --------- |
| size     | The height and width of the QR code. | `number`           | `128`     |
| bgColor  | The background color of the QR code. | `string`           | `#fff`    |
| fgColor  | The foreground color of the QR code. | `string`           | `#6067f1` |
| renderAs | What the QR code should render as.   | `"svg" | "canvas"` | `svg`     |
