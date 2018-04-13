import test from 'ava'
import * as utils from '../src/utils'

test('codeStr', t => t.is(utils.codeStr(20000), '丠'))
test('trunc', t => t.is(utils.trunc(1.5), 1))
test('fixed', t => t.is(utils.fixed(42)(), 42))
test('attr', t => t.is(utils.attr('name')({ name: 'brice' }), 'brice'))
test('map', t => t.deepEqual(utils.map(v => v * 2)([1, 2, 4]), [2, 4, 8]))
test('filter', t => t.deepEqual(utils.filter(v => v % 2)([0, 1, 2, 3, 4]), [1, 3]))
test('join', t => t.is(utils.join('-')(['a', 'b']), 'a-b'))
test('keys', t => t.deepEqual(utils.keys({ a: 4, b: 2 }), ['a', 'b']))
test('len', t => t.is(utils.len([1, 2, 3]), 3))
test('first', t => t.is(utils.first([1, 2, 3]), 1))
test('tail', t => t.deepEqual(utils.tail([1, 2, 3]), [2, 3]))
test('pick', t => t.is(utils.pick([1, 2, 3])(1), 2))
test('toHex', t => t.is(utils.toHex(11), 'b'))
test('toInt', t => t.is(utils.toInt(16)('b'), 11))
test('is', t => t.false(utils.is(11)(12)) && t.true(utils.is(11)(11)))
test('add', t => t.is(utils.add(5)(4), 9))
test('prefix', t => t.is(utils.prefix('hello ')('world'), 'hello world'))
test('append', t => t.deepEqual(utils.append([1, 2], 3), [1, 2, 3]))
test('apply', t => t.is(utils.apply(v => v * 7)(6), 42))
test('hexToInt', t => t.is(utils.hexToInt('a'), 10))

test('compose', t => {
  const add = x => y => x + y
  const mult = x => y => x * y
  t.is(utils.compose(add(2), mult(4))(5), 22)
})

test('negate', t => {
  const isBrice = ({ name }) => name === 'brice'
  t.true(isBrice({ name: 'brice' }))
  t.false(utils.negate(isBrice)({ name: 'brice' }))
  t.true(utils.negate(isBrice)({ name: 'max' }))
})

test('isNot', t => t.false(utils.isNot(42)(42)) && t.true(utils.isNot(42)(40)))

const randomArr = (size, acc = []) => acc.length === size ? acc
  : randomArr(size, [...acc, Math.random()])

test('randPermutor', t => {
  const arr = randomArr(10)
  const permut = utils.randPermutor(arr)
  const permuted = permut()
  t.is(permuted.length, arr.length)
  t.notDeepEqual(permuted, arr)
})

test('shuffler', t => {
  const arr = randomArr(10)
  const shuffled = utils.shuffler()(arr)
  t.is(shuffled.length, arr.length)
  t.notDeepEqual(shuffled, arr)
})

test('shifter', t => {
  const arr = [1, 2, 3]
  const popElem = utils.shifter(arr)
  t.deepEqual(popElem(), { elem: 1, rest: [2, 3] })
  t.deepEqual(popElem(), { elem: 2, rest: [3] })
  t.deepEqual(popElem(), { elem: 3, rest: [] })
  t.deepEqual(arr, [1, 2, 3])
})

test('hasher', t => {
  t.is(utils.hasher()('brice'), '6cb528d1b00572441b44b2a528183bf4')
  t.is(utils.hasher('md5', 'base64')('brice'), 'bLUo0bAFckQbRLKlKBg79A==')
})

test('memoize', t => {
  // think about a better way to test this
  const double = utils.memoize(v => v * 2)
  t.is(double(3), 6)
  t.is(double(3), 6)
})
