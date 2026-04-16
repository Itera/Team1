import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { useMotivator } from '~/composables/useMotivator'

vi.stubGlobal('useRuntimeConfig', () => ({ public: { apiBase: 'http://127.0.0.1:4000' } }))

const mockFetch = vi.fn()
vi.stubGlobal('$fetch', mockFetch)

describe('useMotivator', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  // Case 1: canSubmit false when task is empty
  it('canSubmit is false when task is empty', () => {
    const { canSubmit, selectedMotivator } = useMotivator()
    selectedMotivator.value = { id: 'test', name: 'Test' }
    expect(canSubmit.value).toBe(false)
  })

  // Case 2: canSubmit false when motivator not selected
  it('canSubmit is false when no motivator is selected', () => {
    const { canSubmit, task } = useMotivator()
    task.value = 'read the news'
    expect(canSubmit.value).toBe(false)
  })

  // Case 3: canSubmit true with valid input
  it('canSubmit is true when task and motivator are both set', () => {
    const { canSubmit, task, selectedMotivator } = useMotivator()
    task.value = 'read the news'
    selectedMotivator.value = { id: 'test', name: 'Test' }
    expect(canSubmit.value).toBe(true)
  })

  // Case 4: successful API call populates result and resets loading
  it('successful API call sets result and clears loading flag', async () => {
    const mockResponse = {
      motivationalMessage: 'You got this!',
      funFact: 'A fun fact',
      tip: 'A useful tip',
    }
    mockFetch.mockResolvedValue(mockResponse)

    const { task, selectedMotivator, result, loading, submit } = useMotivator()
    task.value = 'read the news'
    selectedMotivator.value = { id: 'test', name: 'Test' }

    const promise = submit()
    expect(loading.value).toBe(true)

    await promise
    await flushPromises()

    expect(loading.value).toBe(false)
    expect(result.value).toEqual(mockResponse)
  })

  // Case 5: API failure resets loading, keeps result empty, and sets an error
  it('API failure resets loading, does not populate result, and sets an error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    const { task, selectedMotivator, result, loading, error, submit } = useMotivator()
    task.value = 'read the news'
    selectedMotivator.value = { id: 'test', name: 'Test' }

    await submit()

    expect(loading.value).toBe(false)
    expect(result.value).toBeNull()
    expect(error.value).toBe('Network error')
  })

  // Case 5b: unknown errors fall back to default error text
  it('uses fallback error message when caught error is not an Error instance', async () => {
    mockFetch.mockRejectedValue('boom')

    const { task, selectedMotivator, error, submit } = useMotivator()
    task.value = 'read the news'
    selectedMotivator.value = { id: 'test', name: 'Test' }

    await submit()

    expect(error.value).toBe('Noe gikk galt under motiveringen.')
  })

  // Case 5c: submit guard prevents API call when input is invalid
  it('does not call API when submit is triggered without valid input', async () => {
    const { submit } = useMotivator()

    await submit()

    expect(mockFetch).not.toHaveBeenCalled()
  })
})
