![Share Kit](https://github.com/hellobloom/share-kit/raw/master/images/logo.png)

# Share Kit

Easily allow your users to share their verified personal information directly with your application.

- [Share Kit](#share-kit)
  - [Installation](#installation)
  - [Implementations](#implementations)
  - [Request](#request)
    - [Usage](#usage)
      - [RequestData](#requestdata)
      - [TAttestationTypeNames](#tattestationtypenames)
        - [TAttestationTypeNames Subtypes](#tattestationtypenames-subtypes)
        - [Appending to URL](#appending-to-url)
      - [QROptions](#qroptions)
      - [Button Callback URl](#button-callback-url)
  - [Response](#response)
      - [ResponseData](#responsedata)
      - [Verifiable Credential](#verifiable-credential)
      - [Credential Subject](#credential-subject)
      - [Authorization](#authorization)
      - [Credential Proof](#credential-proof)
      - [Verified Data](#verified-data)
      - [Batch Proof](#batch-proof)
      - [On Chain Proof](#on-chain-proof)
      - [Legacy Proof](#legacy-proof)
      - [Signed Claim Node](#signed-claim-node)
      - [Issued Claim Node](#issued-claim-node)
      - [Issuance Node](#issuance-node)
      - [Legacy Data Node](#legacy-data-node)
      - [Legacy Attestation Node](#legacy-attestation-node)
      - [Merkle Proof](#merkle-proof)
      - [Presentation Proof](#presentation-proof)
  - [Receive](#receive)
- [Using Share-Kit for BloomID Sign-In](#using-share-kit-for-bloomid-sign-in)

## Installation

```
npm install --save @bloomprotocol/share-kit
```

## Implementations

| Name                                                             | Description                            | Status             |
| ---------------------------------------------------------------- | -------------------------------------- | ------------------ |
| [share-kit](https://github.com/hellobloom/share-kit)             | Plain DOM implementation               | :white_check_mark: |
| [share-kit-react](https://github.com/hellobloom/share-kit-react) | React wrapper for renderRequestElement | :white_check_mark: |

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

| Name                   | Description                                                                                     | Type                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| action                 | Action type                                                                                     | `Action`                                          |
| token                  | Unique string to identify this data request                                                     | `string`                                          |
| url                    | The API endpoint to POST the `ResponseData` to.<br/> See [below](#appending-to-URL) for details | `string`                                          |
| org_logo_url           | A url of the logo to display to the user when requesting data                                   | `string`                                          |
| org_name               | The name of the organization requesting data                                                    | `string`                                          |
| types                  | The type of attestions required and the amount needed                                           | [`TAttestationTypeNames`](#TAttestationTypeNames) |
| org_usage_policy_url   | The url of the usage policy for the organization requesting data                                | `string`                                          |
| org_privacy_policy_url | The url of the privacy policy for the organization requesting data                              | `string`                                          |

#### TAttestationTypeNames

| Type              | Description                       | Source     | Platforms |
| ----------------- | --------------------------------- | ---------- | --------- |
| 'phone'           | SMS verification                  | Twilio     | iOS, Web  |
| 'email'           | Email verification                | Mailgun    | iOS, Web  |
| 'facebook'        | Facebook verification             | Facebook   | iOS, Web  |
| 'google'          | Google verification               | Google     | iOS, Web  |
| 'linkedin'        | LinkedIn verification             | LinkedIn   | iOS, Web  |
| 'twitter'         | Twitter verification              | Twitter    | iOS, Web  |
| 'id-document'     | Identity document verification    | Acuant     | Web       |
| 'sanction-screen' | Sanction person screening         | BlockScore | iOS, Web  |
| 'pep-screen'      | Politically exposed person screen | KYC2020    | iOS, Web  |
| 'income'          | Income verification               | Quovo      | Web       |
| 'assets'          | Assets verification               | Quovo      | Web       |

##### TAttestationTypeNames Subtypes

| Type           | Description                                                                                       | Platforms |
| -------------- | ------------------------------------------------------------------------------------------------- | --------- |
| 'full-name'    | Subtype of 'facebook', 'linkedin', 'sanction-screen', 'pep-screen', and 'id-document' attestation | iOS, Web  |
| 'birth-date'   | Subtype of 'sanction-screen', 'pep-screen', and 'id-document' attestations                        | iOS, Web  |
| 'gender'       | Subtype of 'id-document' attestation                                                              | Web       |
| 'supplemental' | Subtype of 'income' and 'assets' attestations                                                     | Web       |

For more information, see the [full list of attestation types](https://github.com/hellobloom/attestations-lib/blob/8192e222f66c9c9ec8a57f6e0e135f21acf4677b/src/AttestationTypes.ts#L8) that are implemented / planned to be implemented.

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

| Name      | Description                                                                                            | Type      | Default    |
| --------- | ------------------------------------------------------------------------------------------------------ | --------- | ---------- |
| size      | The height and width of the QR code.                                                                   | `number`  | `128`      |
| bgColor   | The background color of the QR code.                                                                   | `string`  | `#fff`     |
| fgColor   | The foreground color of the QR code.                                                                   | `string`  | `#6067f1`  |
| logoImage | The `<img />` src to displayed over the QR code.                                                       | `string`  | Bloom logo |
| hideLogo  | Whether the `logoImage` should be rendered.                                                            | `boolean` | `false`    |
| padding   | Percentage of the `size` of the QR code that will be padding. This will be the same color as `bgColor` | `number`  | `0`        |

#### Button Callback URL

_NOTE:_ This is only used with the rendered button and not the QR code.

The `buttonCallbackUrl` parameter will be used to send the user back to your app after they share their data.

## Response

When the user allows access you get a response back.

<h3 id="response-types">Types</h3>

#### ResponseData

The payload is formatted as specified by Bloom's interpretation of the [W3C Verifiable Presentation Data Model](https://w3c.github.io/vc-data-model/#presentations-0).

Format of the HTTP POST request

| Name                 | Description                                                                    | Type                       |
| -------------------- | ------------------------------------------------------------------------------ | -------------------------- |
| context              | URLs linking to machine readable documents describing how to interpet the data | \`string[]\`               |
| type                 | Standard type string specifying the document ('VerifiablePresentation')        | \`string\`                 |
| verifiableCredential | Array of credentials being presented in this document                          | \`VerifiableCredential[]\` |
| proof                | Presentation proof showing the sender's authority over the shared data         | \`PresentationProof\`      |
| packedData           | Hex string representation of the hashed proof                                  | \`string\`                 |
| signature            | Signature of \`packedData\` by the user with their mnemonic.                   | \`string\`                 |
| token                | Unique string to identify this data request                                    | \`string\`                 |

#### Verifiable Credential

Format of a users verified credential

| Name              | Description                                                            | Type                  |
| ----------------- | ---------------------------------------------------------------------- | --------------------- |
| id                | Identifier for this credential                                         | \`string\`            |
| type              | Type name of the credential                                            | \`string\`            |
| issuer            | Identifier of the entity that issued the credential                    | \`string\`            |
| issuanceDate      | RFC3339 Datetime of when the credential was issued                     | \`string\`            |
| credentialSubject | Information about the subject of the credential and the verified data  | \`CredentialSubject\` |
| proof             | Credential proof showing the issuer signed the credential being shared | \`CredentialProof\`   |

#### Credential Subject

Information identifying the subject and data of the credential

| Name          | Description                                                                                                  | Type                |
| ------------- | ------------------------------------------------------------------------------------------------------------ | ------------------- |
| subject       | Identifier of original subject of the attestation (Eth Address/ DID)                                         | \`string\`          |
| data          | Stringified data containing what was verified and approved for sharing                                       | \`string\`          |
| authorization | Optional array of signatures showing chain of custody between original credential subject and current holder | \`Authorization[]\` |

#### Authorization

Optional array of signatures showing chain of custody between original credential subject and current holder

| Name       | Description                                                      | Type       |
| ---------- | ---------------------------------------------------------------- | ---------- |
| subject    | Address of keypair granting authorization                        | \`string\` |
| recipient  | Address of keypair receiving authorization                       | \`string\` |
| revocation | Hex string to identify this authorization in event of revocation | \`string\` |
| signature  | Hash of subject, recipient, revocation signed by subject pk      | \`string\` |

#### Credential Proof

Information identifying the subject and data of the credential

| Name    | Description                                                                    | Type             |
| ------- | ------------------------------------------------------------------------------ | ---------------- |
| type    | Identifier of this proof type                                                  | \`string\`       |
| created | RFC3339 Datetime of when this proof was created. Usually same as issuance date | \`string\`       |
| creator | Identifier of attester. Eth address or DID                                     | \`string\`       |
| data    | Proof object containing all data necessary to validate original attestation    | \`VerifiedData\` |

#### Verified Data

Proof defined by the [Selective Disclosure Merkle Tree Spec](https://github.com/hellobloom/specs/blob/master/attestation-data/Bloom-Merkle-Tree-22facf0b-bedb-4b45-bb7d-edcd57213eb0.md)

There are three types of Verified Data proofs in the spec

| Name           | Description                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| Batch Proof    | Proof structure which enables submitting batches of attestations at the same time in a single transaction |
| On Chain Proof | Proof structure intended for use with the AttestationLogic smart contract                                 |
| Legacy Proof   | Legacy proof structure similar to On Chain proof. Used with Attestation Logic smart contract              |

This [linked diagram](https://github.com/hellobloom/specs/blob/master/attestation-data/Combined_Merkle_Tree.png) shows how the proof data structures are formed



#### Batch Proof

| Name             | Description                                                      | Type                |
| ---------------- | ---------------------------------------------------------------- | ------------------- |
| version          | Identifier of this proof type                                    | \`string\`          |
| batchLayer2Hash  | Attestation hash formed by hashing subject sig with attester sig | \`string\`          |
| batchAttesterSig | Attester's signature of layer2Hash and subject address           | \`string\`          |
| subjectSig       | Subject signature of attestation agreement                       | \`string\`          |
| requestNonce     | Nonce used in subjectSig                                         | \`string\`          |
| layer2Hash       | Hash of rootHash and rootHashNonce                               | \`string\`          |
| rootHash         | Merkle tree root hash                                            | \`string\`          |
| rootHashNonce    | Nonce used with rootHash to create layer2Hash                    | \`string\`          |
| proof            | Array of merkle proof objects                                    | \`MerkleProof\`     |
| stage            | mainnet, rinkeby, local, etc                                     | \`string\`          |
| target           | Node of the merkle tree being shared                             | \`SignedClaimNode\` |
| attester         | Attester Eth address                                             | \`string\`          |
| subject          | Subject Eth address                                              | \`string\`          |

#### On Chain Proof

| Name          | Description                                           | Type                |
| ------------- | ----------------------------------------------------- | ------------------- |
| version       | Identifier of this proof type                         | \`string\`          |
| tx            | Ethereum transaction which refrences this attestation | \`string\`          |
| layer2Hash    | Hash of rootHash and rootHashNonce                    | \`string\`          |
| rootHash      | Merkle tree root hash                                 | \`string\`          |
| rootHashNonce | Nonce used with rootHash to create layer2Hash         | \`string\`          |
| proof         | Array of merkle proof objects                         | \`MerkleProof\`     |
| stage         | mainnet, rinkeby, local, etc                          | \`string\`          |
| target        | Node of the merkle tree being shared                  | \`SignedClaimNode\` |
| attester      | Attester Eth address                                  | \`string\`          |

#### Legacy Proof

| Name          | Description                                           | Type               |
| ------------- | ----------------------------------------------------- | ------------------ |
| version       | Identifier of this proof type                         | \`string\`         |
| tx            | Ethereum transaction which refrences this attestation | \`string\`         |
| layer2Hash    | Hash of rootHash and rootHashNonce                    | \`string\`         |
| rootHash      | Merkle tree root hash                                 | \`string\`         |
| rootHashNonce | Nonce used with rootHash to create layer2Hash         | \`string\`         |
| proof         | Array of merkle proof objects                         | \`MerkleProof\`    |
| stage         | mainnet, rinkeby, local, etc                          | \`string\`         |
| target        | Node of the merkle tree being shared                  | \`LegacyDataNode\` |
| attester      | Attester Eth address                                  | \`string\`         |

#### Signed Claim Node

Format of target attestation data

| Name        | Description                                                          | Type                |
| ----------- | -------------------------------------------------------------------- | ------------------- |
| claimNode   | Object representing the attestation data, type, and revocation links | \`IssuedClaimNode\` |
| attester    | Attester Eth address                                                 | \`string\`          |
| attesterSig | Root hash of claim node tree signed by attester                      | \`string\`          |

#### Issued Claim Node

Format of attestation node

| Name     | Description                                                                    | Type                |
| -------- | ------------------------------------------------------------------------------ | ------------------- |
| data     | Object containing the data, nonce, and version of the attestation              | \`AttestationData\` |
| type     | Object containing he type, nonce, and optionally a provider of the attestation | \`AttestationType\` |
| aux      | String containing a hash of an \`IAuxSig\` object or just a padding node hash  | \`string\`          |
| issuance | Object containing issuance and revocation metadata                             | \`IssuanceNode\`    |

#### Issuance Node

| Name                  | Description                                                                           | Type       |
| --------------------- | ------------------------------------------------------------------------------------- | ---------- |
| localRevocationToken  | Hex string to be used in public revocation registry to revoke this data node          | \`string\` |
| globalRevocationToken | Hex string to be used in public revocation registry to revoke this entire attestation | \`string\` |
| dataHash              | Hash of claim tree                                                                    | \`string\` |
| typeHash              | Hash of type object                                                                   | \`string\` |
| issuanceDate          | RFC3339 datetime of when this claim was issued                                        | \`string\` |
| expirationDate        | RFC3339 datetime of when this claim should be considered expired                      | \`string\` |

#### Legacy Data Node

Format of legacy attestation data

| Name              | Description                                                          | Type                      |
| ----------------- | -------------------------------------------------------------------- | ------------------------- |
| attestationNode   | Object representing the attestation data, type, and revocation links | \`LegacyAttestationNode\` |
| signedAttestation | Root hash of attestation tree signed by attester                     | \`string\`                |

#### Legacy Attestation Node

| Name | Description                                                                      | Type                |
| ---- | -------------------------------------------------------------------------------- | ------------------- |
| data | Object containing the data, nonce, and version of the attestation                | \`AttestationData\` |
| type | Object containing he type, nonce, and optionally a provider of the attestation   | \`AttestationType\` |
| aux  | String containing a hash of an \`IAuxSig\` object or just a padding node hash    | \`string\`          |
| link | Object containing the information used in the event of an attestation revocation | \`RevocationLinks\` |

#### Merkle Proof

Format of proof object used to perform merkle proof

| Name     | Description                                                      | Type       |
| -------- | ---------------------------------------------------------------- | ---------- |
| position | \`left\` or \`right\` indicating position of hash in merkle tree | \`string\` |
| data     | Hex string of node hash                                          | \`string\` |


#### Presentation Proof

Format of a users verified data

| Name           | Description                                                     | Type       |
| -------------- | --------------------------------------------------------------- | ---------- |
| type           | Identifier of this type of presentation proof                   | \`string\` |
| created        | RFC3339 datetime of when this proof was generated and signed    | \`string\` |
| creator        | Identifier of holder sharing the credential. Eth address or DID | \`string\` |
| nonce          | Token used to make this request unique                          | \`string\` |
| domain         | Website of recipient where user intends to share the data       | \`string\` |
| credentialHash | Hash of array of layer2Hashes being shared                      | \`string\` |
`


<h4 id="response-example">Example</h4>

```json
{
  "signature": "0x1b6dfeb3608e5793bf7cfdbeedbb84bd06bc769f9c4450e1253e424b69bc451679007ddcab8a85bf6562c8551e99a3a07159c1dcbe1dd866e889e524846241e71c",
  "type": "VerifiablePresentation",
  "token": "78c7f905-6091-4c7f-a63f-f8590242502f",
  "verifiableCredential": [
    {
      "credentialSubject": {
        "subject": "0x1cc73a01dab0d88060d86033d21c9068e601b84c",
        "data": "ipatka@gmail.com",
        "authorization": []
      },
      "id": "placeholder",
      "proof": {
        "created": "2019-05-15T01:38:02.502Z",
        "data": {
          "subject": "0x1cc73a01dab0d88060d86033d21c9068e601b84c",
          "version": "batch",
          "batchAttesterSig": "0xffcf3b824f4beffa50c250308f54f6367444d86af8196ca452c71a7eefceec473baf33b4d87279ea527222eb7b055fc7b9c93846d78593fbaa2852009e92e1351c",
          "rootHashNonce": "0xd19abeca6dd0e7daa486d9e596d9dca96728c568751918dc99e1aaca3ab445be",
          "layer2Hash": "0x36e952d746dbaa6c8b3e2451145198de8945094db39f52a4c9497d61241dea16",
          "rootHash": "0x2223208a5a1927fed62f95c1be879b1831b556300a87ba41fa931f0968ad7f23",
          "stage": "mainnet",
          "proof": [
            {
              "position": "left",
              "data": "0x7079ce5b946f0fbc0b160c8aee7a7db02c92f5f6a9cb42408cd60adc72a17823"
            },
            {
              "position": "left",
              "data": "0x8fc45a1e10df267e5e127286b9913fdb22fe27cd99196491f9aa9af80f5ca342"
            },
            {
              "position": "right",
              "data": "0x3e2466500850683f4c32605fb9fca000e44c463fc4b9557cbfba0ce54589d8a7"
            },
            {
              "position": "left",
              "data": "0xa2920d7b3306ae8397715ff574ce183a7678a5ffa58648ab088766a279c310d5"
            }
          ],
          "requestNonce": "0xc995c3badcbb87a59bade5559e43630a07fb793c2ae4808fbc81263360008607",
          "target": {
            "claimNode": {
              "data": {
                "nonce": "a92c0e08bd7ade12c92424c7d4861236c26b831c1423f3ab54e4bb5b51df6679",
                "data": "ipatka@gmail.com",
                "version": "2.0.0"
              },
              "issuance": {
                "typeHash": "0x2b8f752a33ec25cd6aef2cb067477b64a4fe727238f4a31807ff4c2ec45c6a0b",
                "expirationDate": "2024-05-15T01:38:02.502Z",
                "dataHash": "0xecde0370b2a4cacefbbc13c0a63d451857be256ca69150bb960b48822522c8d6",
                "localRevocationToken": "0xe84ab3e2c99464702260749716d65b9b184c8ddf14d1db0f3a7a111164d1f2b2",
                "issuanceDate": "2019-05-15T01:38:02.502Z",
                "globalRevocationToken": "0xddd4dd3dd27861da7627fa4d48916fb4a681498ff6914ddfa815c5d6eba2fab1"
              },
              "aux": "0x2d42ba0a6212914179d480f3b4c35238da98f9af75b117986d58252c21388fc8",
              "type": {
                "type": "email",
                "nonce": "ebb6668e467df4f591647dd5b5b7c7dc1b7ca06f6f52f705ea4e1fb5c784e00b",
                "provider": "Bloom"
              }
            },
            "attesterSig": "0xad9ba60d018bbc1a9b2ad69f9f415779394b69e89284348f681a7d181ec95bd05230b793ca1286f6d960fec9a117d8d6860e87df8054c1baf4d76f589baf95661b",
            "attester": "0x156ba3f2af07d24cfd5dd8ec0fe2b17c6131d7fb"
          },
          "subjectSig": "0x3c142cf48a169616cc3c1665df1721f1fee3d4f96f9936e82ee39f01946b082461ccfe71e86912deb3c9343ae60ddda59b1b5f5a2a889109a507422ca036a3931b",
          "attester": "0x156ba3f2af07d24cfd5dd8ec0fe2b17c6131d7fb",
          "batchLayer2Hash": "0x01f575b3beb4ac1706494c756fb19632a2fa494bd6c171522132ba4f3b48770f"
        },
        "type": "Bloom-Batch-Proof-1.0.0",
        "creator": "0x156ba3f2af07d24cfd5dd8ec0fe2b17c6131d7fb"
      },
      "type": "email",
      "issuer": "0x156ba3f2af07d24cfd5dd8ec0fe2b17c6131d7fb",
      "issuanceDate": "2019-05-15T01:38:02.502Z"
    }
  ],
  "packedData": "0xae69844748a07e06d259aa697a3e1867bd84749a53bded6d4a4cf9cc7b97bbab",
  "context": ["placeholder"],
  "proof": {
    "credentialHash": "0x0d0f48792f41e35fd83f70c2ac5694eaf08291cdd7530a331715db34a688409e",
    "created": "2019-05-15T23:53:36.808Z",
    "nonce": "78c7f905-6091-4c7f-a63f-f8590242502f",
    "type": "Bloom-Presentation-1.0.0",
    "creator": "0x1cc73a01dab0d88060d86033d21c9068e601b84c",
    "domain": "placeholder"
  }
}

```

## Receive

The endpoint specified in the QR code should be configured to accept data in the format shown in [ResponseData](#responsedata).

```typescript
  import { validateUntypedResponseData } from '@bloomprotocol/share-kit'

  app.post('/scan', async (req, res) => {
    try {
      const verifiedData = await validateUntypedResponseData(req.body, {
        validateOnChain: env.validateOnChain,
        web3Provider: env.web3Provider
      })
      if (verifiedData.kind === 'invalid') {
        res.status(400).json({
          success: false,
          message: 'Shared data is not valid',
          verifiedData
        })
        return
      }
      const consumableData = verifiedData.data.verifiableCredential.map(
        v => v.credentialSubject.data
      )

      res.status(200).json({ success: true, message: 'Data Received' })
    } catch (err) {
        res.status(400).json({
          success: false,
          message: 'Something went wrong'
        })
    }
  })

```

# Using Share-Kit for BloomID Sign-In

Complete examples are available at [Bloom Starter](https://github.com/hellobloom/bloom-starter).
