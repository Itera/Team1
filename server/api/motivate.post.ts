import { generateMotivation, type Personality, type Language } from '../utils/openai'

interface MotivateRequest {
  task: string
  personality?: Personality
  language?: Language
  contentTypes?: string[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody<MotivateRequest>(event)

  if (!body?.task?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'task is required' })
  }

  const personality: Personality = body.personality ?? 'balanced'
  const language: Language = body.language ?? 'en'

  const llmResult = await generateMotivation(body.task, personality, language)

  return {
    motivationalMessage: llmResult.motivationalMessage ?? '',
    funFact: llmResult.funFact ?? '',
    tip: llmResult.tip ?? '',
    quote: null,
    gifUrl: null,
  }
})
