/* tslint:disable:max-line-length */
const renderBloomLogo = (id: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.id = `${id}-logo`
  svg.setAttribute('viewBox', '0 0 33.85 35.57')
  svg.setAttribute('width', '22px')
  svg.setAttribute('height', '22px')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute(
    'd',
    'M22.44 8.69a5.39 5.39 0 0 1-10.77 0s-.19-1 .84-3.23A13.21 13.21 0 0 1 16.98 0a14.29 14.29 0 0 1 4.68 5.46 6.56 6.56 0 0 1 .78 3.23zm0 18.2a5.39 5.39 0 0 0-10.77 0s-.19 1 .84 3.23a13.21 13.21 0 0 0 4.47 5.46 14.29 14.29 0 0 0 4.68-5.46 6.56 6.56 0 0 0 .78-3.23zm2.73-14.47a5.39 5.39 0 0 0 0 10.77s1 .19 3.23-.84a13.21 13.21 0 0 0 5.46-4.47 14.2 14.2 0 0 0-5.46-4.68 6.56 6.56 0 0 0-3.23-.78zm-16.48-.05a5.38 5.38 0 0 1 0 10.76s-1 .2-3.23-.84A13.21 13.21 0 0 1 0 17.79a14.29 14.29 0 0 1 5.46-4.68 6.61 6.61 0 0 1 3.23-.77z',
  )
  path.setAttribute('fill', 'currentColor')

  svg.appendChild(path)

  return svg
}
/* tslint:enable:max-line-length */

export {renderBloomLogo}
