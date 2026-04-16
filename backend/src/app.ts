import cors from 'cors'
import express from 'express'
import { z } from 'zod'
import { createMotivation } from './services/motivation.js'
import type { ContentType, Language, MotivateRequest } from './types.js'

const motivateSchema = z.object({
  task: z.string().trim().min(1),
  motivator: z.string().trim().min(1),
  language: z.enum(['no', 'en']).default('no'),
  contentTypes: z.array(z.enum(['humor', 'facts', 'quotes'])).default(['humor', 'facts', 'quotes']),
})

export function createApp() {
  const app = express()
  const allowedOrigin = process.env.FRONTEND_ORIGIN ?? 'http://127.0.0.1:3000'

  app.use(cors({ origin: [allowedOrigin, 'http://localhost:3000', 'http://127.0.0.1:3000'] }))
  app.use(express.json())

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok' })
  })

  app.post('/api/motivate', async (request, response) => {
    const parsed = motivateSchema.safeParse(request.body)

    if (!parsed.success) {
      return response.status(400).json({ message: 'Invalid motivate request', issues: parsed.error.flatten() })
    }

    try {
      const payload: MotivateRequest = {
        task: parsed.data.task,
        motivator: parsed.data.motivator,
        language: parsed.data.language as Language,
        contentTypes: parsed.data.contentTypes as ContentType[],
      }

      return response.json(await createMotivation(payload))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create motivation'
      return response.status(400).json({ message })
    }
  })

  return app
}