import {Options, RequestData, ErrorCorrectionLevel} from './types'
import {BloomLogo} from './BloomLogo'

const QRCodeImpl = require('qr.js/lib/QRCode')

const defaultOptions: Options = {
  hideLogo: false,
  ecLevel: 'L',
  size: 128,
  bgColor: '#fff',
  fgColor: '#6067f1',
  padding: 0,
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

  ctx.save()
  ctx.beginPath()

  ctx.fillStyle = info.fillStyle

  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
  ctx.fill()

  ctx.closePath()
  ctx.restore()
}

const makeRect = (
  ctx: CanvasRenderingContext2D,
  fillStyle: string,
  rect: {x: number; y: number; w: number; h: number}
) => {
  ctx.save()
  ctx.beginPath()

  ctx.fillStyle = fillStyle
  ctx.strokeStyle = fillStyle
  ctx.lineWidth = 0.5
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  ctx.rect(rect.x, rect.y, rect.w, rect.h)
  ctx.fill()
  ctx.stroke()

  ctx.closePath()
  ctx.restore()
}

const makeCorner = (ctx: CanvasRenderingContext2D, info: CellInfo) => {
  const centerX = info.left + info.size / 2
  const centerY = info.top + info.size / 2
  const radius = info.size / 2

  ctx.save()
  ctx.beginPath()

  ctx.fillStyle = info.fillStyle
  ctx.strokeStyle = info.fillStyle
  ctx.lineWidth = 0.5

  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
  ctx.fill()
  ctx.stroke()

  ctx.closePath()
  ctx.restore()
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
  const halfSize = info.size / 2

  const isLeft = (connectionType & ConnectionType.left) === ConnectionType.left
  const isRight = (connectionType & ConnectionType.right) === ConnectionType.right
  const isTop = (connectionType & ConnectionType.top) === ConnectionType.top
  const isBottom = (connectionType & ConnectionType.bottom) === ConnectionType.bottom

  if (isLeft) {
    makeRect(ctx, info.fillStyle, {x: centerX, y: info.top, w: halfSize, h: info.size})
  }

  if (isRight) {
    makeRect(ctx, info.fillStyle, {x: info.left, y: info.top, w: halfSize, h: info.size})
  }

  if (isTop) {
    makeRect(ctx, info.fillStyle, {x: info.left, y: info.top, w: info.size, h: halfSize})
  }

  if (isBottom) {
    makeRect(ctx, info.fillStyle, {x: info.left, y: centerY, w: info.size, h: halfSize})
  }

  if (isLeft !== isRight && isTop !== isBottom) {
    makeCorner(ctx, info)
  }
}

const generateRequestQRCode = (canvas: HTMLCanvasElement, data: RequestData, options: Partial<Options>) => {
  const defaultedOptions = {...defaultOptions, ...options}

  const {ecLevel, size, bgColor, fgColor, padding} = defaultedOptions

  const qr = new QRCodeImpl(-1, ErrorCorrectionLevel[ecLevel])
  qr.addData(JSON.stringify(data))
  qr.make()

  const ctx = canvas.getContext('2d')!

  const scale = window.devicePixelRatio || 1
  const cells: [boolean[]] = qr.modules
  const cellSize = size / cells.length
  canvas.height = canvas.width = size * scale
  canvas.style.height = canvas.style.width = `${size}px`
  canvas.style.padding = (100 * padding) / size + '%'
  ctx.scale(scale, scale)

  makeRect(ctx, bgColor, {x: 0, y: 0, w: size, h: size})

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
      const numberOfCellsToCover = Math.floor(cells.length * 0.2)
      const addExtra = numberOfCellsToCover % 2 === 0
      const defaultWidth = numberOfCellsToCover * cellSize + (addExtra ? cellSize : 0)
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
