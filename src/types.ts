type RequestData = {}

type Options = {
  size?: number
  bgColor?: string
  fgColor?: string
  renderAs?: 'svg' | 'canvas'
}

type OptionsWithContainer = Options & {
  container?: HTMLElement
}

export {RequestData, Options, OptionsWithContainer}
