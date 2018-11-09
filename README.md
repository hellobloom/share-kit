![Share Kit](https://github.com/hellobloom/share-kit/blob/master/images/logo.png)

# Share Kit

Easily allow your users to share their verified personal information directly with your application by scanning a QR code.

- [Share Kit](#share-kit)
  - [Installation](#installation)
  - [Request](#request)
    - [Usage](#usage)
      - [React](#react)
      - [Plain](#plain)
      - [RequestData](#requestdata)
      - [Options](#options)
  - [Response](#response)
    - [ResponseData](#responsedata)
    - [VerifiedData](#verifieddata)
    - [Attestation](#attestation)
    - [Proof](#proof)
  - [Receive](#receive)
    - [1. Perform Merkle Proof](#1-perform-merkle-proof)
    - [2. Recover Ethereum address from signature](#2-recover-ethereum-address-from-signature)
    - [3. Retrieve BloomID for recovered address](#3-retrieve-bloomid-for-recovered-address)
    - [4. Retrieve dataHash and attestation ID from attestation in specified transaction](#4-retrieve-datahash-and-attestation-id-from-attestation-in-specified-transaction)
    - [5. Confirm attestation status](#5-confirm-attestation-status)
- [Using Share-Kit for BloomID Sign-In](#using-share-kit-for-bloomid-sign-in)
  - [1. Configure an endpoint to receive data](#1-configure-an-endpoint-to-receive-data)
  - [2. Embed a QR code with a link to your endpoint and the verified data you would like to receive](#2-embed-a-qr-code-with-a-link-to-your-endpoint-and-the-verified-data-you-would-like-to-receive)
  - [3. Add verification to the endpoint](#3-add-verification-to-the-endpoint)
  - [4. Listen for a login over a websocket connection to the server](#4-listen-for-a-login-over-a-websocket-connection-to-the-server)
  - [5. Authorize the user to log in to the account matching the verified email](#5-authorize-the-user-to-log-in-to-the-account-matching-the-verified-email)

## Installation

```
yarn add @bloomprotocol/share-kit
```

## Request

First you have to request data from the user.

### Usage

#### React

```typescript
import * as React from 'react'
import {RequestQRCode, RequestData} from '@bloomprotocol/share-kit'

const MyComponent: React.SFC = props => {
  const requestData: RequestData = {...}
  return <RequestQRCode requestData={requestData} size={200} />
}
```

#### Plain

```typescript
import {generateRequestQRCode} from '@bloomprotocol/share-kit'

const requestData: RequestData = {...}
const options = {
  size: 200,
}

const canvas = document.createElement('canvas')

generateRequestQRCode(canvas, requestData, options)
```

<h3 id="request-types">Types</h3>

#### RequestData

Data to be rendered into the RequestQRCode.

| Name                   | Description                                                        | Type                                                                                   |
| ---------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| action                 | Action type                                                        | `Action`                                                                               |
| token                  | Unique string to identify this data request                        | `string`                                                                               |
| url                    | The API endpoint to POST the `ResponseData` to                     | `string`                                                                               |
| org_logo_url           | A url of the logo to display to the user when requesting data      | `string`                                                                               |
| org_name               | The name of the organization requesting data                       | `string`                                                                               |
| types                  | The type of attestions required and the amount needed              | [`(keyof typeof AttestationTypeID)[]`](https://github.com/hellobloom/attestations-lib) |
| org_usage_policy_url   | The url of the usage policy for the organization requesting data   | `string`                                                                               |
| org_privacy_policy_url | The url of the privacy policy for the organization requesting data | `string`                                                                               |

<h4 id="request-example">Example</h4>

```ts
{
  action: <Action>"request_attestation_data",
  token: '0x8f31e48a585fd12ba58e70e03292cac712cbae39bc7eb980ec189aa88e24d043',
  url: 'https://bloom.co/api/receiveData',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['full-name', 'phone', 'email'],
}
```

![Sample QR](https://github.com/hellobloom/share-kit/blob/master/images/sampleQR.png)

#### Options

Display options for the RequestQRCode.

| Name      | Description                                      | Type      | Default    |
| --------- | ------------------------------------------------ | --------- | ---------- |
| size      | The height and width of the QR code.             | `number`  | `128`      |
| bgColor   | The background color of the QR code.             | `string`  | `#fff`     |
| fgColor   | The foreground color of the QR code.             | `string`  | `#6067f1`  |
| logoImage | The `<img />` src to displayed over the QR code. | `string`  | Bloom logo |
| hideLogo  | Whether the `logoImage` should be rendered.      | `boolean` | `false`    |

## Response

When the user allows access you get a response back.

<h3 id="response-types">Types</h3>

#### ResponseData

This is the shape of the object that will be POSTed to the provided URL

| Name      | Description                                 | Type           |
| --------- | ------------------------------------------- | -------------- |
| bloom_id  | The user's BloomID                          | `number`       |
| token     | Unique string to identify this data request | `string`       |
| signature | Request body signed by the Bloom app wallet | `string`       |
| data      | Array of VerifiedData objects               | `VerifiedData` |

#### VerifiedData

Data associated with the attestation

| Name     | Description                                                        | Type          |
| -------- | ------------------------------------------------------------------ | ------------- |
| tx       | The Ethereum transaction corresponding to the attestation          | `string`      |
| stage    | The Ethereum network name on which the tx can be found             | `string`      |
| rootHash | Root hash of the data merkle tree emitted by the attestation event | `string`      |
| target   | Target attestation data                                            | `Attestation` |
| proof    | Array of hashes needed to perform the merkle proof                 | `Proof`       |

#### Attestation

Format of target attestation data

| Name     | Description                                                      | Type     |
| -------- | ---------------------------------------------------------------- | -------- |
| type     | String identifying the type of attestation                       | `string` |
| provider | Optional identifier of the service used to verify this data      | `string` |
| data     | Stringified plaintext representation of the verified data        | `string` |
| nonce    | Unique hex string used to obfuscate the hashed form of this data | `string` |
| version  | Semantic version used to keep track of attestation data formats  | `string` |

#### Proof

Format of proof object used to perform merkle proof

| Name     | Description                                                  | Type     |
| -------- | ------------------------------------------------------------ | -------- |
| position | `left` or `right` indicating position of hash in merkle tree | `string` |
| data     | Hex string of node hash                                      | `string` |

<h4 id="response-example">Example</h4>

```json
{
  "bloom_id": 299,
  "token": "a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf",
  "signature": "0x4ee64886332a9d4fb480dfea0308264c1b56eb8293792d47696f6df2f1c36e1836deab53c46954fdcf0dc1f7ff7a6e7f6ac83039b597cc0f99192d1e8455b11b1b"
  "data": [
    {
      "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
      "stage": "mainnet",
      "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
      "target": {
        "type": "phone",
        "data": "+16195550587",
        "nonce": "c3877038-79a9-477d-8037-9826032e6af5",
        "version": "1.0.0"
      },
      "proof": [
        {
          "position": "right",
          "data": "0x662a74ce03d761ab066d0fc8306f474534fa5fdb087ad88baf067caefe1c026f"
        },
        {
          "position": "right",
          "data": "0xdb7d23746b0e8cbb81762bdce521cee4abdd4232bd63f017d136f24a751d0a5b"
        }
      ]
    },
    {
      "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
      "stage": "mainnet",
      "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
      "target": {
        "type": "email",
        "data": "test@bloom.co",
        "nonce": "b3877038-79a9-477d-8037-9826032e6af4",
        "version": "1.0.0"
      },
      "proof": [
        {
          "position": "left",
          "data": "0x2b81050468ea28d94e5db2ee6ae59e3cf03ab6f2da8c5f79c10e4d982af86844"
        }
      ]
    },
    {
      "tx": "0xe1f7b9603bd8d71927b9aabf88be14342964b4f4abc673a5e0f8dcbbd7c610e8",
      "stage": "mainnet",
      "rootHash": "0xc13405b3de1d86d0e23ee749779dc4dc90166d1f74a4e76cf1cf84f3de15902f",
      "target": {
        "type": "full-name",
        "data": "John Bloom",
        "nonce": "c3877038-79a9-477d-8037-9826032e6af5",
        "version": "1.0.0"
      },
      "proof": [
        {
          "position": "left",
          "data": "0x07b51789d6bbe5cb084c502b03168adafbbb58ad5fff2af9f612b2b9cf54c31f"
        },
        {
          "position": "right",
          "data": "0xdb7d23746b0e8cbb81762bdce521cee4abdd4232bd63f017d136f24a751d0a5b"
        }
      ]
    }
  ]
}
```

## Receive

The endpoint specified in the QR code should be configured to accept data in the format shown in [ResponseData](#responsedata).

```javascript
  const ethUtil = require('ethereumjs-util')

  export const recoverHashSigner = (hash: Buffer, sig: string): string => {
    const signature = ethUtil.toBuffer(sig)
    const sigParams = ethUtil.fromRpcSig(signature)
    const pubKey = ethUtil.ecrecover(hash, sigParams.v, sigParams.r, sigParams.s)
    const sender = ethUtil.publicToAddress(pubKey)
    return ethUtil.bufferToHex(sender)
  }

  app.post('/api/receiveData', async (req, res) => {
    try {
      if (typeof req.body.bloom_id !== 'number') {
        throw Error('Missing expected `bloom_id` of type `number` field in request.')
      }
      if (!(req.body.data instanceof Array)) {
        throw Error(
          'Missing expected `data` field of type `Array` field in request.'
        )
      }
      if (typeof req.body.token !== 'string') {
        throw Error(
          'Missing expected `token` field of type `string` field in request.'
        )
      }
      if (typeof req.body.signature !== 'string') {
        throw Error(
          'Missing expected `signature` field of type `string` field in request.'
        )
      }

      // Recover address of wallet that signed the payload
      const qrToken = (req.body.token as string).trim()
      const signature: string = req.body.signature
      const parsedData: IShareData[] = req.body.data
      const sortedData = parsedData.map(d => sortObject(d))
      const sortedDataJSON = JSON.stringify(
        sortObject({
          data: sortedData,
          token: qrToken,
        })
      )
      console.log(`sortedDataJSON = ${sortedDataJSON}`)

      const packedData: string = ethUtil.addHexPrefix(keccak256(sortedDataJSON))
      console.log(`Previously computed packedData = ${req.body.packedData}`)
      console.log(`Newly computed packedData = ${packedData}`)
      if (req.body.packedData !== packedData) {
        throw Error(
          "Previously computed packedData doesn't match the newly computed " +
            `packedData for the following data: ${sortedDataJSON}`
        )
      }

      const signerEthAddress = recoverHashSigner(
        ethUtil.toBuffer(packedData),
        signature
      )
      console.log(`signerEthAddress = '${signerEthAddress}'`)
      // Check that the recovered address matches the subject of the attestation
      // ...
      // ...

      // Validate parsedData using the embedded Merkle Proof
      // ...
      // ...

      return res.status(200).json({
        success: true,
        token: req.body.token,
      })
    } catch (error) {
      console.log(
        'Encountered an error while receiving data',
        JSON.stringify({
          error,
        })
      )
      return renderError(req, res)(
        new ClientFacingError('Encountered an error while receiving data')
      )
    }
  })
```

The recipient can perform several verifications to ensure the data and attestation are valid.

### 1. Perform Merkle Proof

Verify that the plaintext data belongs to the merkle tree with the specified rootHash.

```javascript
import {verifyProof} from @bloomprotocol/share-kit
const verified = responseData.data.every(data => {
  return verifyProof(data)
})

if (verified) {
  console.log('success')
} else {
  console.log('failed to verify merkle proof')
}
```

### 2. Recover Ethereum address from signature

Recover the Ethereum address that signed the request body.

### 3. Retrieve BloomID for recovered address

Read the BloomID for the recovered address using Bloom's Account Registry contract.

```javascript
// Web3
const accountRegistry = AccountRegistry.at('[address of registry contract]')
const BloomID = accountRegistry.accountIdForAddress.call(address)
```

### 4. Retrieve dataHash and attestation ID from attestation in specified transaction

Read the event logs from the attestation that occured in the specified transaction hash. Confirm the dataHash emitted in the attestation event matches the root hash.

### 5. Confirm attestation status

Read the attestation status from attestation repo. Confirm the attestation exists and has not been revoked. An attestation with a non-zero `completedAt` should be considered valid.

```javascript
// Web3
  const attestationRepo = AttestationRepo.at("[address of attestation repo contract]")
  const attestationId = 0 ... // increments for each attestation. Retrieve from attestation event

  const recoveredAttestation = await attestationRepo.readAttestation.call(BloomID, 0)

  const [
    attesterId,
    completedAt,
    stakeValue,
    expiresAt
  ] = recoveredAttestation;

  if (completedAt > 0)
```

# Using Share-Kit for BloomID Sign-In

Integrate the Bloom Protocol Share-Kit into your application to allow users to sign into your website simply by scanning a QR code. No passwords required! The following steps will walk you through the basic configuration steps.

### 1. Configure an endpoint to receive data

We will add functionality to this endpoint later. For now just receive the data

```typescript
export default (app: express.Application) => {
  // NOTE: This endpoint is public
  app.post('/api/receiveData', async (req, res) => {
    try {
      console.log(`Received data for request token ${req.body.token}`)
      const parsedData: IVerifiedData[] = req.body.data
      parsedData.forEach(dataToVerify => {
        console.log(`Attempting to verify ${JSON.stringify(dataToVerify)}`)
        // Perform addition verifications on the data
      })
      return res.status(200).json({
        success: true,
        token: req.body.token,
      })
    } catch (error) {
      console.log('Encountered an error while receiving data', {
        error,
      })
      return renderError(req, res)(new ClientFacingError('Encountered an error while receiving data'))
    }
  })
}
```

### 2. Embed a QR code with a link to your endpoint and the verified data you would like to receive

```typescript
const requestData = {
  action: <Action>'... action type',
  token: '... generate a unique id string for this request',
  url: 'https://Acme.app/api/receiveData',
  org_logo_url: 'https://.../logo.png',
  org_name: 'Acme',
  org_usage_policy_url: 'https://acme.co/legal/terms',
  org_privacy_policy_url: 'https://acme.co/legal/privacy',
  types: ['email'],
}

import * as React from 'react'
import {RequestQRCode, RequestData} from '@bloomprotocol/share-kit'

const MyComponent: React.SFC = props => {
  return <RequestQRCode requestData={requestData} size={200} />
}
```

### 3. Add verification to the endpoint

Perform the Merkle Proof and confirm the Merkle root matches the dataHash from the attestaion event.

```javascript
import {verifyProof} from @bloomprotocol/share-kit
const verified = responseData.data.every(data => {
  return verifyProof(data)
})

if (verified) {
  console.log('success')
} else {
  console.log('failed to verify merkle proof')
}
```

### 4. Listen for a login over a websocket connection to the server

### 5. Authorize the user to log in to the account matching the verified email
