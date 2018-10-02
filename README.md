# share-kit

> Easily create a QR Code to that allows Bloom users to share their data

- [share-kit](#share-kit)
  - [Installation](#installation)
  - [Request](#request)
    - [Usage](#usage)
      - [React](#react)
      - [Plain](#plain)
    - [Types {#request-types}](#types-request-types)
      - [RequestData](#requestdata)
      - [Example](#example)
      - [Options](#options)
  - [Response](#response)
    - [Types {#response-types}](#types-response-types)
      - [ResponseData](#responsedata)
      - [VerifiedData](#verifieddata)
      - [Attestation](#attestation)
      - [Proof](#proof)
      - [Example TODO with real hashes that can be verified with attestations-lib](#example-todo-with-real-hashes-that-can-be-verified-with-attestations-lib)
  - [Receive](#receive)

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

| Name                   | Description                                                        | Type     |
| ---------------------- | ------------------------------------------------------------------ | -------- |
| action                 |                                                                    | `Action` |
| token                  |                                                                    | `string` |
| url                    | The API endpoint to POST the `ResponseData` to                     | `string` |
| org_logo_url           | A url of the logo to display to the user when requesting data      | `string` |
| org_name               | The name of the organization requesting data                       | `string` |
| types                  | The type of attestions required and the amount needed              | `Types`  |
| org_usage_policy_url   | The url of the usage policy for the organization requesting data   | `string` |
| org_privacy_policy_url | The url of the privacy policy for the organization requesting data | `string` |

#### Example

```ts
{
  action: Action.attestation,
  token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
  url: 'bloom.co/api/receiveData/mock',
  org_logo_url: 'bloom.co/images/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/privacy',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['phone', 'email'],
}
```

![alt text](images/sampleQR.png)

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

| Name     | Description                    | Type           |
| -------- | ------------------------------ | -------------- |
| bloom_id | The user's BloomID             | `number`       |
| data     | Array of VerifiedData objects  | `VerifiedData` |

#### VerifiedData

Data associated with the attestation

| Name     | Description                                                        | Type            |
| -------- | ------------------------------------------------------------------ | --------------- |
| tx       | The Ethereum transaction corresponding to the attestation          | `string`        |
| stage    | The Ethereum network name on which the tx can be found             | `string`        |
| rootHash | Root hash of the data merkle tree emitted by the attestation event | `string`        |
| target   | Root hash of the data merkle tree emitted by the attestation event | `Attestation`   |
| proof    | Array of hashes needed to perform the merkle proof                 | `Proof`         |

#### Attestation

Format of target attestation data

| Name     | Description                                                       | Type           |
| -------- | ----------------------------------------------------------------- | -------------- |
| type     | String identifying the type of attestation                        | `string`       |
| provider | Optional identifier of the service used to verify this data       | `string`       |
| data     | Stringified plaintext representation of the verified data         | `string`       |
| nonce    | Unique hex string used to obfuscate the hashed form of this data  | `string`       |
| version  | Semantic version used to keep track of attestation data formats   | `string`       |

#### Proof

Format of proof object used to perform merkle proof

| Name     | Description                                                       | Type           |
| -------- | ----------------------------------------------------------------- | -------------- |
| position | `left` or `right` indicating position of hash in merkle tree | `string`       |
| data     | Hex string of node hash                                      | `string`       |

#### Example TODO with real hashes that can be verified with attestations-lib

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
## Receive 

Info on how to verify the data received by the POST