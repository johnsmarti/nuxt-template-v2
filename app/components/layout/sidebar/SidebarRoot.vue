<template>
  <div>
    <SidebarToggle @toggle="toggleSidebar" />
    <SidebarOverlay :open="isOpen" @close="closeSidebar" />
    <aside :class="[
      'z-50 flex h-screen w-56 flex-col justify-between bg-gradient-to-b from-[#0d6efd] to-[#0356d6] text-white transition-transform duration-300 ease-in-out',
      'fixed md:relative',
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
    ]">
      <div>
        <div class="p-6 text-2xl font-bold">
          EPIC<br /><span class="text-sm">urna digital</span>
        </div>
        <SidebarMenu :items="items" />
      </div>
      <SidebarBottom />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SidebarToggle from './SidebarToggle.vue'
import SidebarOverlay from './SidebarOverlay.vue'
import SidebarMenu from './SidebarMenu.vue'
import SidebarBottom from './SidebarBottom.vue'
import { menuItems as items } from './menuItems'

const isOpen = ref(false)
function toggleSidebar() { isOpen.value = !isOpen.value }
function closeSidebar() { isOpen.value = false }
</script>