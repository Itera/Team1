<template>
  <div class="flex gap-4 justify-center">
    <button
      v-for="m in motivators"
      :key="m.id"
      :class="[
        'flex flex-col items-center p-4 rounded-xl border-2 transition',
        modelValue === m.id
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300'
          : 'border-gray-200 hover:border-gray-400'
      ]"
      @click="$emit('update:modelValue', m.id)"
    >
      <img
        :src="m.avatar"
        :alt="m.name"
        class="w-24 h-24 rounded-full object-cover mb-2"
      />
      <span class="font-semibold text-sm">{{ m.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { motivatorPersonas } from '~/config/motivators'

defineProps<{ modelValue: string | null }>()
defineEmits<{ 'update:modelValue': [id: string] }>()

const motivators = motivatorPersonas
</script>
