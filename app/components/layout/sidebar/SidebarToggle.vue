<template>
  <button @click="$emit('toggle')" class="fixed top-4 left-4 z-50 rounded-lg bg-[#0d6efd] p-3 text-white shadow-lg transition-all duration-300 hover:bg-[#0356d6] md:hidden">
    <i class="pi pi-bars text-xl"></i>
  </button>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'toggle'): void }>()
</script>