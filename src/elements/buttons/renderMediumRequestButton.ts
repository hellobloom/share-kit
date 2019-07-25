import {oneLine, stripIndents} from 'common-tags'
import {renderBloomLogo} from './renderBloomLogo'
import {MediumButtonType} from '../../types'

const renderStyle = (id: string, type: MediumButtonType) => {
  const style = document.createElement('style')

  let styleText = stripIndents(oneLine)`
    #${id} {
      background-color: #6262F6;
      color: #fff;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      padding: 7px 17px;
      box-sizing: border-box;
    }

    #${id}-text-and-logo {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
    }

    #${id}-logo {
      margin-right: 4px;
      height: 16px;
    }
  `

  if (['sign-up', 'log-in', 'verify'].indexOf(type) >= 0) {
    styleText += stripIndents(oneLine)`
      #${id}-text {
        margin-top: 2px;
      }
    `
  }

  style.append(styleText)

  return style
}

const renderText = (id: string, d: string, width: string, height: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.id = `${id}-text`
  svg.setAttribute('width', width)
  svg.setAttribute('height', height)

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  text.setAttribute('d', d)
  text.setAttribute('fill', 'currentColor')
  text.setAttribute('fill-rulle', 'evenodd')

  svg.appendChild(text)

  return svg
}

/* tslint:disable:max-line-length */
const texts: {[k in MediumButtonType]: {d: string; width: string; height: string}} = {
  'log-in': {
    d:
      'M0 9.806V.436h2V8.05h3.508v1.755H0zm9.629-1.741c.789 0 1.441-.571 1.441-1.455 0-.857-.652-1.442-1.441-1.442-.775 0-1.428.585-1.428 1.442 0 .884.653 1.455 1.428 1.455zm0 1.85c-1.795 0-3.291-1.306-3.291-3.305 0-2 1.496-3.292 3.29-3.292 1.796 0 3.306 1.292 3.306 3.292 0 1.999-1.51 3.304-3.305 3.304zm9.316-3.305c0-.952-.748-1.496-1.537-1.496-.802 0-1.523.598-1.523 1.496 0 .952.72 1.55 1.523 1.55.775 0 1.537-.626 1.537-1.55zm-3.319 3.644c.218.585.966 1.02 1.605 1.02 1.442 0 1.836-.992 1.755-2.257-.3.585-1.116.925-1.904.925-1.632 0-3.17-1.292-3.17-3.292 0-2.04 1.538-3.332 3.17-3.332.788 0 1.59.34 1.904.925v-.789h1.836v5.468c0 2.733-1.333 4.052-3.59 4.052-1.402 0-2.598-.788-3.129-1.972.476-.23 1.047-.516 1.523-.748zM26.112.435h1.986v9.37h-1.986V.436zm5.848 6.011v3.36h-1.89V3.454h1.89v.925c.34-.639 1.088-1.06 1.836-1.06 1.428 0 2.326.883 2.326 2.692v3.795h-1.89V6.419c0-.843-.463-1.265-1.102-1.265-.667 0-1.17.327-1.17 1.292zm18.523-2.992l-2.23 6.352h-1.578l-1.251-4.04-1.197 4.04H42.65L40.35 3.454h2.013l1.129 3.781 1.115-3.78h1.618l1.116 3.78 1.128-3.78h2.013zm2.883 0v6.352H51.49V3.454h1.876zm-2.121-2.352c0-.626.544-1.102 1.183-1.102.64 0 1.156.476 1.156 1.102 0 .625-.517 1.115-1.156 1.115-.64 0-1.183-.49-1.183-1.115zm6.337 2.352h1.333V4.95h-1.333v4.856h-1.876V4.95H54.55V3.454h1.156V1.02h1.876v2.434zm4.38 2.992v3.36h-1.89V0h1.89v4.447c.258-.789 1.183-1.129 1.781-1.129 1.673 0 2.543 1.116 2.543 3.033v3.455h-1.89V6.419c0-.83-.598-1.265-1.17-1.265-.598 0-1.264.327-1.264 1.292zm16.061-3.4c0 .612-.313 1.388-1.278 1.755 1.237.313 1.768 1.373 1.768 2.135 0 1.55-1.129 2.87-2.992 2.87h-4.026V.436h3.754c1.686 0 2.774 1.006 2.774 2.61zm-4.529 1.088h1.564c.517 0 .87-.408.87-.965 0-.585-.298-.98-.883-.98h-1.55v1.945zm1.877 1.646h-1.877v2.271h1.918c.666 0 1.006-.598 1.006-1.156 0-.53-.34-1.115-1.047-1.115zM79.927 0h1.89v9.806h-1.89V0zm6.542 8.065c.789 0 1.441-.571 1.441-1.455 0-.857-.652-1.442-1.441-1.442-.775 0-1.428.585-1.428 1.442 0 .884.653 1.455 1.428 1.455zm0 1.85c-1.795 0-3.291-1.306-3.291-3.305 0-2 1.496-3.292 3.29-3.292 1.796 0 3.306 1.292 3.306 3.292 0 1.999-1.51 3.304-3.305 3.304zm7.575-1.85c.789 0 1.442-.571 1.442-1.455 0-.857-.653-1.442-1.442-1.442-.775 0-1.428.585-1.428 1.442 0 .884.653 1.455 1.428 1.455zm0 1.85c-1.795 0-3.291-1.306-3.291-3.305 0-2 1.496-3.292 3.291-3.292s3.305 1.292 3.305 3.292c0 1.999-1.51 3.304-3.305 3.304zm11.682-4.76c-.598 0-1.088.367-1.088 1.291v3.36h-1.89V6.378c-.014-.802-.503-1.224-1.047-1.224-.571 0-1.102.327-1.102 1.292v3.36h-1.89V3.454h1.89v.925c.3-.666.98-1.047 1.66-1.047 1.006 0 1.686.38 2.04 1.115.611-.993 1.455-1.129 1.903-1.129 1.51 0 2.448.966 2.448 2.884v3.604h-1.876V6.419c0-.83-.49-1.265-1.048-1.265z',
    width: '109',
    height: '13',
  },
  'sign-up': {
    d:
      'M0 7.072h1.992c.027.6.501 1.131 1.396 1.131.8 0 1.355-.381 1.368-.994.014-.423-.176-.79-1.124-1.063l-1.125-.314C.447 5.192.095 3.98.095 3.134.095 1.458 1.518.327 3.306.327c1.803 0 3.158 1.077 3.158 2.875H4.485c0-.627-.42-1.063-1.206-1.063-.69 0-1.206.382-1.206.94 0 .246.095.696 1.003.955l1.111.354c2.263.654 2.588 1.935 2.561 2.834-.027 1.867-1.707 2.753-3.36 2.753C1.355 9.975 0 8.762 0 7.072zm10.027-3.61v6.363h-1.87V3.46h1.87zM7.913 1.103C7.913.477 8.455 0 9.093 0c.636 0 1.151.477 1.151 1.104 0 .627-.515 1.117-1.152 1.117-.637 0-1.179-.49-1.179-1.117zm8.483 5.519c0-.954-.745-1.5-1.531-1.5-.8 0-1.518.6-1.518 1.5 0 .954.718 1.553 1.518 1.553.772 0 1.531-.627 1.531-1.553zm-3.306 3.652c.217.586.962 1.022 1.599 1.022 1.436 0 1.829-.995 1.748-2.262-.298.586-1.111.926-1.897.926-1.626 0-3.158-1.294-3.158-3.297 0-2.045 1.532-3.34 3.158-3.34.786 0 1.585.342 1.897.928v-.79h1.829v5.477c0 2.74-1.328 4.061-3.577 4.061-1.396 0-2.588-.79-3.117-1.976.474-.232 1.043-.518 1.518-.75zm8.794-3.816v3.366H20V3.46h1.884v.927c.339-.64 1.084-1.063 1.83-1.063 1.422 0 2.316.886 2.316 2.698v3.802h-1.883V6.432c0-.845-.46-1.267-1.098-1.267-.664 0-1.165.327-1.165 1.294zM34.77 8.081c.827 0 1.613-.64 1.613-1.608V.436h1.992v6.037c0 2.126-1.694 3.488-3.605 3.488-1.924 0-3.631-1.362-3.631-3.488V.436h2.019v6.037c0 .967.772 1.608 1.612 1.608zm7.385-1.417c0 .953.692 1.512 1.464 1.512.8 0 1.463-.6 1.463-1.512 0-.94-.664-1.54-1.463-1.54-.786 0-1.464.627-1.464 1.54zm-1.91-3.203h1.87v.79c.311-.585 1.07-.926 1.856-.926 1.626 0 3.063 1.294 3.063 3.298 0 2.044-1.437 3.338-3.063 3.338-.786 0-1.545-.327-1.856-.913v3.897h-1.87V3.461zm20.8 0l-2.223 6.364h-1.571l-1.247-4.047-1.192 4.047H53.24L50.95 3.46h2.005L54.08 7.25l1.111-3.788h1.612l1.112 3.788 1.124-3.788h2.006zm2.872 0v6.364h-1.87V3.46h1.87zm-2.113-2.357c0-.627.542-1.104 1.178-1.104.637 0 1.152.477 1.152 1.104 0 .627-.515 1.117-1.152 1.117-.636 0-1.178-.49-1.178-1.117zm6.314 2.357h1.328v1.5h-1.328v4.864h-1.87V4.96h-1.152V3.461h1.152V1.022h1.87v2.44zm4.363 2.998v3.366h-1.883V0h1.883v4.456c.258-.79 1.18-1.131 1.775-1.131 1.667 0 2.534 1.117 2.534 3.039v3.46h-1.883V6.433c0-.831-.596-1.267-1.165-1.267-.597 0-1.26.327-1.26 1.294zm16.003-3.407c0 .614-.311 1.39-1.273 1.758 1.233.314 1.761 1.377 1.761 2.14 0 1.553-1.124 2.875-2.98 2.875H81.98V.436h3.74c1.68 0 2.764 1.008 2.764 2.616zm-4.512 1.09h1.558c.515 0 .868-.408.868-.967 0-.586-.298-.981-.881-.981h-1.545v1.949zm1.87 1.65h-1.87v2.275h1.91c.665 0 1.003-.6 1.003-1.158 0-.532-.338-1.118-1.043-1.118zM90.382 0h1.883v9.825h-1.884V0zm6.517 8.08c.786 0 1.437-.572 1.437-1.457 0-.859-.65-1.445-1.437-1.445-.772 0-1.423.586-1.423 1.445 0 .885.65 1.458 1.423 1.458zm0 1.854c-1.788 0-3.279-1.308-3.279-3.311 0-2.004 1.49-3.298 3.28-3.298 1.788 0 3.292 1.294 3.292 3.298 0 2.003-1.504 3.311-3.293 3.311zm7.548-1.853c.786 0 1.436-.573 1.436-1.458 0-.859-.65-1.445-1.436-1.445-.773 0-1.423.586-1.423 1.445 0 .885.65 1.458 1.423 1.458zm0 1.853c-1.789 0-3.28-1.308-3.28-3.311 0-2.004 1.491-3.298 3.28-3.298 1.788 0 3.293 1.294 3.293 3.298 0 2.003-1.505 3.311-3.293 3.311zm11.64-4.77c-.597 0-1.084.368-1.084 1.295v3.366h-1.884V6.39c-.013-.804-.501-1.226-1.043-1.226-.57 0-1.098.327-1.098 1.294v3.366h-1.883V3.46h1.883v.927c.298-.668.976-1.05 1.653-1.05 1.003 0 1.68.382 2.033 1.118.61-.995 1.45-1.131 1.897-1.131 1.504 0 2.439.967 2.439 2.889v3.61h-1.87V6.433c0-.831-.488-1.267-1.043-1.267z',
    width: '119',
    height: '13',
  },
  connect: {
    d:
      'M7.027 6.813l1.6 1.121C7.815 9.18 6.39 10 4.695 10 2.02 10 0 7.825 0 5.171 0 2.49 2.021.328 4.694.328c1.668 0 3.08.794 3.893 1.998L6.973 3.447c-.502-.738-1.316-1.23-2.28-1.23-1.56 0-2.699 1.312-2.699 2.954 0 1.628 1.14 2.941 2.7 2.941.977 0 1.831-.533 2.333-1.3zm5.67 1.3c.787 0 1.439-.575 1.439-1.465 0-.861-.652-1.45-1.438-1.45-.774 0-1.425.589-1.425 1.45 0 .89.651 1.464 1.425 1.464zm0 1.86c-1.79 0-3.282-1.314-3.282-3.325 0-2.01 1.492-3.31 3.283-3.31 1.79 0 3.296 1.3 3.296 3.31 0 2.011-1.506 3.325-3.296 3.325zm6.54-3.489v3.38H17.35v-6.39h1.885v.93c.34-.642 1.086-1.066 1.832-1.066 1.424 0 2.32.89 2.32 2.709v3.816h-1.886V6.457c0-.848-.461-1.272-1.099-1.272-.665 0-1.167.328-1.167 1.3zm7.705 0v3.38h-1.886v-6.39h1.886v.93c.339-.642 1.085-1.066 1.831-1.066 1.425 0 2.32.89 2.32 2.709v3.816h-1.886V6.457c0-.848-.46-1.272-1.098-1.272-.665 0-1.167.328-1.167 1.3zm10.27 1.272l1.37.944c-.638.958-1.818 1.3-2.89 1.3-1.818 0-3.31-1.34-3.31-3.352 0-2.01 1.492-3.31 3.31-3.31 1.804 0 3.242 1.354 3.242 3.365 0 .164-.013.424-.027.588h-4.64c.095.74.896 1.067 1.56 1.067.516 0 1.072-.191 1.384-.602zm-2.917-1.655h2.74c-.095-.78-.8-1.094-1.33-1.094-.529 0-1.248.287-1.41 1.094zm5.548.547c0-2.01 1.628-3.31 3.446-3.31 1.126 0 2.143.492 2.754 1.354L44.51 5.8c-.258-.41-.733-.643-1.221-.643-.8 0-1.574.575-1.574 1.491 0 .917.773 1.533 1.574 1.533.488 0 .963-.233 1.22-.643l1.534 1.094C45.446 9.494 44.428 10 43.289 10c-1.818 0-3.446-1.34-3.446-3.352zm9.971-3.173h1.33v1.504h-1.33v4.884h-1.872V4.98h-1.153V3.475h1.153V1.026h1.872v2.449zm10.35 6.388h-2.02V5.595L54.533.438h2.361l2.252 3.53 2.28-3.53h2.36l-3.622 5.184v4.241zm7.177-1.75c.787 0 1.438-.575 1.438-1.465 0-.861-.651-1.45-1.438-1.45-.773 0-1.424.589-1.424 1.45 0 .89.65 1.464 1.424 1.464zm0 1.86c-1.79 0-3.283-1.314-3.283-3.325 0-2.01 1.492-3.31 3.283-3.31 1.79 0 3.297 1.3 3.297 3.31 0 2.011-1.506 3.325-3.297 3.325zm8.737-3.12V3.476h1.885v6.388h-1.885v-.875C75.738 9.63 75.047 10 74.436 10c-1.424 0-2.51-.89-2.51-2.709V3.475h1.886V6.88c0 1.012.692 1.272 1.126 1.272.583 0 1.14-.328 1.14-1.3zm5.507.78v2.23H79.7V3.475h1.885V5.02c.326-1.19 1.14-1.683 1.791-1.683.448 0 .787.082 1.085.232l-.339 1.71c-.34-.164-.665-.191-.963-.191-1.085 0-1.574.862-1.574 2.544zM95.49 3.064c0 .616-.312 1.396-1.275 1.765 1.235.315 1.764 1.382 1.764 2.148 0 1.56-1.126 2.886-2.985 2.886H88.98V.438h3.744c1.682 0 2.767 1.012 2.767 2.626zM90.973 4.16h1.56c.515 0 .868-.41.868-.972 0-.588-.298-.985-.882-.985h-1.546V4.16zm1.872 1.655h-1.872v2.284h1.913c.664 0 1.004-.601 1.004-1.162 0-.534-.34-1.122-1.045-1.122zM97.39 0h1.885v9.863H97.39V0zm6.525 8.112c.787 0 1.438-.574 1.438-1.464 0-.861-.651-1.45-1.438-1.45-.774 0-1.425.589-1.425 1.45 0 .89.651 1.464 1.425 1.464zm0 1.86c-1.791 0-3.283-1.313-3.283-3.324 0-2.01 1.492-3.31 3.283-3.31 1.79 0 3.296 1.3 3.296 3.31 0 2.011-1.506 3.325-3.296 3.325zm7.556-1.86c.787 0 1.438-.574 1.438-1.464 0-.861-.651-1.45-1.438-1.45-.773 0-1.424.589-1.424 1.45 0 .89.65 1.464 1.424 1.464zm0 1.86c-1.79 0-3.283-1.313-3.283-3.324 0-2.01 1.492-3.31 3.283-3.31 1.79 0 3.296 1.3 3.296 3.31 0 2.011-1.505 3.325-3.296 3.325zm11.653-4.787c-.597 0-1.085.369-1.085 1.3v3.378h-1.886V6.416c-.013-.807-.502-1.231-1.044-1.231-.57 0-1.1.328-1.1 1.3v3.378h-1.885V3.475h1.886v.93c.298-.67.976-1.053 1.655-1.053 1.004 0 1.682.383 2.035 1.121.61-.998 1.451-1.135 1.899-1.135 1.506 0 2.442.971 2.442 2.9v3.625h-1.872V6.457c0-.835-.489-1.272-1.045-1.272zM127.94.438h1.98v9.425h-1.98V.438zm6.159 1.82v5.786h1.682c1.492 0 2.238-1.327 2.238-2.873 0-1.56-.746-2.914-2.238-2.914h-1.682zm1.682 7.605h-3.663V.438h3.663C138.467.438 140 2.49 140 5.17c0 2.668-1.533 4.692-4.219 4.692z',
    width: '140',
    height: '10',
  },
  bloom: {
    d:
      'M6.5 3.073c0 .617-.31 1.399-1.272 1.77 1.232.315 1.76 1.385 1.76 2.153 0 1.564-1.124 2.894-2.98 2.894H0V.44h3.738C5.418.439 6.5 1.454 6.5 3.073zM1.99 4.17h1.558c.515 0 .867-.411.867-.974 0-.59-.298-.987-.88-.987H1.99V4.17zm1.87 1.66H1.99v2.29H3.9c.664 0 1.003-.603 1.003-1.165 0-.535-.339-1.125-1.043-1.125zM8.397 0h1.882v9.89H8.397V0zm6.514 8.134c.786 0 1.436-.576 1.436-1.467 0-.865-.65-1.454-1.436-1.454-.772 0-1.422.59-1.422 1.454 0 .891.65 1.467 1.422 1.467zm0 1.866c-1.788 0-3.277-1.317-3.277-3.333 0-2.017 1.49-3.32 3.277-3.32 1.788 0 3.291 1.303 3.291 3.32 0 2.016-1.503 3.333-3.29 3.333zm7.544-1.866c.785 0 1.435-.576 1.435-1.467 0-.865-.65-1.454-1.435-1.454-.772 0-1.422.59-1.422 1.454 0 .891.65 1.467 1.422 1.467zm0 1.866c-1.788 0-3.278-1.317-3.278-3.333 0-2.017 1.49-3.32 3.278-3.32 1.787 0 3.29 1.303 3.29 3.32 0 2.016-1.503 3.333-3.29 3.333zm11.633-4.801c-.596 0-1.083.37-1.083 1.303V9.89h-1.883V6.433c-.013-.809-.5-1.234-1.043-1.234-.568 0-1.097.33-1.097 1.303V9.89H27.1V3.484h1.882v.933c.298-.672.976-1.056 1.653-1.056 1.002 0 1.68.384 2.031 1.125.61-1.002 1.45-1.139 1.896-1.139 1.504 0 2.438.974 2.438 2.908V9.89h-1.869V6.475c0-.837-.488-1.276-1.043-1.276z',
    width: '37',
    height: '10',
  },
  verify: {
    d:
      'M.744.974h2.063l1.67 6.185L6.133.974H8.21l-2.85 9.428H3.594L.744.974zm13.005 7.32l1.37.945c-.637.958-1.818 1.3-2.89 1.3-1.82 0-3.313-1.34-3.313-3.352 0-2.012 1.493-3.312 3.312-3.312 1.806 0 3.245 1.355 3.245 3.366 0 .164-.014.424-.028.589h-4.642c.095.739.896 1.067 1.56 1.067.517 0 1.073-.192 1.386-.602zM10.83 6.64h2.742c-.095-.78-.8-1.095-1.33-1.095s-1.25.288-1.412 1.095zm7.819 1.533v2.23h-1.887v-6.39h1.887v1.546c.326-1.19 1.14-1.683 1.792-1.683.448 0 .787.082 1.086.233l-.34 1.71c-.339-.164-.665-.191-.963-.191-1.086 0-1.575.862-1.575 2.545zm5.728-4.16v6.39h-1.873v-6.39h1.873zM22.26 1.644c0-.63.543-1.108 1.18-1.108.639 0 1.155.479 1.155 1.108 0 .63-.516 1.123-1.154 1.123-.638 0-1.181-.493-1.181-1.123zM30.31.536v1.82h-.693c-.651 0-.963.465-.963 1.218v.438h1.276v1.505h-1.276v4.885h-1.9V5.517h-1.196V4.012h1.195v-.438c0-1.957 1.045-3.038 2.864-3.038h.693zm6.787 3.476l-3.91 9.524h-1.995l1.52-3.79-2.443-5.734h2.009l1.398 3.626 1.412-3.626h2.009zm13.588 0l-2.226 6.39h-1.575l-1.249-4.064-1.194 4.064h-1.575l-2.294-6.39h2.01l1.126 3.804 1.113-3.804h1.615l1.113 3.804 1.127-3.804h2.01zm2.878 0v6.39H51.69v-6.39h1.873zm-2.118-2.368c0-.63.543-1.108 1.181-1.108s1.154.479 1.154 1.108c0 .63-.516 1.123-1.154 1.123-.638 0-1.18-.493-1.18-1.123zm6.326 2.368h1.33v1.505h-1.33v4.885h-1.873V5.517h-1.154V4.012h1.154v-2.45h1.873v2.45zm4.371 3.01v3.38h-1.887V.536h1.887v4.475c.258-.794 1.181-1.136 1.778-1.136 1.67 0 2.539 1.122 2.539 3.052v3.475h-1.887V6.995c0-.835-.597-1.273-1.167-1.273-.598 0-1.263.329-1.263 1.3zm16.032-3.42c0 .615-.312 1.395-1.276 1.765 1.235.314 1.765 1.382 1.765 2.148 0 1.56-1.127 2.887-2.987 2.887h-4.018V.974h3.747c1.683 0 2.769 1.013 2.769 2.627zm-4.52 1.094h1.56c.516 0 .87-.41.87-.972 0-.588-.3-.985-.883-.985h-1.547v1.957zm1.873 1.656h-1.873v2.285h1.914c.665 0 1.004-.602 1.004-1.163 0-.534-.34-1.122-1.045-1.122zM80.074.536h1.887v9.866h-1.887V.536zm6.53 8.115c.787 0 1.439-.575 1.439-1.464 0-.863-.652-1.451-1.44-1.451-.773 0-1.425.588-1.425 1.45 0 .89.652 1.465 1.426 1.465zm0 1.86c-1.792 0-3.285-1.313-3.285-3.324 0-2.012 1.493-3.312 3.285-3.312s3.298 1.3 3.298 3.312c0 2.011-1.506 3.325-3.298 3.325zm7.56-1.86c.788 0 1.44-.575 1.44-1.464 0-.863-.652-1.451-1.44-1.451-.773 0-1.425.588-1.425 1.45 0 .89.652 1.465 1.426 1.465zm0 1.86c-1.791 0-3.284-1.313-3.284-3.324 0-2.012 1.493-3.312 3.285-3.312s3.298 1.3 3.298 3.312c0 2.011-1.506 3.325-3.298 3.325zm11.661-4.789c-.597 0-1.086.37-1.086 1.3v3.38h-1.886V6.954c-.014-.807-.503-1.232-1.046-1.232-.57 0-1.1.329-1.1 1.3v3.38h-1.886v-6.39h1.887v.93c.298-.67.977-1.053 1.656-1.053 1.004 0 1.683.383 2.036 1.122.611-1 1.453-1.136 1.9-1.136 1.507 0 2.444.972 2.444 2.901v3.626h-1.873V6.995c0-.835-.489-1.273-1.046-1.273z',
    width: '109',
    height: '14',
  },
}
/* tslint:enable:max-line-length */

const renderTextAndLogo = (id: string, type: MediumButtonType) => {
  const textAndLogo = document.createElement('span')
  textAndLogo.id = `${id}-text-and-logo`
  textAndLogo.appendChild(renderBloomLogo(id))

  const text = texts[type]

  textAndLogo.appendChild(renderText(id, text.d, text.width, text.height))

  return textAndLogo
}

const renderMediumRequestButton = (id: string, anchor: HTMLAnchorElement, type: MediumButtonType) => {
  anchor.append(renderStyle(id, type))
  anchor.append(renderTextAndLogo(id, type))
}

export {renderMediumRequestButton}
