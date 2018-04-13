import test from 'ava'
import chai from 'chai'
import chaiHTTP from 'chai-http'
import createApp, { defaultDeckRouter } from '../src/api/app'
import { first } from '../src/utils';

const should = chai.should()
chai.use(chaiHTTP)

const deckRouter = defaultDeckRouter()
const server = createApp({ deckRouter }).listen(3001)
test.after(() => server.close())

const createDeck = () => chai.request(server).post('/deck')
const retrieveDecks = () => chai.request(server).get('/deck')

const expectedCards = [
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
]

test.serial('POST /deck (create)', t => {
  return createDeck().then(({ status, body }) => {
    t.is(status, 200)
    t.deepEqual(body, { id: 0, cards: expectedCards })
  })
})

test.serial('GET /deck/0 (retrieve one)', t => {
  return chai.request(server).get('/deck/0').then(({ status, body }) => {
    t.is(status, 200)
    t.deepEqual(body, { id: 0, cards: expectedCards })
  })
})

test.serial('GET /deck (retrieve all)', t => {
  return createDeck()
    .then(retrieveDecks)
    .then(({ status, body }) => {
      t.is(status, 200)
      t.deepEqual(body, [
        { id: 0, cards: expectedCards },
        { id: 1, cards: expectedCards }
      ])
    })
})

test.serial('PUT /deck/1/deal (deal some cards)', t => {
  const dealDeckCard = id => () => chai.request(server).put(`/deck/${id}/deal`)
  const dealDeckCards = (id, nbDeals) => (function recur(acc = []) {
    return acc.length === nbDeals ? acc : recur([...acc, dealDeckCard(id)])
  })
  const deals10CardsFrom2ndDeck = dealDeckCards(1, 10)
  const expectedDealedCards = expectedCards.slice(0, 10)
  return deals10CardsFrom2ndDeck().reduce((acc, deal) => {
    return acc.then(() => deal()).then(({ body }) => {
      // validate each dealed card one by one
      t.deepEqual(body, expectedDealedCards.shift())
    })
  }, Promise.resolve())
    .then(retrieveDecks)
    .then(({ status, body }) => {
      t.is(status, 200)
      t.deepEqual(body, [
        { id: 0, cards: expectedCards },
        { id: 1, cards: expectedCards.slice(10) }
      ])
    })
    .then(() => Promise.all(dealDeckCards(1, 42)().map(deal => deal())))
    .then(retrieveDecks)
    .then(({ body }) => {
      t.deepEqual(body, [
        { id: 0, cards: expectedCards },
        { id: 1, cards: [] } // no more cards
      ])
    })
})

test.serial('PUT /deck/2/shuffle', t => {
  const shuffleDeck = id => () => chai.request(server).put(`/deck/${id}/shuffle`)
  return createDeck()
    .then(shuffleDeck(2))
    .then(({ status, body }) => {
      t.is(status, 200)
      t.is(body.cards.length, expectedCards.length)
      t.notDeepEqual(body.cards, expectedCards)
      t.is(
        body.cards.map(c => c.str).sort().join(''),
        '🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂭🂮🂱🂲🂳🂴🂵🂶🂷🂸🂹🂺🂻🂽🂾🃁🃂🃃🃄🃅🃆🃇🃈🃉🃊🃋🃍🃎🃑🃒🃓🃔🃕🃖🃗🃘🃙🃚🃛🃝🃞'
      )
    })
})
