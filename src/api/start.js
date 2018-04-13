import createApp, { defaultDeckRouter } from './app'

const deckRouter = defaultDeckRouter()
const app = createApp({ deckRouter })

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on http://localhost:${port}`))
