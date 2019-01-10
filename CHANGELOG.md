## Unreleased

**New Features**:

- `renderRequestElement`: Renderer that dynamically renders a "Tap To Share" button or QR code based on the client's user agent.
  - On mobile it will render a button that opens the Bloom app
  - On desktop it will render a QR code that the user will scan with the Bloom app

**Upcoming Release**:

- The 3.0.0 release will be here soon here are the proposed changes. We are open to feedback!

- `share-kit` 3.0.0 will be 100% react free, and instead we will provide a `share-kit-react` library that has a React component for `renderRequestElement`

  **BREAKING**

  - `generateRequestQRCOde`, `manageRequestQRCode`, and `RequestQRCode` will be removed
    - Replacements:
      - `generateRequestQRCOde` => `renderRequestElement`
      - `manageRequestQRCode` => `renderRequestElement`
      - `RequestQRCode` => `RequestElement` (from share-kit-react coming soon!!)

**Notes**

- `share-kit-react` will

## 2.2.0

**Improvements**:

- Improve "eye" rendering

## 2.1.1 (HOTFIX)

**Improvements**:

- Fix default width calculation of logo image

## 2.1.0

**New Features**:

- Implement a QR code with circles and rounded "eyes" instead of squares
- Add `generateRequestQRCode`
  - This takes a `canvas` element as well as the request data and options for the QR code.

**Improvements**:

- Change the default EC level of the QR code to `L`
- Change image URLs in README so they show up on npm
- Make it so the logo doesn't half-cover any data bits
- Change the logo background from a rounded rectangle to a regular rectangle

**Deprecations**:

- `createRequestQRCode`, `updateRequestQRCode`, and `removeRequestQRCode`
  - If using React use `RequestQRCode`, otherwise use `generateRequestQRCode`

## 2.0.3

**Bug fixes**:

- Fix npm package
  - Use package.json#files to include only the files we need in the package

## 2.0.2

**Bug fixes**:

- Fix npm package including the `.git` directory
  - Now using `yarn publish` with yarn 1.12.1 since it supports 2fa

## 2.0.1

**Bug fixes**:

- Fix rendering issue in Firefox

## 2.0.0

**BREAKING**:

- Removed the `renderAs` prop, the QR will always render with canvas now

**New Features**:

- Add a image overlay to the QR code, can be turned off with the `hideLogo` prop

## 1.1.1

**Bug fixes**:

- Fix types

## 1.1.0

**New Features**:

- Add verification utils

## 1.0.0

- Initial release
