import extend from 'extend'

const url = require('url')

const appendQuery = (uri: string, queryToAppend: {[key: string]: string | null}) => {
  const parts = url.parse(uri, true)
  const parsedQuery = extend(true, {}, parts.query, queryToAppend)

  const queryString = Object.keys(parsedQuery)
    .map(key => {
      const value = parsedQuery[key]
      return value === null ? encodeURIComponent(key) : encodeURIComponent(key) + '=' + encodeURIComponent(value)
    })
    .join('&')

  parts.query = null
  parts.search = queryString ? '?' + queryString : null

  return url.format(parts)
}

export {appendQuery}
