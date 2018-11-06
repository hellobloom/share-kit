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
