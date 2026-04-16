<script setup lang="ts">
import type { MotivatorPersona } from '~/config/motivators'
import type { MotivateResponse } from '~/composables/useMotivator'

defineProps<{
  data: MotivateResponse
  motivator?: MotivatorPersona
}>()
</script>

<template>
  <div class="bg-white rounded-3xl border-2 border-orange-200 shadow-lg p-6 space-y-5">
    <div v-if="motivator?.avatar" class="flex items-center gap-3">
      <img :src="motivator.avatar" :alt="motivator.name" class="w-12 h-12 rounded-full object-cover" />
      <p class="text-sm font-semibold text-gray-700">{{ motivator.name }}</p>
    </div>

    <!-- Motivational message -->
    <div class="bg-orange-50 rounded-xl p-4">
      <p class="text-orange-700 font-semibold text-lg leading-snug">{{ data.motivationalMessage }}</p>
    </div>

    <!-- Fun fact -->
    <div v-if="data.funFact" class="flex gap-3">
      <span class="text-2xl">🧠</span>
      <p class="text-gray-600 text-sm">{{ data.funFact }}</p>
    </div>

    <!-- Tip -->
    <div v-if="data.tip" class="flex gap-3">
      <span class="text-2xl">💡</span>
      <p class="text-gray-600 text-sm">{{ data.tip }}</p>
    </div>

    <!-- Quote -->
    <div v-if="data.quote" class="border-l-4 border-orange-300 pl-4 italic text-gray-500 text-sm">
      <p>"{{ data.quote.content }}"</p>
      <p class="mt-1 font-semibold not-italic text-gray-600">— {{ data.quote.author }}</p>
    </div>

    <!-- GIF -->
    <div v-if="data.gifUrl" class="rounded-xl overflow-hidden">
      <img :src="data.gifUrl" alt="Motiverende GIF" class="w-full object-cover" />
    </div>
  </div>
</template>
