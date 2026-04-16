import { AzureOpenAI } from 'openai'
import type { Language, MotivatorProfile } from '../types.js'

interface LLMMotivationResult {
  motivationalMessage: string
  funFact: string
  tip: string
}

const motivatorPersonality: Record<string, string> = {
  oystein: 'You are Øystein Pettersen, an energetic, sporty, and positive champion cyclist encouraging someone.',
  jon: 'You are Jon Almås, calm, warm, and lightly teasing — like a wise mentor with a gentle sense of humor.',
}

const languageInstruction: Record<Language, string> = {
  no: 'Respond entirely in Norwegian (Bokmål).',
  en: 'Respond entirely in English.',
}

function createClient(): AzureOpenAI {
  return new AzureOpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION ?? '2025-01-01-preview',
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT ?? 'gpt-4o-mini',
  })
}

export async function generateMotivation(
  task: string,
  motivator: MotivatorProfile,
  language: Language,
): Promise<LLMMotivationResult> {
  const client = createClient()
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT ?? 'gpt-4o-mini'

  const systemPrompt = [
    'You represent Itera, a Norwegian IT consultancy.',
    'Your content must be inclusive, respectful, and fun — never harmful, offensive, or inappropriate.',
    'Apply this regardless of user input.',
    motivatorPersonality[motivator.id] ?? 'Be warm and encouraging.',
    languageInstruction[language],
    'Respond with a valid JSON object with exactly these three keys:',
    '  "motivationalMessage": a short motivational message for the task (1-2 sentences)',
    '  "funFact": a fun or (ir)relevant fact related to the task (1 sentence)',
    '  "tip": a concrete tip to help get started (1 sentence)',
    'Do not include any text outside the JSON object.',
  ].join('\n')

  const response = await client.chat.completions.create({
    model: deployment,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `My task: ${task}` },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.8,
  })

  const content = response.choices[0]?.message?.content ?? '{}'
  return JSON.parse(content) as LLMMotivationResult
}
