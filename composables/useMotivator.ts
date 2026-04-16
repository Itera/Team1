import { ref, computed } from 'vue'
import type { Motivator } from '~/config/motivators'

export interface MotivateResponse {
  motivationalMessage: string
  funFact?: string
  tip?: string
  quote?: { content: string; author: string }
  gifUrl?: string
}

export function useMotivator() {
  const task = ref('')
  const selectedMotivator = ref<Motivator | null>(null)
  const result = ref<MotivateResponse | null>(null)
  const loading = ref(false)

  const canSubmit = computed(() => task.value.trim().length > 0 && selectedMotivator.value !== null)

  async function submit() {
    if (!canSubmit.value || !selectedMotivator.value) return
    loading.value = true
    result.value = null
    try {
      result.value = await $fetch<MotivateResponse>('/api/motivate', {
        method: 'POST',
        body: {
          task: task.value,
          motivator: selectedMotivator.value.id,
          personality: 'balanced',
          language: 'no',
          contentTypes: ['humor', 'facts', 'quotes'],
        },
      })
    } finally {
      loading.value = false
    }
  }

  return { task, selectedMotivator, result, loading, canSubmit, submit }
}
