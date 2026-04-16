export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const allowed = config.allowedOrigins
    ? config.allowedOrigins.split(',').map((o: string) => o.trim())
    : []

  const origin = getRequestHeader(event, 'origin') ?? ''

  if (allowed.length === 0 || allowed.includes(origin)) {
    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  }

  // Handle preflight
  if (getMethod(event) === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.end()
  }
})
