// for test purpose, an array repository
// (optional) uncomment to save on fs
export default () => {

  const filename = './decks.json'

  const decks = (() => {
    try {
      return JSON.parse(filename)
    } catch (_) { }
    return []
  })()

  const findAll = () => [...decks]

  const findById = idx => decks[idx] ? ({ ...decks[idx] }) : null

  const save = deck => {
    if (deck.id === null || deck.id > decks.length) {
      return save(({ ...deck, id: decks.length }))
    }
    decks[deck.id] = deck
    // uncomment if you want to see the file
    // require('fs').writeFileSync(filename, JSON.stringify(decks, null, 2))
    return deck
  }

  return { findAll, findById, save }

}


