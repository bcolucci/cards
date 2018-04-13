import express from 'express'
import morgan from 'morgan'
import ctx from 'express-http-context'
import { json } from 'body-parser'

import createDeckRepository from './deck/arrRepository'
import createDeckService from './deck/service'
import createDeckRouter from './deck/router'

export const defaultDeckRouter = () => {
  const repository = createDeckRepository()
  const service = createDeckService(repository)
  return createDeckRouter({ ctx, repository, service })
}

export default ({ deckRouter }) => {

  const app = express()
  app.use(morgan('tiny'))
  app.use(json())
  app.use(ctx.middleware)
  app.get('/ping', (req, res) => res.end('pong'))
  app.use('/deck', defaultDeckRouter())

  return app
}

