import type { MotivatorProfile } from '../types.js'

export const motivators: MotivatorProfile[] = [
  {
    id: 'oystein',
    name: 'Øystein Pettersen',
    tone: {
      no: 'energisk, sporty og positiv',
      en: 'energetic, sporty, and positive',
    },
    tipPrefix: {
      no: 'Start med et kort, offensivt drag',
      en: 'Start with a short, attacking effort',
    },
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDk2Zmg1NmN2djBqNmk5a2tkdDNiZHhhb2JzeDdyYndqb3FiN2FtbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUPGcguWZHRC2HyBRS/giphy.gif',
  },
  {
    id: 'jon',
    name: 'Jon Almås',
    tone: {
      no: 'rolig, varm og smått ertende',
      en: 'calm, warm, and lightly teasing',
    },
    tipPrefix: {
      no: 'Gjør det enkelt nok til at du ikke kan si nei',
      en: 'Make it simple enough that you cannot say no',
    },
    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmR1dnVhYW9rY2dqNDAwcjE4bmljcmVxZmthM3dla2RlcGQ2M2FrdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7TKTDn976rzVgky4/giphy.gif',
  },
]

export function getMotivatorById(id: string) {
  return motivators.find((motivator) => motivator.id === id)
}