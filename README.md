# share-kit

> Easily create a QR Code to that allows Bloom users to share their data

- **[Installation](#installation)**
- **[Usage](#usage)**
  - **[Request](#request)**
    - **[Usage](#usage)**
      - **[React](#react)**
      - **[Plain](#plain)**
    - **[Types](#request-types)**
      - **[RequestData](#requestdata)**
      - **[Options](#options)**
  - **[Response](#response)**
    - **[Types](#response-types)**
      - **[ResponseData](#responsedata)**
      - **[AttestationData](#attestationdata)**

## Installation

```
yarn add @bloom/share-kit
```

## Request

First you have to request data from the user.

### Usage

#### React

```typescript
import * as React from 'react'
import {RequestQRCode, RequestData} from '@bloom/share-kit'

const MyComponent: React.SFC = props => {
  const requestData: RequestData = {...}
  return <RequestQRCode requestData={requestData} size={200} />
}
```

#### Plain

```typescript
import {createRequestQRCode, removeRequestQRCode, RequestData} from '@bloom/share-kit'

const requestData: RequestData = {...}
const options = {
  size: 200,
}

const requestQRCodeId = createRequestQRCode(requestData, window.querySelector('#my-container'), options)

// Some time later
removeRequestQRCode(requestQRCodeId)
```

### Types {#request-types}

#### RequestData

Data to be rendered into the RequestQRCode.

| Name         | Description                                                   | Type     |
| ------------ | ------------------------------------------------------------- | -------- |
| action       |                                                               | `Action` |
| token        |                                                               | `string` |
| url          | The API endpoint to POST the `ResponseData` to                | `string` |
| org_logo_url | A url of the logo to display to the user when requesting data | `string` |
| org_name     | The name of the organization requesting data                  | `string` |
| types        | The type of attestions required and the amount needed         | `Types`  |

#### Example

```ts
{
  action: Action.attestation,
  token: '...',
  url: '...',
  org_logo_url: '...',
  org_name: '...',
  types: {
    phone: 1,
    email: 1,
    sanctionScreen: 1,
  },
}
```

#### Options

Display options for the RequestQRCode.

| Name     | Description                          | Type               | Default   |
| -------- | ------------------------------------ | ------------------ | --------- |
| size     | The height and width of the QR code. | `number`           | `128`     |
| bgColor  | The background color of the QR code. | `string`           | `#fff`    |
| fgColor  | The foreground color of the QR code. | `string`           | `#6067f1` |
| renderAs | What the QR code should render as.   | `"svg" | "canvas"` | `svg`     |

## Response

When the user allows access you get a response back.

### Types {#response-types}

#### ResponseData

This is the shape of the object that will be POSTed to the provided URL

| Name     | Description                               | Type     |
| -------- | ----------------------------------------- | -------- |
| bloom_id | The user's BloomID                        | `number` |
| nonces   | maps `AttestationTypeID` to `NonceData[]` | `Nonces` |

#### NonceData

Data associated with the attestation

| Name   | Description                                               | Type       |
| ------ | --------------------------------------------------------- | ---------- |
| nonce  | The nonce of the attestation                              | `string`   |
| data   | The proof of the attestation                              | `string`   |
| tx     | The Ethereum transaction corresponding to the attestation | `string`   |
| hashes | List of hashes of the attestation                         | `string[]` |

#### Example

```json
{
  "bloom_id": 299,
  "attestations": {
    "phone": [
      {
        "nonce": "...",
        "data": "...",
        "tx": "...",
        "hashes": ["...", "..."]
      }
    ],
    "email": [
      {
        "nonce": "...",
        "data": "...",
        "tx": "...",
        "hashes": ["...", "..."]
      }
    ],
    "sanctionScreen": [
      {
        "nonce": "...",
        "data": "...",
        "tx": "...",
        "hashes": ["...", "..."]
      }
    ]
  }
}
```
