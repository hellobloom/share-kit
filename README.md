![Share Kit](https://github.com/hellobloom/share-kit/raw/master/images/logo.png)

# Share Kit

Easily allow your users to share their verified personal information directly with your application.

- [Share Kit](#share-kit)
  - [Installation](#installation)
  - [Implementations](#implementations)
  - [Usage](#usage)
    - [RequestData](#requestdata)
    - [TAttestationTypeNames](#tattestationtypenames)
      - [TAttestationTypeNames Subtypes](#tattestationtypenames-subtypes)
      - [Appending to URL](#appending-to-url)
    - [QROptions](#qroptions)
    - [ButtonOptions](#buttonoptions)
      - [ButtonType](#buttontype)
- [Using Share Kit for BloomID Sign-In](#using-share-kit-for-bloomid-sign-in)

## Installation

```
npm install --save @bloomprotocol/share-kit
```

## Implementations

| Name                                                               | Description                                   | Status             |
| ------------------------------------------------------------------ | --------------------------------------------- | ------------------ |
| [share-kit](https://github.com/hellobloom/share-kit)               | Plain DOM implementation                      | :white_check_mark: |
| [share-kit-react](https://github.com/hellobloom/share-kit-react)   | React wrapper for renderRequestElement        | :white_check_mark: |
| [share-kit-vue](https://github.com/hellobloom/share-kit-vue)       | Vue wrapper for renderRequestElement          | :white_check_mark: |
| [bloom_share_kit](https://github.com/hellobloom/share-kit-flutter) | Flutter implementation of renderRequestButton | :white_check_mark: |

## Usage

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

<h2 id="request-types">Types</h3>

### RequestDataAuthentication

Data to be rendered into the RequestQRCode for authentication requests.

| Name                   | Description                                                                                     | Type                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| action                 | Action type                                                                                     | `Action`                                          |
| token                  | Unique string to identify this data request                                                     | `string`                                          |
| url                    | The API endpoint to POST the `ResponseData` to.<br/> See [below](#appending-to-URL) for details | `string`                                          |
| org_logo_url           | A url of the logo to display to the user when requesting data                                   | `string`                                          |
| org_name               | The name of the organization requesting data                                                    | `string`                                          |
| org_usage_policy_url   | The url of the usage policy for the organization requesting data                                | `string`                                          |
| org_privacy_policy_url | The url of the privacy policy for the organization requesting data                              | `string`                                          |

### RequestDataAttestation

Data to be rendered into the RequestQRCode for attestation sharing requests.

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

### TAttestationTypeNames

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

#### TAttestationTypeNames Subtypes

| Type           | Description                                                                                       | Platforms |
| -------------- | ------------------------------------------------------------------------------------------------- | --------- |
| 'full-name'    | Subtype of 'facebook', 'linkedin', 'sanction-screen', 'pep-screen', and 'id-document' attestation | iOS, Web  |
| 'birth-date'   | Subtype of 'sanction-screen', 'pep-screen', and 'id-document' attestations                        | iOS, Web  |
| 'gender'       | Subtype of 'id-document' attestation                                                              | Web       |
| 'supplemental' | Subtype of 'income' and 'assets' attestations                                                     | Web       |

For more information, see the [full list of attestation types](https://github.com/hellobloom/attestations-lib/blob/8192e222f66c9c9ec8a57f6e0e135f21acf4677b/src/AttestationTypes.ts#L8) that are implemented / planned to be implemented.

#### Appending to URL

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

<h3 id="request-example">Example</h3>

# Attestation data request: 

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

# Authentication/login request: 

```ts
{
  action: Action.authentication,
  token: '0xabcdee48a585fd12ba58e70e03292cac7fbac958b591baf9cbe9ac157cbadefa',
  url: 'https://receive-kit.bloom.co/api/receive',
  org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
  org_name: 'Bloom',
  org_usage_policy_url: 'https://bloom.co/legal/terms',
  org_privacy_policy_url: 'https://bloom.co/legal/privacy',
  types: [],
}
```

![Sample QR](https://github.com/hellobloom/share-kit/raw/master/images/sampleQR.png)

![Sample Button](https://github.com/hellobloom/share-kit/raw/master/images/sampleButton.png)

### QROptions

_NOTE:_ Does not apply to the rendered button

Display options for the rendered QR code.

| Name      | Description                                                                                            | Type      | Default    |
| --------- | ------------------------------------------------------------------------------------------------------ | --------- | ---------- |
| size      | The height and width of the QR code.                                                                   | `number`  | `128`      |
| bgColor   | The background color of the QR code.                                                                   | `string`  | `#fff`     |
| fgColor   | The foreground color of the QR code.                                                                   | `string`  | `#6067f1`  |
| logoImage | The `<img />` src to displayed over the QR code.                                                       | `string`  | Bloom logo |
| hideLogo  | Whether the `logoImage` should be rendered.                                                            | `boolean` | `false`    |
| padding   | Percentage of the `size` of the QR code that will be padding. This will be the same color as `bgColor` | `number`  | `0`        |

### ButtonOptions

_NOTE:_ This is only used with the rendered button and not the QR code.

Rendering options for the rendered button.

| Name              | Description                                                        | Type                 | Required | Default   |
| ----------------- | ------------------------------------------------------------------ | -------------------- | -------- | --------- |
| buttonCallbackUrl | The url the user will be sent back to after they share their data. | `string`             | Y        | N/A       |
| size              | The size of the button                                             | `'sm' | 'md' | 'lg'` | N        | 'lg'      |
| type              | The type of button, based on the given `size`                      | See below            | N        | See below |

#### ButtonType

The type of button to rendered based on it's size

| Size | Type                                                    | Required | Default  |
| ---- | ------------------------------------------------------- | -------- | -------- |
| sm   | `'square' \| 'rounded-square' \| 'circle' \| 'squircle'`   | Y        | N/A      |
| md   | `'log-in' \| 'sign-up' \| 'connect' \| 'bloom' \| 'verify'` | N        | 'verify' |
| lg   | `'log-in' \| 'sign-up' \| 'connect' \| 'bloom' \| 'verify'` | N        | 'verify' |

Example:

- Small:

  - Square

    ![small sqaure](https://github.com/hellobloom/share-kit/raw/master/images/buttons/small/square.png)

  - Rounded Square

    ![small rounded-sqaure](https://github.com/hellobloom/share-kit/raw/master/images/buttons/small/rounded-square.png)

  - Circle

    ![small circle](https://github.com/hellobloom/share-kit/raw/master/images/buttons/small/circle.png)

  - Squircle

    ![small squircle](https://github.com/hellobloom/share-kit/raw/master/images/buttons/small/squircle.png)

- Small Inverted:

  - Small buttons can have thier foreground and background colors swaped with the `invert` flag

    ![small inverted buttons](https://github.com/hellobloom/share-kit/raw/master/images/buttons/small/inverted.png)

* Medium:

  - Log In

    ![medium log-in](https://github.com/hellobloom/share-kit/raw/master/images/buttons/medium/log-in.png)

  - Sign Up

    ![medium sign-up](https://github.com/hellobloom/share-kit/raw/master/images/buttons/medium/sign-up.png)

  - Connect

    ![medium connect](https://github.com/hellobloom/share-kit/raw/master/images/buttons/medium/connect.png)

  - Bloom

    ![medium bloom](https://github.com/hellobloom/share-kit/raw/master/images/buttons/medium/bloom.png)

  - Verify

    ![medium verify](https://github.com/hellobloom/share-kit/raw/master/images/buttons/medium/verify.png)

* Large:

  - Log In

    ![large log-in](https://github.com/hellobloom/share-kit/raw/master/images/buttons/large/log-in.png)

  - Sign Up

    ![large sign-up](https://github.com/hellobloom/share-kit/raw/master/images/buttons/large/sign-up.png)

  - Connect

    ![large connect](https://github.com/hellobloom/share-kit/raw/master/images/buttons/large/connect.png)

  - Bloom

    ![large bloom](https://github.com/hellobloom/share-kit/raw/master/images/buttons/large/bloom.png)

  - Verify

    ![large verify](https://github.com/hellobloom/share-kit/raw/master/images/buttons/large/verify.png)

# Using Share Kit for BloomID Sign-In

In conjuction with this libary you will use [Verify Kit](https://github.com/hellobloom/verify-kit) to verify shared data on your server.

Complete examples are available at [Bloom Starter](https://github.com/hellobloom/bloom-starter).
