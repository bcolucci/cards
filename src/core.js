'use strict'

import * as u from './utils'

// constants
/* istanbul ignore next */
const suits = { spade: 0, heart: 1, diamond: 2, club: 3 }
/* istanbul ignore next */
const suitNames = u.keys(suits)
/* istanbul ignore next */
const nbSuits = u.len(suitNames)
/* istanbul ignore next */
const suitName = u.memoize(u.pick(suitNames))
/* istanbul ignore next */
const suitNbCards = 14
/* istanbul ignore next */
const totalCards = nbSuits * suitNbCards
/* istanbul ignore next */
const uCardPrefix = '1f0'

export const suitCode = u.memoize(u.compose(u.toHex, u.add(10)))
export const suitPrefix = u.memoize(u.compose(u.prefix(uCardPrefix), suitCode))

export const cardCode = u.memoize(suit => {
  const prefixValue = u.memoize(u.compose(u.prefix, suitPrefix))(suit)
  return u.memoize(u.compose(prefixValue, u.toHex))
})
export const cardStr = u.memoize(u.compose(u.codeStr, u.hexToInt))

export const newCard = u.memoize(idx => {
  const suit = u.trunc(idx / suitNbCards)
  const value = u.add(1)(idx % suitNbCards)
  const code = cardCode(suit)(value)
  const str = cardStr(code)
  return { suit, value, code, str }
})

export const isNotCaptain = u.compose(u.isNot(12), u.attr('value'))
export const removeCaptains = u.filter(isNotCaptain)

export const newDeck = () => {
  const enough = u.compose(u.is(totalCards), u.len)
  const recur = (deck = []) => enough(deck) ? removeCaptains(deck)
    : recur(u.append(deck, newCard(u.len(deck))))
  return recur()
}

// optional
//const pickCardsStr = u.map(u.attr('str'))
//const deckStr = u.compose(u.join(''), pickCardsStr)
