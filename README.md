![Share Kit](https://github.com/hellobloom/share-kit/raw/master/images/logo.png)

# Share Kit

Easily allow your users to share their verified personal information directly with your application.

- [Share Kit](#share-kit)
  - [Installation](#installation)
  - [Implementations](#implementations)
  - [Request](#request)
    - [Usage](#usage)
      - [RequestData](#requestdata)
        - [Appending to URL](#appending-to-url)
      - [QROptions](#qr-options)
      - [Button Callback URl](#button-callback-url)
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

## Installation

```
npm install --save @bloomprotocol/share-kit
```

## Implementations

| Name                                                             | Description                            | Status             |
| ---------------------------------------------------------------- | -------------------------------------- | ------------------ |
| [share-kit](https://github.com/hellobloom/share-kit)             | Plain DOM implementation               | :white_check_mark: |
| [share-kit-react](https://github.com/hellobloom/share-kit-react) | React wrapper for renderRequestElement | :construction:     |

## Request

First you have to request data from the user.

### Usage

`renderRequestElement` will render a QR code or button based on the client's platform. By default it will render a button when the client is mobile or tablet and on iOS.

```typescript
import {renderRequestElement, RequestData, QROptions} from '@bloomprotocol/share-kit'

const requestData: RequestData = {...}
const qrOptions: Partial<QROptions> = {
  size: 200,
}
const callbackUrl = 'https://mysite.com/bloom-callback'
const container = document.createElement('div')

const {update, remove} = renderRequestElement({container, requestData, qrOptions, callbackUrl})

// Update the element
update({requestData: newRequestData, qrOptions: newQROptions, callbackUrl: newCallbackUrl})

// Remove the element
remove()
```

<h3 id="request-types">Types</h3>

#### RequestData

Data to be rendered into the RequestQRCode.

| Name                   | Description                                                                                     | Type                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| action                 | Action type                                                                                     | `Action`                                                                               |
| token                  | Unique string to identify this data request                                                     | `string`                                                                               |
| url                    | The API endpoint to POST the `ResponseData` to.<br/> See [below](#appending-to-URL) for details | `string`                                                                               |
| org_logo_url           | A url of the logo to display to the user when requesting data                                   | `string`                                                                               |
| org_name               | The name of the organization requesting data                                                    | `string`                                                                               |
| types                  | The type of attestions required and the amount needed                                           | [`(keyof typeof AttestationTypeID)[]`](https://github.com/hellobloom/attestations-lib) |
| org_usage_policy_url   | The url of the usage policy for the organization requesting data                                | `string`                                                                               |
| org_privacy_policy_url | The url of the privacy policy for the organization requesting data                              | `string`                                                                               |

##### Appending to URL

The user can share by tapping a button or scanning a QR code, sometimes you'll need to know the difference so the query param `share-kit-from` is appended to your url.

The param will either be `share-kit-from=qr` OR `share-kit-from=button`.

```
// Input
'https://receive-kit.bloom.co/api/receive'

// Output
'https://receive-kit.bloom.co/api/receive?share-kit-from=qr'
```

Works if your url already has a query param too!

```
// Input
'https://receive-kit.bloom.co/api/receive?my-param=',

// Output
'https://receive-kit.bloom.co/api/receive?my-param=&share-kit-from=qr',
```

<h4 id="request-example">Example</h4>

```ts
{
  action: Action.attestation,
  token: '0x8f31e48a585fd12ba58e70e03292cac712cbae39bc7eb980ec189aa88e24d043',
  url: 'https://receive-kit.bloom.co/api/receive',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: ['full-name', 'phone', 'email'],
}
```

![Sample QR](https://github.com/hellobloom/share-kit/raw/master/images/sampleQR.png)

![Sample Button](https://github.com/hellobloom/share-kit/raw/master/images/sampleButton.png)

#### QROptions

Display options for the rendered QR code.

_NOTE:_ Does not apply to the rendered button

| Name      | Description                                      | Type      | Default    |
| --------- | ------------------------------------------------ | --------- | ---------- |
| size      | The height and width of the QR code.             | `number`  | `128`      |
| bgColor   | The background color of the QR code.             | `string`  | `#fff`     |
| fgColor   | The foreground color of the QR code.             | `string`  | `#6067f1`  |
| logoImage | The `<img />` src to displayed over the QR code. | `string`  | Bloom logo |
| hideLogo  | Whether the `logoImage` should be rendered.      | `boolean` | `false`    |

#### Button Callback URL

_NOTE:_ This is only used with the rendered button and not the QR code.

The `buttonCallbackUrl` parameter will be used to send the user back to your app after they share their data.

## Response

When the user allows access you get a response back.

<h3 id="response-types">Types</h3>

#### ResponseData

This is the shape of the object that will be POSTed to the provided URL

| Name       | Description                                                             | Type           |
| ---------- | ----------------------------------------------------------------------- | -------------- |
| subject    | The Ethereum address of the user sharing their data                     | `string`       |
| token      | Unique string to identify this data request                             | `string`       |
| signature  | Signature of `packedData` by the user with their mnemonic.              | `string`       |
| data       | Array of VerifiedData objects                                           | `VerifiedData` |
| packedData | Hex string representation of the `data` property being keccak256 hashed | `string`       |

#### VerifiedData

Data associated with the attestation

| Name          | Description                                                                                          | Type                     |
| ------------- | ---------------------------------------------------------------------------------------------------- | ------------------------ |
| tx            | The Ethereum transaction corresponding to the attestation                                            | `string`                 |
| layer2Hash    | Attestation hash that lives on chain and is formed by hashing the merkle tree root hash with a nonce | `string`                 |
| rootHash      | Root hash of the data merkle tree emitted by the attestation event                                   | `string`                 |
| rootHashNonce | Nonce used to hash the `rootHash` to create the `layer2Hash`                                         | `string`                 |
| proof         | Merkle tree leaf proof needed to verify the merkle proof                                             | `IProofShare[]`          |
| stage         | The Ethereum network name on which the tx can be found                                               | `string`                 |
| target        | Data node containing the raw verified data that was requested                                        | `HashingLogic.IDataNode` |
| attester      | Ethereum address of the attester that performed the attestation                                      | `string`                 |

#### Attestation

Format of target attestation data

| Name              | Description                                                          | Type               |
| ----------------- | -------------------------------------------------------------------- | ------------------ |
| attestationNode   | Object representing the attestation data, type, and revocation links | `IAttestationNode` |
| signedAttestation | Root hash of Attestation tree signed by attester                     | `string`           |

### IAttestationNode

Format of attestation node

| Name | Description                                                                      | Type               |
| ---- | -------------------------------------------------------------------------------- | ------------------ |
| data | Object containing the data, nonce, and version of the attestation                | `IAttestationData` |
| type | Object containing he type, nonce, and optionally a provider of the attestation   | `IAttestationType` |
| aux  | String containing a hash of an `IAuxSig` object or just a padding node hash      | `string`           |
| link | Object containing the information used in the event of an attestation revocation | `IRevocationLinks` |

#### Proof

Format of proof object used to perform merkle proof

| Name     | Description                                                  | Type     |
| -------- | ------------------------------------------------------------ | -------- |
| position | `left` or `right` indicating position of hash in merkle tree | `string` |
| data     | Hex string of node hash                                      | `string` |

<h4 id="response-example">Example</h4>

```json
{
  "tx": "0xf1d6b6b64e63737a4ef023fadc57e16793cfae5d931a3c301d14e375e54fabf6",
  "layer2Hash": "0x6cca42a6266f647be85fba506fccc9925a995fee74fe08fe619c6a37cfbcb9ca",
  "rootHash": "0xfa0147ea749ba09f692162665de44b74801cfbeb16308aaf5788e87d0e1a09a1",
  "rootHashNonce": "0xa6a7d2b6d495bb12c0bb79d82bf5952ea8d5f14ceb948d5bf076b5b4c5f16517",
  "proof": [
    {"position": "right", "data": "0x31b5a691edcba21a4fda7cc9383f954f129a4c5e97fe5c038e9f4c6e93cda22e"},
    {"position": "left", "data": "0xe603ad9d223c4191398921f64d1d53b772ead5e80876ff8fdb696ae782a2db33"},
    {"position": "right", "data": "0x280ed30d54e36a0be8c709e2adc774fda8856a6868b575c2aed4b96f581ea9f5"},
    {"position": "right", "data": "0x56ccc8e4f38590f85c8196579b438058768324254d10f237f21368331a209fa7"}
  ],
  "stage": "mainnet",
  "target": {
    "attestationNode": {
      "aux": "0x480f7971777eda1e6e6804f35435f5ae163623bf1404bda8f1018600f89d757f",
      "data": {
        "data": "eddiehedges@gmail.com",
        "nonce": "5ee82099c52e30dc801131e12972fff1b8f90230dd268b04665c7385d959984b",
        "version": "2.0.0"
      },
      "link": {
        "local": "0xdb81eabcbd65153a64b8c0e843e822c9c1f64bfbe5bf2481734a73288798b1b0",
        "global": "0x97e9ad0b20ba0f0528efef244c4fe6ef11f5a6b0c7b2667064080cd6d81ca5ca",
        "dataHash": "0xfd6a015fccf1a4140a40b939fc8755841324e3b3cc09cf02d325fb378aa72cbf",
        "typeHash": "0xb98d14777c16823502b7c962bf576b00b6f9f23d12c2c8a3bc11699a2dcfe8da"
      },
      "type": {
        "type": "email",
        "nonce": "fe11a2cb674207c0120e0058de3f5c60935ffa0abbb62c22c439ffa07c409022",
        "provider": "Bloom"
      }
    },
    "signedAttestation": "0x4181089dad636fd35985e77a29c9b634bdf23254336bba6507ea0e2d75959bc71edb5c9265e91eeaf274ba1c7f992f4e802125ce02b02203e11704243f49235b1c"
  },
  "attester": "0x40b469b080c4b034091448d0e59880d823b2fc18"
}
```

## Receive

The endpoint specified in the QR code should be configured to accept data in the format shown in [ResponseData](#responsedata).

```javascript
  const shareKit = require('@bloomprotocol/share-kit')
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
      if (typeof req.body.subject !== 'string') {
        throw Error('Missing expected `subject` of type `string` field in request.')
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
      const parsedData: IVerifiedData[] = req.body.data
      const sortedData = parsedData.map(d => sortObject(d))

      // Verify off chain data integrity
      if (!sortedData.every(d => shareKit.verifyOffChainDataIntegrity(d).length === 0)) {
        throw Error('Unable to verify the layer2Hash, attester address, and merkle proof with the provided data.')
      }

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
import {verifyProof} from '@bloomprotocol/share-kit'
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

Complete examples are available at [Bloom Starter](https://github.com/hellobloom/bloom-starter).
