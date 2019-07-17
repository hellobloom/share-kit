import {oneLine, stripIndents} from 'common-tags'

import {renderBloomLogo} from './renderBloomLogo'
import {LargeButtonType} from './../../types'

const backgroundPattern = `
  <svg width="281" height="48"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <rect id="a" width="335" height="48" rx="4"/>
      <path d="M0 0h281c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="c"/>
      <linearGradient x1="83.3806005%" y1="6.01770792%" x2="130.86599%" y2="100%" id="d">
        <stop stop-color="#7A7CF3" offset="0%"/>
        <stop stop-color="#6262F6" offset="100%"/>
      </linearGradient>
      <path d="M0 0h281c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="f"/>
      <path d="M0 0h281c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="h"/>
      <path d="M0 0h281c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="j"/>
      <path d="M0 0h281c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="l"/>
      <path d="M0 0h281c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="n"/>
      <path d="M0 0h281c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="p"/>
      <path d="M0 0h281c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="r"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="t"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="v"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="x"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="z"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="B"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="D"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="F"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="H"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="J"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="L"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="N"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="P"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="R"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="T"/>
      <path d="M0 0h226c13.254834 0 24 10.745166 24 24s-10.745166 24-24 24H0V0z" id="V"/>
      <path d="M0 0h144.64C153.123094 0 160 10.745166 160 24s-6.876906 24-15.36 24H0V0z" id="X"/>
    </defs>
    <g transform="translate(-41)" fill="none" fill-rule="evenodd">
      <mask id="b" fill="#fff">
        <use xlink:href="#a"/>
      </mask>
      <g mask="url(#b)">
        <g transform="translate(41)">
          <mask id="e" fill="#fff">
            <use xlink:href="#c"/>
          </mask>
          <circle stroke="url(#d)" stroke-width="2" mask="url(#e)" cx="-3" cy="24" r="25"/>
        </g>
        <g transform="translate(41)">
          <mask id="g" fill="#fff">
            <use xlink:href="#f"/>
          </mask>
          <circle stroke="url(#d)" stroke-width="2" mask="url(#g)" cx="1" cy="24" r="27"/>
        </g>
        <g transform="translate(41)">
          <mask id="i" fill="#fff">
            <use xlink:href="#h"/>
          </mask>
          <circle stroke="url(#d)" stroke-width="2" mask="url(#i)" cx="5" cy="24" r="29"/>
        </g>
        <g transform="translate(41)">
          <mask id="k" fill="#fff">
            <use xlink:href="#j"/>
          </mask>
          <circle stroke="url(#d)" stroke-width="2" opacity=".8" mask="url(#k)" cx="9" cy="24" r="31"/>
        </g>
        <g transform="translate(41)">
          <mask id="m" fill="#fff">
            <use xlink:href="#l"/>
          </mask>
          <circle stroke="url(#d)" stroke-width="2" opacity=".8" mask="url(#m)" cx="13" cy="24" r="33"/>
        </g>
        <g transform="translate(41)">
          <mask id="o" fill="#fff">
            <use xlink:href="#n"/>
          </mask>
          <circle stroke="url(#d)" stroke-width="2" opacity=".7" mask="url(#o)" cx="18" cy="24" r="34"/>
        </g>
        <g transform="translate(41)">
          <mask id="q" fill="#fff">
            <use xlink:href="#p"/>
          </mask>
          <circle stroke="url(#d)" stroke-width="2" opacity=".7" mask="url(#q)" cx="23" cy="24" r="35"/>
        </g>
        <g transform="translate(41)">
          <mask id="s" fill="#fff">
            <use xlink:href="#r"/>
          </mask>
          <g mask="url(#s)">
            <g transform="translate(55)">
              <mask id="u" fill="#fff">
                <use xlink:href="#t"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".6" mask="url(#u)" cx="-27" cy="24" r="36"/>
            </g>
            <g transform="translate(55)">
              <mask id="w" fill="#fff">
                <use xlink:href="#v"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".6" mask="url(#w)" cx="-22" cy="24" r="37"/>
            </g>
            <g transform="translate(55)">
              <mask id="y" fill="#fff">
                <use xlink:href="#x"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".6" mask="url(#y)" cx="-17" cy="24" r="38"/>
            </g>
            <g transform="translate(55)">
              <mask id="A" fill="#fff">
                <use xlink:href="#z"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".55" mask="url(#A)" cx="-12" cy="24" r="39"/>
            </g>
            <g transform="translate(55)">
              <mask id="C" fill="#fff">
                <use xlink:href="#B"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".55" mask="url(#C)" cx="-7" cy="24" r="40"/>
            </g>
            <g transform="translate(55)">
              <mask id="E" fill="#fff">
                <use xlink:href="#D"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".55" mask="url(#E)" cx="-2" cy="24" r="41"/>
            </g>
            <g transform="translate(55)">
              <mask id="G" fill="#fff">
                <use xlink:href="#F"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".55" mask="url(#G)" cx="3" cy="24" r="42"/>
            </g>
            <g transform="translate(55)">
              <mask id="I" fill="#fff">
                <use xlink:href="#H"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".55" mask="url(#I)" cx="8" cy="24" r="43"/>
            </g>
            <g transform="translate(55)">
              <mask id="K" fill="#fff">
                <use xlink:href="#J"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".5" mask="url(#K)" cx="13" cy="24" r="44"/>
            </g>
            <g transform="translate(55)">
              <mask id="M" fill="#fff">
                <use xlink:href="#L"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".5" mask="url(#M)" cx="18" cy="24" r="45"/>
            </g>
            <g transform="translate(55)">
              <mask id="O" fill="#fff">
                <use xlink:href="#N"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".5" mask="url(#O)" cx="23" cy="24" r="46"/>
            </g>
            <g transform="translate(55)">
              <mask id="Q" fill="#fff">
                <use xlink:href="#P"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".5" mask="url(#Q)" cx="28" cy="24" r="47"/>
            </g>
            <g transform="translate(55)">
              <mask id="S" fill="#fff">
                <use xlink:href="#R"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".5" mask="url(#S)" cx="33" cy="24" r="48"/>
            </g>
            <g transform="translate(55)">
              <mask id="U" fill="#fff">
                <use xlink:href="#T"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".45" mask="url(#U)" cx="38" cy="24" r="49"/>
            </g>
            <g transform="translate(55)">
              <mask id="W" fill="#fff">
                <use xlink:href="#V"/>
              </mask>
              <circle stroke="url(#d)" stroke-width="2" opacity=".45" mask="url(#W)" cx="43" cy="24" r="50"/>
            </g>
            <g transform="translate(145)">
              <mask id="Y" fill="#fff">
                <use xlink:href="#X"/>
              </mask>
              <g mask="url(#Y)">
                <g stroke="url(#d)" stroke-width="2" transform="translate(-105 -66)">
                  <circle opacity=".45" transform="rotate(15 63 90)" cx="63" cy="90" r="51"/>
                  <circle opacity=".45" transform="rotate(15 68 90)" cx="68" cy="90" r="52"/>
                  <circle opacity=".45" transform="rotate(15 73 90)" cx="73" cy="90" r="53"/>
                  <circle opacity=".45" transform="rotate(15 78 90)" cx="78" cy="90" r="54"/>
                  <circle opacity=".4" transform="rotate(15 83 90)" cx="83" cy="90" r="55"/>
                  <circle opacity=".4" transform="rotate(15 88 90)" cx="88" cy="90" r="56"/>
                  <circle opacity=".4" transform="rotate(15 93 90)" cx="93" cy="90" r="57"/>
                  <circle opacity=".4" transform="rotate(15 98 90)" cx="98" cy="90" r="58"/>
                  <circle opacity=".4" transform="rotate(15 103 90)" cx="103" cy="90" r="59"/>
                  <circle opacity=".35" transform="rotate(15 108 90)" cx="108" cy="90" r="60"/>
                  <circle opacity=".35" transform="rotate(15 113 90)" cx="113" cy="90" r="61"/>
                  <circle opacity=".35" transform="rotate(15 118 89)" cx="118" cy="89" r="62"/>
                  <circle opacity=".35" transform="rotate(15 123 89)" cx="123" cy="89" r="63"/>
                  <circle opacity=".3" transform="rotate(15 128 89)" cx="128" cy="89" r="64"/>
                  <circle opacity=".3" transform="rotate(15 133 89)" cx="133" cy="89" r="65"/>
                  <circle opacity=".3" transform="rotate(15 138 89)" cx="138" cy="89" r="66"/>
                  <circle opacity=".25" transform="rotate(15 143 89)" cx="143" cy="89" r="67"/>
                  <circle opacity=".25" transform="rotate(15 148 89)" cx="148" cy="89" r="68"/>
                  <circle opacity=".2" transform="rotate(15 153 89)" cx="153" cy="89" r="69"/>
                  <circle opacity=".2" transform="rotate(15 158 89)" cx="158" cy="89" r="70"/>
                  <circle opacity=".2" transform="rotate(15 163 89)" cx="163" cy="89" r="71"/>
                  <circle opacity=".2" transform="rotate(15 168 89)" cx="168" cy="89" r="72"/>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>`

const renderStyle = (id: string, type: LargeButtonType) => {
  const style = document.createElement('style')

  let styleText = stripIndents(oneLine)`
    #${id} {
      position: relative;
      background-image: url(data:image/svg+xml;base64,${window.btoa(backgroundPattern)}), linear-gradient(to right, #7A7CF3, #6262F6);
      background-repeat: no-repeat;
      background-position: left 39px center, left center;
      background-size: 282px 100%, 100% 100%;
      box-shadow: 0 4px 15px 0 rgba(98,98,246,0.50);
      color: #fff;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      padding: 12px 39px;
      box-sizing: border-box;
    }

    #${id}-lock {
      position: absolute;
      left: 19px;
      top: 50%;
      transform: translateY(-50%);
      height: 20px;
      color: #4742d7;
    }

    #${id}-text-and-logo {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      margin-left: 12px;
      margin-right: 12px;
    }

    #${id}-logo {
      margin-right: 6px;
      height: 22px;
    }
  `

  if (type === 'sign-up' || type === 'log-in' || type === 'verify') {
    styleText += stripIndents(oneLine)`
      #${id}-text {
        margin-top: 2px;
      }
    `
  }

  style.append(styleText)

  return style
}

/* tslint:disable:max-line-length */
const renderLockIcon = (id: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.id = `${id}-lock`
  svg.setAttribute('viewBox', '0 0 24 24')

  const lock = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  lock.setAttribute(
    'd',
    'M19.5 9.5h-.75V6.75a6.75 6.75 0 0 0-13.5 0V9.5H4.5a2 2 0 0 0-2 2V22a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2V11.5a2 2 0 0 0-2-2zm-9.5 6a2 2 0 1 1 3 1.723V19.5a1 1 0 0 1-2 0v-2.277a1.994 1.994 0 0 1-1-1.723zM7.75 6.75a4.25 4.25 0 0 1 8.5 0V9a.5.5 0 0 1-.5.5h-7.5a.5.5 0 0 1-.5-.5z',
  )
  lock.setAttribute('fill', 'currentColor')

  svg.appendChild(lock)

  return svg
}
/* tslint:enable:max-line-length */

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
const texts: {[k in LargeButtonType]: {d: string; width: string; height: string}} = {
  'log-in': {
    d:
      'M.296 12V.976h2.352v8.96h4.128V12H.296zm11.328-2.048c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm10.96-3.888c0-1.12-.88-1.76-1.808-1.76-.944 0-1.792.704-1.792 1.76 0 1.12.848 1.824 1.792 1.824.912 0 1.808-.736 1.808-1.824zm-3.904 4.288c.256.688 1.136 1.2 1.888 1.2 1.696 0 2.16-1.168 2.064-2.656-.352.688-1.312 1.088-2.24 1.088-1.92 0-3.728-1.52-3.728-3.872 0-2.4 1.808-3.92 3.728-3.92.928 0 1.872.4 2.24 1.088v-.928h2.16v6.432c0 3.216-1.568 4.768-4.224 4.768-1.648 0-3.056-.928-3.68-2.32.56-.272 1.232-.608 1.792-.88zM31.016.976h2.336V12h-2.336V.976zm6.88 7.072V12h-2.224V4.528h2.224v1.088c.4-.752 1.28-1.248 2.16-1.248 1.68 0 2.736 1.04 2.736 3.168V12h-2.224V8.016c0-.992-.544-1.488-1.296-1.488-.784 0-1.376.384-1.376 1.52zm21.792-3.52L57.064 12h-1.856l-1.472-4.752L52.328 12h-1.856l-2.704-7.472h2.368l1.328 4.448 1.312-4.448h1.904l1.312 4.448 1.328-4.448h2.368zm3.392 0V12h-2.208V4.528h2.208zM60.584 1.76c0-.736.64-1.296 1.392-1.296.752 0 1.36.56 1.36 1.296s-.608 1.312-1.36 1.312c-.752 0-1.392-.576-1.392-1.312zm7.456 2.768h1.568v1.76H68.04V12h-2.208V6.288h-1.36v-1.76h1.36V1.664h2.208v2.864zm5.152 3.52V12h-2.224V.464h2.224v5.232c.304-.928 1.392-1.328 2.096-1.328 1.968 0 2.992 1.312 2.992 3.568V12h-2.224V8.016c0-.976-.704-1.488-1.376-1.488-.704 0-1.488.384-1.488 1.52zm18.896-4c0 .72-.368 1.632-1.504 2.064 1.456.368 2.08 1.616 2.08 2.512 0 1.824-1.328 3.376-3.52 3.376h-4.736V.976h4.416c1.984 0 3.264 1.184 3.264 3.072zm-5.328 1.28h1.84c.608 0 1.024-.48 1.024-1.136 0-.688-.352-1.152-1.04-1.152H86.76v2.288zm2.208 1.936H86.76v2.672h2.256c.784 0 1.184-.704 1.184-1.36 0-.624-.4-1.312-1.232-1.312zm5.36-6.8h2.224V12h-2.224V.464zm7.696 9.488c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm8.912-2.176c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm13.744-5.6c-.704 0-1.28.432-1.28 1.52V12h-2.224V7.968c-.016-.944-.592-1.44-1.232-1.44-.672 0-1.296.384-1.296 1.52V12h-2.224V4.528h2.224v1.088c.352-.784 1.152-1.232 1.952-1.232 1.184 0 1.984.448 2.4 1.312.72-1.168 1.712-1.328 2.24-1.328 1.776 0 2.88 1.136 2.88 3.392V12h-2.208V8.016c0-.976-.576-1.488-1.232-1.488z',
    width: '129',
    height: '16',
  },
  'sign-up': {
    d:
      'M0 8.304h2.352c.032.704.592 1.328 1.648 1.328.944 0 1.6-.448 1.616-1.168.016-.496-.208-.928-1.328-1.248L2.96 6.848C.528 6.096.112 4.672.112 3.68c0-1.968 1.68-3.296 3.792-3.296 2.128 0 3.728 1.264 3.728 3.376H5.296c0-.736-.496-1.248-1.424-1.248-.816 0-1.424.448-1.424 1.104 0 .288.112.816 1.184 1.12l1.312.416C7.616 5.92 8 7.424 7.968 8.48 7.936 10.672 5.952 11.712 4 11.712c-2.4 0-4-1.424-4-3.408zm11.84-4.24v7.472H9.632V4.064h2.208zM9.344 1.296C9.344.56 9.984 0 10.736 0c.752 0 1.36.56 1.36 1.296s-.608 1.312-1.36 1.312c-.752 0-1.392-.576-1.392-1.312zm10.016 6.48c0-1.12-.88-1.76-1.808-1.76-.944 0-1.792.704-1.792 1.76 0 1.12.848 1.824 1.792 1.824.912 0 1.808-.736 1.808-1.824zm-3.904 4.288c.256.688 1.136 1.2 1.888 1.2 1.696 0 2.16-1.168 2.064-2.656-.352.688-1.312 1.088-2.24 1.088-1.92 0-3.728-1.52-3.728-3.872 0-2.4 1.808-3.92 3.728-3.92.928 0 1.872.4 2.24 1.088v-.928h2.16v6.432c0 3.216-1.568 4.768-4.224 4.768-1.648 0-3.056-.928-3.68-2.32.56-.272 1.232-.608 1.792-.88zm10.384-4.48v3.952h-2.224V4.064h2.224v1.088c.4-.752 1.28-1.248 2.16-1.248 1.68 0 2.736 1.04 2.736 3.168v4.464h-2.224V7.552c0-.992-.544-1.488-1.296-1.488-.784 0-1.376.384-1.376 1.52zm15.216 1.904c.976 0 1.904-.752 1.904-1.888V.512h2.352V7.6c0 2.496-2 4.096-4.256 4.096-2.272 0-4.288-1.6-4.288-4.096V.512h2.384V7.6c0 1.136.912 1.888 1.904 1.888zm8.72-1.664c0 1.12.816 1.776 1.728 1.776.944 0 1.728-.704 1.728-1.776 0-1.104-.784-1.808-1.728-1.808-.928 0-1.728.736-1.728 1.808zm-2.256-3.76h2.208v.928c.368-.688 1.264-1.088 2.192-1.088 1.92 0 3.616 1.52 3.616 3.872 0 2.4-1.696 3.92-3.616 3.92-.928 0-1.824-.384-2.192-1.072V15.2H47.52V4.064zm24.56 0l-2.624 7.472H67.6l-1.472-4.752-1.408 4.752h-1.856L60.16 4.064h2.368l1.328 4.448 1.312-4.448h1.904l1.312 4.448 1.328-4.448h2.368zm3.392 0v7.472h-2.208V4.064h2.208zm-2.496-2.768c0-.736.64-1.296 1.392-1.296.752 0 1.36.56 1.36 1.296s-.608 1.312-1.36 1.312c-.752 0-1.392-.576-1.392-1.312zm7.456 2.768H82v1.76h-1.568v5.712h-2.208V5.824h-1.36v-1.76h1.36V1.2h2.208v2.864zm5.152 3.52v3.952H83.36V0h2.224v5.232c.304-.928 1.392-1.328 2.096-1.328 1.968 0 2.992 1.312 2.992 3.568v4.064h-2.224V7.552c0-.976-.704-1.488-1.376-1.488-.704 0-1.488.384-1.488 1.52zm18.896-4c0 .72-.368 1.632-1.504 2.064 1.456.368 2.08 1.616 2.08 2.512 0 1.824-1.328 3.376-3.52 3.376H96.8V.512h4.416c1.984 0 3.264 1.184 3.264 3.072zm-5.328 1.28h1.84c.608 0 1.024-.48 1.024-1.136 0-.688-.352-1.152-1.04-1.152h-1.824v2.288zM101.36 6.8h-2.208v2.672h2.256c.784 0 1.184-.704 1.184-1.36 0-.624-.4-1.312-1.232-1.312zm5.36-6.8h2.224v11.536h-2.224V0zm7.696 9.488c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm8.912-2.176c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm13.744-5.6c-.704 0-1.28.432-1.28 1.52v3.952h-2.224V7.504c-.016-.944-.592-1.44-1.232-1.44-.672 0-1.296.384-1.296 1.52v3.952h-2.224V4.064h2.224v1.088c.352-.784 1.152-1.232 1.952-1.232 1.184 0 1.984.448 2.4 1.312.72-1.168 1.712-1.328 2.24-1.328 1.776 0 2.88 1.136 2.88 3.392v4.24h-2.208V7.552c0-.976-.576-1.488-1.232-1.488z',
    width: '141',
    height: '16',
  },
  connect: {
    d:
      'M8.288 7.968l1.888 1.312c-.96 1.456-2.64 2.416-4.64 2.416C2.384 11.696 0 9.152 0 6.048 0 2.912 2.384.384 5.536.384c1.968 0 3.632.928 4.592 2.336L8.224 4.032c-.592-.864-1.552-1.44-2.688-1.44-1.84 0-3.184 1.536-3.184 3.456 0 1.904 1.344 3.44 3.184 3.44 1.152 0 2.16-.624 2.752-1.52zm6.688 1.52c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm7.712-4.08v3.952h-2.224V4.064h2.224v1.088c.4-.752 1.28-1.248 2.16-1.248 1.68 0 2.736 1.04 2.736 3.168v4.464H25.36V7.552c0-.992-.544-1.488-1.296-1.488-.784 0-1.376.384-1.376 1.52zm9.088 0v3.952h-2.224V4.064h2.224v1.088c.4-.752 1.28-1.248 2.16-1.248 1.68 0 2.736 1.04 2.736 3.168v4.464h-2.224V7.552c0-.992-.544-1.488-1.296-1.488-.784 0-1.376.384-1.376 1.52zm12.112 1.488l1.616 1.104c-.752 1.12-2.144 1.52-3.408 1.52-2.144 0-3.904-1.568-3.904-3.92s1.76-3.872 3.904-3.872c2.128 0 3.824 1.584 3.824 3.936 0 .192-.016.496-.032.688h-5.472c.112.864 1.056 1.248 1.84 1.248.608 0 1.264-.224 1.632-.704zm-3.44-1.936h3.232c-.112-.912-.944-1.28-1.568-1.28-.624 0-1.472.336-1.664 1.28zm6.544.64c0-2.352 1.92-3.872 4.064-3.872 1.328 0 2.528.576 3.248 1.584l-1.808 1.296c-.304-.48-.864-.752-1.44-.752-.944 0-1.856.672-1.856 1.744s.912 1.792 1.856 1.792c.576 0 1.136-.272 1.44-.752l1.808 1.28c-.704 1.008-1.904 1.6-3.248 1.6-2.144 0-4.064-1.568-4.064-3.92zm11.76-3.712h1.568v1.76h-1.568v5.712h-2.208V5.824h-1.36v-1.76h1.36V1.2h2.208v2.864zm12.208 7.472h-2.384V6.544L64.32.512h2.784L69.76 4.64 72.448.512h2.784L70.96 6.576v4.96zm8.464-2.048c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm10.304-3.648V4.064h2.224v7.472h-2.224v-1.024c-.4.752-1.216 1.184-1.936 1.184-1.68 0-2.96-1.04-2.96-3.168V4.064h2.224v3.984c0 1.184.816 1.488 1.328 1.488.688 0 1.344-.384 1.344-1.52zm6.496.912v2.608H94V4.064h2.224v1.808c.384-1.392 1.344-1.968 2.112-1.968.528 0 .928.096 1.28.272l-.4 2c-.4-.192-.784-.224-1.136-.224-1.28 0-1.856 1.008-1.856 2.976zm16.4-5.344c0 .72-.368 1.632-1.504 2.064 1.456.368 2.08 1.616 2.08 2.512 0 1.824-1.328 3.376-3.52 3.376h-4.736V.512h4.416c1.984 0 3.264 1.184 3.264 3.072zm-5.328 1.28h1.84c.608 0 1.024-.48 1.024-1.136 0-.688-.352-1.152-1.04-1.152h-1.824v2.288zm2.208 1.936h-2.208v2.672h2.256c.784 0 1.184-.704 1.184-1.36 0-.624-.4-1.312-1.232-1.312zm5.36-6.8h2.224v11.536h-2.224V0zm7.696 9.488c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm8.912-2.176c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm13.744-5.6c-.704 0-1.28.432-1.28 1.52v3.952h-2.224V7.504c-.016-.944-.592-1.44-1.232-1.44-.672 0-1.296.384-1.296 1.52v3.952h-2.224V4.064h2.224v1.088c.352-.784 1.152-1.232 1.952-1.232 1.184 0 1.984.448 2.4 1.312.72-1.168 1.712-1.328 2.24-1.328 1.776 0 2.88 1.136 2.88 3.392v4.24h-2.208V7.552c0-.976-.576-1.488-1.232-1.488zm5.68-5.552h2.336v11.024h-2.336V.512zm7.264 2.128v6.768h1.984c1.76 0 2.64-1.552 2.64-3.36 0-1.824-.88-3.408-2.64-3.408h-1.984zm1.984 8.896h-4.32V.512h4.32c3.168 0 4.976 2.4 4.976 5.536 0 3.12-1.808 5.488-4.976 5.488z',
    width: '166',
    height: '12',
  },
  bloom: {
    d:
      'M7.68 3.584c0 .72-.368 1.632-1.504 2.064 1.456.368 2.08 1.616 2.08 2.512 0 1.824-1.328 3.376-3.52 3.376H0V.512h4.416C6.4.512 7.68 1.696 7.68 3.584zm-5.328 1.28h1.84c.608 0 1.024-.48 1.024-1.136 0-.688-.352-1.152-1.04-1.152H2.352v2.288zM4.56 6.8H2.352v2.672h2.256c.784 0 1.184-.704 1.184-1.36 0-.624-.4-1.312-1.232-1.312zM9.92 0h2.224v11.536H9.92V0zm7.696 9.488c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm8.912-2.176c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm13.744-5.6c-.704 0-1.28.432-1.28 1.52v3.952h-2.224V7.504c-.016-.944-.592-1.44-1.232-1.44-.672 0-1.296.384-1.296 1.52v3.952h-2.224V4.064h2.224v1.088c.352-.784 1.152-1.232 1.952-1.232 1.184 0 1.984.448 2.4 1.312.72-1.168 1.712-1.328 2.24-1.328 1.776 0 2.88 1.136 2.88 3.392v4.24h-2.208V7.552c0-.976-.576-1.488-1.232-1.488z',
    width: '44',
    height: '12',
  },
  verify: {
    d:
      'M.256.976h2.432l1.968 7.232L6.608.976h2.448L5.696 12h-2.08L.256.976zm15.328 8.56L17.2 10.64c-.752 1.12-2.144 1.52-3.408 1.52-2.144 0-3.904-1.568-3.904-3.92s1.76-3.872 3.904-3.872c2.128 0 3.824 1.584 3.824 3.936 0 .192-.016.496-.032.688h-5.472c.112.864 1.056 1.248 1.84 1.248.608 0 1.264-.224 1.632-.704zM12.144 7.6h3.232c-.112-.912-.944-1.28-1.568-1.28-.624 0-1.472.336-1.664 1.28zm9.216 1.792V12h-2.224V4.528h2.224v1.808c.384-1.392 1.344-1.968 2.112-1.968.528 0 .928.096 1.28.272l-.4 2c-.4-.192-.784-.224-1.136-.224-1.28 0-1.856 1.008-1.856 2.976zm6.752-4.864V12h-2.208V4.528h2.208zM25.616 1.76c0-.736.64-1.296 1.392-1.296.752 0 1.36.56 1.36 1.296s-.608 1.312-1.36 1.312c-.752 0-1.392-.576-1.392-1.312zM35.104.464v2.128h-.816c-.768 0-1.136.544-1.136 1.424v.512h1.504v1.76h-1.504V12h-2.24V6.288h-1.408v-1.76h1.408v-.512c0-2.288 1.232-3.552 3.376-3.552h.816zm8 4.064l-4.608 11.136h-2.352l1.792-4.432-2.88-6.704h2.368l1.648 4.24 1.664-4.24h2.368zm16.016 0L56.496 12H54.64l-1.472-4.752L51.76 12h-1.856L47.2 4.528h2.368l1.328 4.448 1.312-4.448h1.904l1.312 4.448 1.328-4.448h2.368zm3.392 0V12h-2.208V4.528h2.208zM60.016 1.76c0-.736.64-1.296 1.392-1.296.752 0 1.36.56 1.36 1.296s-.608 1.312-1.36 1.312c-.752 0-1.392-.576-1.392-1.312zm7.456 2.768h1.568v1.76h-1.568V12h-2.208V6.288h-1.36v-1.76h1.36V1.664h2.208v2.864zm5.152 3.52V12H70.4V.464h2.224v5.232c.304-.928 1.392-1.328 2.096-1.328 1.968 0 2.992 1.312 2.992 3.568V12h-2.224V8.016c0-.976-.704-1.488-1.376-1.488-.704 0-1.488.384-1.488 1.52zm18.896-4c0 .72-.368 1.632-1.504 2.064 1.456.368 2.08 1.616 2.08 2.512 0 1.824-1.328 3.376-3.52 3.376H83.84V.976h4.416c1.984 0 3.264 1.184 3.264 3.072zm-5.328 1.28h1.84c.608 0 1.024-.48 1.024-1.136 0-.688-.352-1.152-1.04-1.152h-1.824v2.288zM88.4 7.264h-2.208v2.672h2.256c.784 0 1.184-.704 1.184-1.36 0-.624-.4-1.312-1.232-1.312zm5.36-6.8h2.224V12H93.76V.464zm7.696 9.488c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm8.912-2.176c.928 0 1.696-.672 1.696-1.712 0-1.008-.768-1.696-1.696-1.696-.912 0-1.68.688-1.68 1.696 0 1.04.768 1.712 1.68 1.712zm0 2.176c-2.112 0-3.872-1.536-3.872-3.888s1.76-3.872 3.872-3.872 3.888 1.52 3.888 3.872-1.776 3.888-3.888 3.888zm13.744-5.6c-.704 0-1.28.432-1.28 1.52V12h-2.224V7.968c-.016-.944-.592-1.44-1.232-1.44-.672 0-1.296.384-1.296 1.52V12h-2.224V4.528h2.224v1.088c.352-.784 1.152-1.232 1.952-1.232 1.184 0 1.984.448 2.4 1.312.72-1.168 1.712-1.328 2.24-1.328 1.776 0 2.88 1.136 2.88 3.392V12h-2.208V8.016c0-.976-.576-1.488-1.232-1.488zm5.68-5.552h2.336V12h-2.336V.976zm7.264 2.128v6.768h1.984c1.76 0 2.64-1.552 2.64-3.36 0-1.824-.88-3.408-2.64-3.408h-1.984zM139.04 12h-4.32V.976h4.32c3.168 0 4.976 2.4 4.976 5.536 0 3.12-1.808 5.488-4.976 5.488z',
    width: '144',
    height: '16',
  },
}
/* tslint:enable:max-line-length */

const renderTextAndLogo = (id: string, type: LargeButtonType) => {
  const textAndLogo = document.createElement('span')
  textAndLogo.id = `${id}-text-and-logo`
  textAndLogo.appendChild(renderBloomLogo(id))

  const text = texts[type]

  textAndLogo.appendChild(renderText(id, text.d, text.width, text.height))

  return textAndLogo
}

const renderLargeRequestButton = (id: string, anchor: HTMLAnchorElement, type: LargeButtonType) => {
  anchor.appendChild(renderStyle(id, type))
  anchor.appendChild(renderLockIcon(id))
  anchor.appendChild(renderTextAndLogo(id, type))
}

export {renderLargeRequestButton}