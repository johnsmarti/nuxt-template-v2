<template>
  <div
    class="flex w-full transform flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:border-gray-300 hover:shadow-lg"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-medium text-gray-500">
        {{ title }}
      </h3>
      <slot name="icon"></slot>
    </div>

    <!-- Valor -->
    <div class="mt-3">
      <p class="text-2xl font-bold text-gray-900">
        {{ value }}
      </p>
      <p class="text-xs text-gray-500">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
  subtitle?: string;
}>();
</script>
