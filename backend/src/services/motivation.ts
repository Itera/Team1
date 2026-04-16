import { getMotivatorById } from '../config/motivators.js'
import { generateMotivation } from './openai.js'
import type { MotivateRequest, MotivateResponse, Quote } from '../types.js'

const fallbackQuotes: Record<'no' | 'en', Quote[]> = {
  no: [
    { content: 'Det viktigste steget er det du faktisk tar.', author: 'HuMotivatoren' },
    { content: 'Fremgang teller mer enn perfeksjon.', author: 'HuMotivatoren' },
  ],
  en: [
    { content: 'The step you actually take is the one that matters.', author: 'HuMotivatoren' },
    { content: 'Progress matters more than perfection.', author: 'HuMotivatoren' },
  ],
}

function pickByLength<T>(items: readonly T[], seed: number): T {
  return items[seed % items.length]
}

export async function createMotivation(input: MotivateRequest): Promise<MotivateResponse> {
  const motivator = getMotivatorById(input.motivator)

  if (!motivator) {
    throw new Error(`Unknown motivator: ${input.motivator}`)
  }

  const llm = await generateMotivation(input.task, motivator, input.language)

  const seed = input.task.trim().length || 1
  const quotes = input.language === 'no' ? fallbackQuotes.no : fallbackQuotes.en

  return {
    motivationalMessage: llm.motivationalMessage,
    funFact: input.contentTypes.includes('facts') ? llm.funFact : undefined,
    tip: llm.tip,
    quote: input.contentTypes.includes('quotes') ? pickByLength(quotes, seed) : undefined,
    gifUrl: input.contentTypes.includes('humor') ? motivator.gifUrl : undefined,
  }
}