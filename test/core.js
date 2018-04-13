import test from 'ava'
import * as core from '../src/core'

test('suitCode', t => {
  t.is(core.suitCode(0), 'a')
  t.is(core.suitCode(1), 'b')
})

test('suitPrefix', t => {
  t.is(core.suitPrefix(0), '1f0a')
  t.is(core.suitPrefix(1), '1f0b')
})

test('cardCode', t => {
  t.is(core.cardCode(0)(0), '1f0a0')
  t.is(core.cardCode(1)(2), '1f0b2')
})

test('cardStr', t => {
  t.is(core.cardStr('1f0a1'), '🂡')
  t.is(core.cardStr('1f0ce'), '🃎')
})

test('newCard', t => {
  t.deepEqual(core.newCard(0), {
    code: '1f0a1',
    str: '🂡',
    suit: 0,
    value: 1,
  })
  t.deepEqual(core.newCard(55), {
    code: '1f0de',
    str: '🃞',
    suit: 3,
    value: 14,
  })
})

test('isNotCaptain', t => {
  t.false(core.isNotCaptain({ value: 12 }))
  t.true(core.isNotCaptain({ value: 13 }))
})

test('removeCaptains', t => {
  t.deepEqual(core.removeCaptains([
    { value: 1 },
    { value: 12 },
    { value: 2 }
  ]), [{ value: 1 }, { value: 2 }])
})

test('newDeck', t => {
  t.deepEqual(core.newDeck(), [
    { suit: 0, value: 1, code: '1f0a1', str: '🂡' },
    { suit: 0, value: 2, code: '1f0a2', str: '🂢' },
    { suit: 0, value: 3, code: '1f0a3', str: '🂣' },
    { suit: 0, value: 4, code: '1f0a4', str: '🂤' },
    { suit: 0, value: 5, code: '1f0a5', str: '🂥' },
    { suit: 0, value: 6, code: '1f0a6', str: '🂦' },
    { suit: 0, value: 7, code: '1f0a7', str: '🂧' },
    { suit: 0, value: 8, code: '1f0a8', str: '🂨' },
    { suit: 0, value: 9, code: '1f0a9', str: '🂩' },
    { suit: 0, value: 10, code: '1f0aa', str: '🂪' },
    { suit: 0, value: 11, code: '1f0ab', str: '🂫' },
    { suit: 0, value: 13, code: '1f0ad', str: '🂭' },
    { suit: 0, value: 14, code: '1f0ae', str: '🂮' },
    { suit: 1, value: 1, code: '1f0b1', str: '🂱' },
    { suit: 1, value: 2, code: '1f0b2', str: '🂲' },
    { suit: 1, value: 3, code: '1f0b3', str: '🂳' },
    { suit: 1, value: 4, code: '1f0b4', str: '🂴' },
    { suit: 1, value: 5, code: '1f0b5', str: '🂵' },
    { suit: 1, value: 6, code: '1f0b6', str: '🂶' },
    { suit: 1, value: 7, code: '1f0b7', str: '🂷' },
    { suit: 1, value: 8, code: '1f0b8', str: '🂸' },
    { suit: 1, value: 9, code: '1f0b9', str: '🂹' },
    { suit: 1, value: 10, code: '1f0ba', str: '🂺' },
    { suit: 1, value: 11, code: '1f0bb', str: '🂻' },
    { suit: 1, value: 13, code: '1f0bd', str: '🂽' },
    { suit: 1, value: 14, code: '1f0be', str: '🂾' },
    { suit: 2, value: 1, code: '1f0c1', str: '🃁' },
    { suit: 2, value: 2, code: '1f0c2', str: '🃂' },
    { suit: 2, value: 3, code: '1f0c3', str: '🃃' },
    { suit: 2, value: 4, code: '1f0c4', str: '🃄' },
    { suit: 2, value: 5, code: '1f0c5', str: '🃅' },
    { suit: 2, value: 6, code: '1f0c6', str: '🃆' },
    { suit: 2, value: 7, code: '1f0c7', str: '🃇' },
    { suit: 2, value: 8, code: '1f0c8', str: '🃈' },
    { suit: 2, value: 9, code: '1f0c9', str: '🃉' },
    { suit: 2, value: 10, code: '1f0ca', str: '🃊' },
    { suit: 2, value: 11, code: '1f0cb', str: '🃋' },
    { suit: 2, value: 13, code: '1f0cd', str: '🃍' },
    { suit: 2, value: 14, code: '1f0ce', str: '🃎' },
    { suit: 3, value: 1, code: '1f0d1', str: '🃑' },
    { suit: 3, value: 2, code: '1f0d2', str: '🃒' },
    { suit: 3, value: 3, code: '1f0d3', str: '🃓' },
    { suit: 3, value: 4, code: '1f0d4', str: '🃔' },
    { suit: 3, value: 5, code: '1f0d5', str: '🃕' },
    { suit: 3, value: 6, code: '1f0d6', str: '🃖' },
    { suit: 3, value: 7, code: '1f0d7', str: '🃗' },
    { suit: 3, value: 8, code: '1f0d8', str: '🃘' },
    { suit: 3, value: 9, code: '1f0d9', str: '🃙' },
    { suit: 3, value: 10, code: '1f0da', str: '🃚' },
    { suit: 3, value: 11, code: '1f0db', str: '🃛' },
    { suit: 3, value: 13, code: '1f0dd', str: '🃝' },
    { suit: 3, value: 14, code: '1f0de', str: '🃞' }
  ])
})

// optional
/*test('deckStr', t => {
  const deck = core.newDeck()
  const expected = '🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃚🃛🃝🃞'
  t.deepEqual(core.pickCardsStr(deck).join(''), expected)
  t.deepEqual(core.deckStr(deck), expected)
})*/
