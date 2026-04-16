import type { MotivatorPersona } from './types'
import oystein from './oystein'
import jon from './jon'

export const motivatorPersonas: MotivatorPersona[] = [oystein, jon]

export function getMotivatorById(id: string): MotivatorPersona | undefined {
  return motivatorPersonas.find((m) => m.id === id)
}

export type { MotivatorPersona }
