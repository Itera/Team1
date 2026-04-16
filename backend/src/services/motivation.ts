import { getMotivatorById } from '../config/motivators.js'
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

const fallbackFacts: Record<'no' | 'en', string[]> = {
  no: [
    'Hjernen liker tydelige startpunkter. En liten handling gjør neste handling lettere.',
    'Folk overvurderer ofte hvor mye motivasjon som trengs for å begynne.',
  ],
  en: [
    'The brain likes clear starting points. One small action makes the next one easier.',
    'People often overestimate how much motivation it takes to begin.',
  ],
}

function pickByLength<T>(items: readonly T[], seed: number): T {
  return items[seed % items.length]
}

export function createMotivation(input: MotivateRequest): MotivateResponse {
  const motivator = getMotivatorById(input.motivator)

  if (!motivator) {
    throw new Error(`Unknown motivator: ${input.motivator}`)
  }

  const task = input.task.trim()
  const seed = task.length || 1
  const isNorwegian = input.language === 'no'
  const quotes = isNorwegian ? fallbackQuotes.no : fallbackQuotes.en
  const facts = isNorwegian ? fallbackFacts.no : fallbackFacts.en

  const motivationalMessage = isNorwegian
    ? `${motivator.name} sier: Dette klarer du. ${task} trenger ikke føles perfekt, bare mulig. I dag går du inn med en ${motivator.tone.no} tilnærming.`
    : `${motivator.name} says: You can do this. ${task} does not need to feel perfect, only possible. Go at it with a ${motivator.tone.en} mindset today.`

  const tip = isNorwegian
    ? `${motivator.tipPrefix.no}: bruk 10 minutter på første del av ${task.toLowerCase()}.`
    : `${motivator.tipPrefix.en}: spend 10 minutes on the first part of ${task.toLowerCase()}.`

  return {
    motivationalMessage,
    funFact: input.contentTypes.includes('facts') ? pickByLength(facts, seed) : undefined,
    tip,
    quote: input.contentTypes.includes('quotes') ? pickByLength(quotes, seed) : undefined,
    gifUrl: input.contentTypes.includes('humor') ? motivator.gifUrl : undefined,
  }
}