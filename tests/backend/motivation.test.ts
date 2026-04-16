// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createMotivation } from '../../backend/src/services/motivation.js'

describe('backend createMotivation', () => {
  it('creates english motivation content for a valid motivator', () => {
    const response = createMotivation({
      task: 'Write integration tests',
      motivator: 'jon',
      language: 'en',
      contentTypes: ['humor', 'facts', 'quotes'],
    })

    expect(response.motivationalMessage).toContain('Jon Almås')
    expect(response.funFact).toBeDefined()
    expect(response.quote).toBeDefined()
    expect(response.gifUrl).toBeDefined()
    expect(response.tip).toContain('write integration tests')
  })

  it('respects content type filtering', () => {
    const response = createMotivation({
      task: 'Plan sprint',
      motivator: 'oystein',
      language: 'no',
      contentTypes: [],
    })

    expect(response.funFact).toBeUndefined()
    expect(response.quote).toBeUndefined()
    expect(response.gifUrl).toBeUndefined()
    expect(response.tip).toContain('plan sprint')
  })

  it('throws on unknown motivator', () => {
    expect(() =>
      createMotivation({
        task: 'Read docs',
        motivator: 'unknown',
        language: 'no',
        contentTypes: ['humor'],
      }),
    ).toThrow('Unknown motivator: unknown')
  })
})
