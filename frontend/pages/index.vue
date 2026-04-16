<script setup lang="ts">
import { computed } from 'vue'
import { getMotivatorById } from '~/config/motivators'
import { useMotivator } from '~/composables/useMotivator'

const { task, selectedMotivator, result, loading, error, canSubmit, submit } = useMotivator()
const selectedMotivatorPersona = computed(() => {
  if (!selectedMotivator.value) return undefined
  return getMotivatorById(selectedMotivator.value)
})
</script>

<template>
  <main class="min-h-screen bg-linear-to-b from-orange-50 to-white flex flex-col items-center px-4 py-10">
    <!-- Heading -->
    <h1 class="text-4xl font-bold text-orange-600 mb-8 tracking-tight">HuMotivatoren</h1>

    <!-- Face + speech bubble -->
    <div class="flex flex-col items-center mb-8">
      <img
        :src="selectedMotivatorPersona?.avatar ?? '/face.svg'"
        :alt="selectedMotivatorPersona?.name ?? 'Motivator karakter'"
        class="w-28 h-28 mb-3 rounded-full object-cover"
      />
      <div class="relative bg-white border-2 border-orange-300 rounded-2xl px-5 py-3 shadow text-center max-w-xs">
        <p class="text-gray-700 font-medium">Hva skal jeg motivere deg til idag? 🚀</p>
        <span class="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-orange-300 rotate-45" />
      </div>
    </div>

    <!-- Task input -->
    <textarea
      v-model="task"
      placeholder="Beskriv hva du skal gjøre..."
      rows="3"
      class="w-full max-w-md rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none p-3 text-gray-800 resize-none shadow-sm mb-6"
    />

    <!-- Motivator picker -->
    <MotivatorPicker v-model="selectedMotivator" class="mb-6" />

    <!-- Submit -->
    <button
      :disabled="!canSubmit || loading"
      class="px-8 py-3 rounded-full bg-orange-500 text-white font-bold text-lg shadow-md transition
             hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed"
      @click="submit"
    >
      {{ loading ? 'Laster...' : 'Motiver meg! 🚀' }}
    </button>

    <p v-if="error" class="mt-4 max-w-md rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ error }}
    </p>

    <!-- Result card -->
    <MotivatorCard v-if="result" :data="result" :motivator="selectedMotivatorPersona" class="mt-10 w-full max-w-md" />
  </main>
</template>
