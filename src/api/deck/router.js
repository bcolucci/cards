
import { Router } from 'express'

const idRetrieveHandler = ({ ctx, repository }) => (req, res, next) => {
  const { id } = req.params
  if (id) {
    ctx.set('deck', repository.findById(Number(id)))
  }
  next()
}

const requireDeckHandler = ctx => (_, res, next) => {
  if (!ctx.get('deck')) {
    res.status(404)
    return res.end()
  }
  next()
}

export default ({ ctx, repository, service }) => {

  const router = new Router

  const idRetriever = idRetrieveHandler({ ctx, repository })

  const requireDeck = requireDeckHandler(ctx)

  router.post('/', (req, res) => res.json(service.create()))

  router.put('/:id/deal', idRetriever, requireDeck, (req, res) => {
    res.json(service.deal(ctx.get('deck')))
  })

  router.put('/:id/shuffle', idRetriever, requireDeck, (req, res) => {
    res.json(service.shuffle(ctx.get('deck')))
  })

  router.get('/:id?', idRetriever, (req, res) => {
    const deck = ctx.get('deck')
    if (deck === undefined) { // means no id given
      return res.json(repository.findAll())
    }
    requireDeck(null, res, () => res.json(deck))
  })

  return router
}
