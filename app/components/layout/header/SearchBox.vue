<template>
  <form class="w-[339px] min-w-60 rounded text-[15px] text-[rgba(139,163,203,1)]">
    <div class="flex items-stretch gap-[15px] rounded-[40px] bg-[rgba(245,247,250,1)] px-[25px] py-[15px] max-md:px-5">
      <Icon name="lucide:search" class="w-5 h-5" />
      <input type="text" :placeholder="placeholder" class="w-[250px] bg-transparent outline-none" />
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps<{ placeholder?: string }>()
</script>