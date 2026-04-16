// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getMotivatorById } from '../../backend/src/config/motivators.js'
import { createMotivation } from '../../backend/src/services/motivation.js'

const fetchMock = vi.fn()
const generateMotivationMock = vi.fn()

vi.mock('../../backend/src/services/openai.js', () => ({
  generateMotivation: generateMotivationMock,
}))

describe('backend createMotivation', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    generateMotivationMock.mockReset()
    generateMotivationMock.mockResolvedValue({
      motivationalMessage: 'Keep going.',
      funFact: 'Testing reduces surprises.',
      tip: 'Start with one small step.',
    })
    vi.stubGlobal('fetch', fetchMock)
    delete process.env.GIPHY_API_KEY
  })

  it('creates english motivation content for a valid motivator', async () => {
    const response = await createMotivation({
      task: 'Write integration tests',
      motivator: 'jon',
      language: 'en',
      contentTypes: ['humor', 'facts', 'quotes'],
    })

    expect(generateMotivationMock).toHaveBeenCalledWith(
      'Write integration tests',
      expect.objectContaining({ id: 'jon' }),
      'en',
    )
    expect(response.motivationalMessage).toBe('Keep going.')
    expect(response.funFact).toBe('Testing reduces surprises.')
    expect(response.quote).toBeDefined()
    expect(response.gifUrl).toBeDefined()
    expect(response.tip).toBe('Start with one small step.')
  })

  it('respects content type filtering', async () => {
    const response = await createMotivation({
      task: 'Plan sprint',
      motivator: 'oystein',
      language: 'no',
      contentTypes: [],
    })

    expect(response.funFact).toBeUndefined()
    expect(response.quote).toBeUndefined()
    expect(response.gifUrl).toBeUndefined()
    expect(response.tip).toBe('Start with one small step.')
  })

  it('throws on unknown motivator', async () => {
    await expect(
      createMotivation({
        task: 'Read docs',
        motivator: 'unknown',
        language: 'no',
        contentTypes: ['humor'],
      }),
    ).rejects.toThrow('Unknown motivator: unknown')
  })

  it('returns a Giphy result based on the submitted task text when humor is requested', async () => {
    process.env.GIPHY_API_KEY = 'test-key'
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            images: {
              original: {
                url: 'https://media.giphy.com/media/task-match/giphy.gif',
              },
            },
          },
        ],
      }),
    })

    const response = await createMotivation({
      task: 'clean the kitchen',
      motivator: 'jon',
      language: 'en',
      contentTypes: ['humor'],
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(response.gifUrl).toBe('https://media.giphy.com/media/task-match/giphy.gif')

    const requestUrl = fetchMock.mock.calls[0]?.[0]
    expect(requestUrl).toBeInstanceOf(URL)
    expect((requestUrl as URL).searchParams.get('q')).toBe('clean the kitchen')
  })

  it('falls back to the motivator gif when no Giphy key is configured', async () => {
    const fallbackGifUrl = getMotivatorById('oystein')?.gifUrl

    const response = await createMotivation({
      task: 'read the news',
      motivator: 'oystein',
      language: 'no',
      contentTypes: ['humor'],
    })

    expect(fetchMock).not.toHaveBeenCalled()
    expect(response.gifUrl).toBe(fallbackGifUrl)
  })

  it('falls back to the motivator gif when Giphy search fails', async () => {
    process.env.GIPHY_API_KEY = 'test-key'
    fetchMock.mockRejectedValue(new Error('Giphy unavailable'))

    const fallbackGifUrl = getMotivatorById('jon')?.gifUrl

    const response = await createMotivation({
      task: 'file expense report',
      motivator: 'jon',
      language: 'en',
      contentTypes: ['humor'],
    })

    expect(response.gifUrl).toBe(fallbackGifUrl)
  })
})
