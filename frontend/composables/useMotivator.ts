import { ref, computed } from 'vue'

export interface MotivateResponse {
  motivationalMessage: string
  funFact?: string
  tip?: string
  quote?: { content: string; author: string }
  gifUrl?: string
}

export function useMotivator() {
  const config = useRuntimeConfig()
  const task = ref('')
  const selectedMotivator = ref<string | null>(null)
  const result = ref<MotivateResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const canSubmit = computed(() => task.value.trim().length > 0 && selectedMotivator.value !== null)

  async function submit() {
    if (!canSubmit.value || !selectedMotivator.value) return
    loading.value = true
    result.value = null
    error.value = null
    try {
      result.value = await $fetch<MotivateResponse>(`${config.public.apiBase}/api/motivate`, {
        method: 'POST',
        body: {
          task: task.value,
          motivator: selectedMotivator.value,
          language: 'no',
          contentTypes: ['humor', 'facts', 'quotes'],
        },
      })
    } catch (caughtError) {
      error.value = caughtError instanceof Error ? caughtError.message : 'Noe gikk galt under motiveringen.'
    } finally {
      loading.value = false
    }
  }

  return { task, selectedMotivator, result, loading, error, canSubmit, submit }
}
