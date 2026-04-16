import app from './app'

const port = Number.parseInt(process.env.PORT ?? '4000', 10)

if (Number.isNaN(port)) {
  throw new Error('PORT must be a valid number')
}

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
