import {Options, RequestData} from '../types'

const renderRequestButton = (container: HTMLElement, data: RequestData, options: Partial<Options>) => {
  const anchor = document.createElement('a')

  anchor.href = `bloom://share?request=${window.btoa(JSON.stringify(data))}`
  anchor.target = '_blank'
  anchor.rel = 'norefferer noopener'
  anchor.append('Tap to share!')

  container.append(anchor)
}

export {renderRequestButton}
