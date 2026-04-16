<script setup lang="ts">
import type { Motivator } from '~/config/motivators'

const props = defineProps<{
  motivators: Motivator[]
  modelValue: Motivator | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Motivator | null]
}>()

function select(motivator: Motivator) {
  emit('update:modelValue', motivator)
}
</script>

<template>
  <div class="w-full max-w-md">
    <p class="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Velg din motivator</p>
    <div class="flex flex-wrap gap-3 justify-center">
      <button
        v-for="m in motivators"
        :key="m.id"
        class="flex min-w-30 flex-col items-center rounded-2xl border-2 px-5 py-4 shadow-sm transition cursor-pointer"
        :class="modelValue?.id === m.id
          ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-300'
          : 'border-gray-200 bg-white hover:border-orange-300'"
        @click="select(m)"
      >
        <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl mb-2">
          🧑
        </div>
        <span class="font-semibold text-gray-800 text-sm">{{ m.name }}</span>
        <span v-if="m.description" class="text-xs text-gray-400 mt-1 text-center">{{ m.description }}</span>
      </button>
    </div>
  </div>
</template>
