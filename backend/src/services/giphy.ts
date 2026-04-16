import type { Language } from '../types.js'

const GIPHY_SEARCH_URL = 'https://api.giphy.com/v1/gifs/search'

interface GiphyImageVariant {
  url?: string
}

interface GiphyGif {
  images?: {
    original?: GiphyImageVariant
    fixed_height?: GiphyImageVariant
  }
}

interface GiphySearchResponse {
  data?: GiphyGif[]
}

export async function findGifUrl(query: string, language: Language): Promise<string | undefined> {
  const apiKey = process.env.GIPHY_API_KEY?.trim()
  const normalizedQuery = query.trim()

  if (!apiKey || !normalizedQuery) {
    return undefined
  }

  const url = new URL(GIPHY_SEARCH_URL)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('q', normalizedQuery)
  url.searchParams.set('limit', '1')
  url.searchParams.set('rating', 'g')
  url.searchParams.set('lang', language)
  url.searchParams.set('sort', 'relevant')

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    })

    if (!response.ok) {
      return undefined
    }

    const payload = (await response.json()) as GiphySearchResponse
    const firstGif = payload.data?.[0]

    return firstGif?.images?.original?.url ?? firstGif?.images?.fixed_height?.url
  } catch {
    return undefined
  }
}