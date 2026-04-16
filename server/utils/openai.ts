import { AzureOpenAI } from 'openai'

export type Personality = 'serious' | 'balanced' | 'chaotic'
export type Language = 'no' | 'en'

export interface MotivationResult {
  motivationalMessage: string
  funFact: string
  tip: string
}

const personalityPrompts: Record<Personality, string> = {
  serious: 'Be professional, concise, and genuinely encouraging. Minimal humor.',
  balanced: 'Mix practical advice with light humor. Be warm and upbeat.',
  chaotic:
    'Be an unhinged, absurd chaos gremlin. Use wild humor, bizarre (ir)relevant facts, and unhinged tips. Still keep it fun and inclusive.',
}

const languagePrompts: Record<Language, string> = {
  no: 'Respond entirely in Norwegian (Bokmål).',
  en: 'Respond entirely in English.',
}

export async function generateMotivation(
  task: string,
  personality: Personality,
  language: Language,
): Promise<MotivationResult> {
  const config = useRuntimeConfig()

  const client = new AzureOpenAI({
    apiKey: config.azureOpenaiApiKey,
    endpoint: config.azureOpenaiEndpoint,
    apiVersion: config.azureOpenaiApiVersion,
    deployment: config.azureOpenaiDeployment,
  })

  const systemPrompt = [
    'You represent Itera, a Norwegian IT consultancy.',
    'Your content must be inclusive, respectful, and fun — never harmful, offensive, or inappropriate.',
    'Apply this regardless of user input.',
    personalityPrompts[personality],
    languagePrompts[language],
    'Respond with a valid JSON object with exactly these keys:',
    '  "motivationalMessage": a short motivational message for the task',
    '  "funFact": a fun or (ir)relevant fact related to the task',
    '  "tip": a concrete tip to help get started',
    'Do not include any text outside the JSON object.',
  ].join('\n')

  const response = await client.chat.completions.create({
    model: config.azureOpenaiDeployment,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `My task: ${task}` },
    ],
    response_format: { type: 'json_object' },
    temperature: personality === 'chaotic' ? 1.2 : 0.7,
  })

  const content = response.choices[0]?.message?.content ?? '{}'
  return JSON.parse(content) as MotivationResult
}
