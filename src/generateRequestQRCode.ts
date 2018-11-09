import {Options, RequestData, ErrorCorrectionLevel} from './types'
import {BloomLogo} from './BloomLogo'

const QRCodeImpl = require('qr.js/lib/QRCode')

const defaultOptions: Options = {
  hideLogo: false,
  ecLevel: 'L',
  size: 128,
  bgColor: '#fff',
  fgColor: '#6067f1',
}

type CellInfo = {
  top: number
  left: number
  size: number
  fillStyle: string
}

const makeDot = (ctx: CanvasRenderingContext2D, info: CellInfo) => {
  const centerX = info.left + info.size / 2
  const centerY = info.top + info.size / 2
  const radius = (info.size / 2) * 0.85

  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
  ctx.fillStyle = info.fillStyle

  ctx.fill()
  ctx.closePath()
}

class ConnectionType {
  static readonly none = 0
  static readonly left = 1 << 0
  static readonly right = 1 << 1
  static readonly top = 1 << 2
  static readonly bottom = 1 << 4
}

const makeEyeBit = (ctx: CanvasRenderingContext2D, info: CellInfo, connectionType: number) => {
  const centerX = info.left + info.size / 2
  const centerY = info.top + info.size / 2
  const halfSize = info.size % 2 === 0 ? info.size / 2 : Math.ceil(info.size / 2)

  ctx.fillStyle = info.fillStyle

  const isLeft = (connectionType & ConnectionType.left) === ConnectionType.left
  const isRight = (connectionType & ConnectionType.right) === ConnectionType.right
  const isTop = (connectionType & ConnectionType.top) === ConnectionType.top
  const isBottom = (connectionType & ConnectionType.bottom) === ConnectionType.bottom

  if (isLeft) {
    ctx.fillRect(centerX, info.top, halfSize, info.size)
  }
  if (isRight) {
    ctx.fillRect(info.left, info.top, halfSize, info.size)
  }
  if (isTop) {
    ctx.fillRect(info.left, info.top, info.size, halfSize)
  }
  if (isBottom) {
    ctx.fillRect(info.left, centerY, info.size, halfSize)
  }
  if (((isLeft && !isRight) || (!isLeft && isRight)) && ((isTop && !isBottom) || (!isTop && isBottom))) {
    // Only add a dot to corner pieces
    makeDot(ctx, info)
  }

  ctx.fill()
}

const generateRequestQRCode = (canvas: HTMLCanvasElement, data: RequestData, options: Partial<Options>) => {
  const defaultedOptions = {...defaultOptions, ...options}

  const {ecLevel, size, bgColor, fgColor} = defaultedOptions

  const qr = new QRCodeImpl(-1, ErrorCorrectionLevel[ecLevel])
  qr.addData(JSON.stringify(data))
  qr.make()

  const ctx = canvas.getContext('2d')!

  const scale = window.devicePixelRatio || 1
  const cells: [boolean[]] = qr.modules
  const cellSize = size / cells.length
  canvas.height = canvas.width = size * scale
  canvas.style.height = canvas.style.width = `${size}px`
  ctx.scale(scale, scale)

  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, size, size)

  cells.forEach((row: boolean[], rowIndex: number) => {
    row.forEach((cell: boolean, cellIndex: number) => {
      // This is a data bit
      if (cell) {
        const isTopLeftEye = cellIndex <= 7 && rowIndex <= 7
        const isTopRightEye = cellIndex >= cells.length - 7 && rowIndex <= 7
        const isBottomLeftEye = cellIndex <= 7 && rowIndex >= row.length - 7
        const isEye = isTopLeftEye || isTopRightEye || isBottomLeftEye

        const cellInfo = {
          fillStyle: fgColor,
          left: cellIndex * cellSize,
          top: rowIndex * cellSize,
          size: cellSize,
        }

        // Round the edges of eye bits
        if (isEye) {
          let connectionType = ConnectionType.none

          if (rowIndex > 0 && cells[rowIndex - 1][cellIndex]) {
            connectionType = connectionType | ConnectionType.top
          }

          if (rowIndex < cells.length - 1 && cells[rowIndex + 1][cellIndex]) {
            connectionType = connectionType | ConnectionType.bottom
          }

          if (cellIndex > 0 && cells[rowIndex][cellIndex - 1]) {
            connectionType = connectionType | ConnectionType.right
          }

          if (cellIndex < row.length - 1 && cells[rowIndex][cellIndex + 1]) {
            connectionType = connectionType | ConnectionType.left
          }

          makeEyeBit(ctx, cellInfo, connectionType)
        } else {
          makeDot(ctx, cellInfo)
        }
      }
    })
  })

  // If hideLogo is true then don't render any logo
  // If logoImage is not set default to BloomLogo with colors matching the rest of the QR code
  // Otherwise display the provided logo
  if (!options.hideLogo) {
    const logoImage =
      options.logoImage === undefined ? BloomLogo.getLogo({fgColor: fgColor, bgColor: bgColor}) : options.logoImage

    const image = new Image()
    image.onload = () => {
      const defaultRatio = size * 0.2 + cellSize * 0.33
      const defaultWidth = defaultRatio + cellSize
      const dwidth = options.logoWidth || defaultWidth
      const dheight = options.logoHeight || dwidth
      const dx = (size - dwidth) / 2
      const dy = (size - dheight) / 2
      image.width = dwidth
      image.height = dheight
      ctx.save()
      ctx.globalAlpha = options.logoOpacity || 1
      ctx.drawImage(image, dx, dy, dwidth, dheight)
      ctx.restore()
    }
    image.src = logoImage
  }

  return canvas
}

export {generateRequestQRCode}
