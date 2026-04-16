import express from 'express'

import apiRouter from './routes'

const app = express()

app.use(express.json())

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api', apiRouter)

export default app
