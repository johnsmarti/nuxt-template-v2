<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <LayoutSidebar class="hidden md:block" />

    <!-- Main -->
    <div class="flex flex-1 flex-col overflow-y-auto">
      <LayoutHeader />
      <main class="space-y-10 p-10">
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from "@/components/layout/Header.vue";
import LayoutSidebar from "@/components/layout/Sidebar.vue";
</script>
