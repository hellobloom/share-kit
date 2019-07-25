import {appendQuery} from '../src/append'

test('should append query object to url', () => {
  const result = appendQuery('http://example.com/', {foo: 'bar'})
  const expected = 'http://example.com/?foo=bar'

  expect(result).toEqual(expected)
})

test('should append query object to url with existing query', () => {
  const result = appendQuery('http://example.com/?foo=bar', {baz: 'qux'})
  const expected = 'http://example.com/?foo=bar&baz=qux'

  expect(result).toEqual(expected)
})

test('should encode the params', () => {
  const result = appendQuery('http://example.com/', {foo: '"bar"'})
  const expected = 'http://example.com/?foo=%22bar%22'

  expect(result).toEqual(expected)
})

test('appends just the key if value is null', () => {
  const result = appendQuery('http://example.com/', {foo: null})
  const expected = 'http://example.com/?foo'

  expect(result).toEqual(expected)
})
