import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    azureOpenaiApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenaiEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
    azureOpenaiDeployment: process.env.AZURE_OPENAI_DEPLOYMENT ?? 'gpt-4o-mini',
    azureOpenaiApiVersion: process.env.AZURE_OPENAI_API_VERSION ?? '2025-01-01-preview',
    giphyApiKey: process.env.GIPHY_API_KEY,
    allowedOrigins: process.env.ALLOWED_ORIGINS ?? '',
  },
})
