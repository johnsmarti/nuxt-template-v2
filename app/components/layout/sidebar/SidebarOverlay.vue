<template>
  <div v-if="open" @click="$emit('close')" class="bg-opacity-50 fixed inset-0 z-40 bg-black transition-opacity duration-300 md:hidden"></div>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ (e: 'close'): void }>()
</script>