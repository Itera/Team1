import { config } from 'dotenv'
import { resolve } from 'path'

// Load from root .env (one level up from backend/)
config({ path: resolve(process.cwd(), '../.env') })

import { createApp } from './app.js'

const port = Number(process.env.PORT ?? 4000)
const app = createApp()

app.listen(port, () => {
  console.log(`HuMotivatoren backend listening on http://127.0.0.1:${port}`)
})