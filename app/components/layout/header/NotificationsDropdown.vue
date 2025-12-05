<template>
  <div class="relative">
    <button @click="toggle" class="transition-opacity hover:opacity-80">
      <Icon name="lucide:bell" class="w-6 h-6" />
    </button>
    <transition name="fade">
      <div v-if="open" class="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-lg border border-gray-100">
        <div class="p-3 border-b font-semibold">Notificações</div>
        <ul class="max-h-64 overflow-auto">
          <li v-for="(n, i) in notifications" :key="i" class="p-3 text-sm hover:bg-gray-50 flex gap-2">
            <Icon :name="n.icon" class="w-4 h-4 text-blue-600 mt-[2px]" />
            <div class="flex-1">
              <div class="font-medium">{{ n.title }}</div>
              <div class="text-gray-600">{{ n.detail }}</div>
            </div>
          </li>
        </ul>
        <div class="p-3 text-sm text-blue-600 hover:underline">Ver todas</div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
function toggle() { open.value = !open.value }

const notifications = [
  { icon: 'lucide:info', title: 'Atualização', detail: 'Nova versão disponível.' },
  { icon: 'lucide:check-circle', title: 'Sucesso', detail: 'Operação concluída.' },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .15s ease
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0
}
</style>