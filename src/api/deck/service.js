import * as core from '../../core'
import * as utils from '../../utils'

export default repository => {

  const shuffleDeck = utils.shuffler()

  // transform a set of cards to a deck object: { id: null, cards: [...] }
  const wrapCards = cards => ({ id: null, cards })

  const create = utils.compose(repository.save, wrapCards, core.newDeck)

  const shuffle = deck => {
    const cards = utils.compose(repository.save, shuffleDeck, utils.attr('cards'))(deck)
    return repository.save({ ...deck, cards })
  }

  const deal = deck => {
    const { elem, rest } = utils.shifter(deck.cards)()
    repository.save({ ...deck, cards: rest })
    return elem
  }

  return { create, shuffle, deal }

}


