// @vitest-environment node
import { afterEach, describe, expect, it } from 'vitest'
import type { AddressInfo } from 'node:net'
import { createApp } from '../../backend/src/app.js'

let activeServer: ReturnType<ReturnType<typeof createApp>['listen']> | undefined

afterEach(async () => {
  if (!activeServer) return
  await new Promise<void>((resolve, reject) => {
    activeServer?.close((error) => {
      if (error) return reject(error)
      resolve()
    })
  })
  activeServer = undefined
})

async function runWithServer(run: (baseUrl: string) => Promise<void>) {
  const app = createApp()
  activeServer = app.listen(0)
  const address = activeServer.address() as AddressInfo
  await run(`http://127.0.0.1:${address.port}`)
}

describe('backend api routes', () => {
  it('returns health status', async () => {
    await runWithServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/health`)
      const body = (await response.json()) as { status: string }

      expect(response.status).toBe(200)
      expect(body).toEqual({ status: 'ok' })
    })
  })

  it('returns 400 for invalid motivate payload', async () => {
    await runWithServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/motivate`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ task: '', motivator: 'jon' }),
      })

      expect(response.status).toBe(400)
    })
  })

  it('uses default language and content types when omitted', async () => {
    await runWithServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/motivate`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ task: 'Plan release', motivator: 'oystein' }),
      })
      const body = (await response.json()) as {
        motivationalMessage: string
        funFact?: string
        quote?: { content: string; author: string }
        gifUrl?: string
      }

      expect(response.status).toBe(200)
      expect(body.motivationalMessage).toContain('Øystein Pettersen')
      expect(body.funFact).toBeDefined()
      expect(body.quote).toBeDefined()
      expect(body.gifUrl).toBeDefined()
    })
  })

  it('returns 400 for unknown motivator', async () => {
    await runWithServer(async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/motivate`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          task: 'Plan release',
          motivator: 'unknown',
          language: 'no',
          contentTypes: ['humor'],
        }),
      })

      expect(response.status).toBe(400)
    })
  })
})
