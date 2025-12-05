<template>
  <div class="relative">
    <button @click="toggle" class="transition-opacity hover:opacity-80">
      <Icon name="lucide:user" class="w-6 h-6" />
    </button>
    <transition name="fade">
      <div v-if="open" class="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-100">
        <div class="p-3 border-b font-semibold">John</div>
        <ul>
          <li class="p-3 text-sm hover:bg-gray-50">Perfil</li>
          <li class="p-3 text-sm hover:bg-gray-50">Configurações</li>
          <li class="p-3 text-sm hover:bg-gray-50 text-red-600">Sair</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
function toggle() { open.value = !open.value }
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>