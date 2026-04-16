export interface Motivator {
  id: string
  name: string
  avatar?: string
  description?: string
}

export const motivators: Motivator[] = [
  { id: 'oystein', name: 'Øystein Pettersen', description: 'Sportslig og energisk' },
  { id: 'jon', name: 'Jon Almås', description: 'Rolig og stødig' },
]
