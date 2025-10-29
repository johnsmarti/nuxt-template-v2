<template>
  <header class="bg-[#0a2158] text-white relative">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-shield">
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
        <h1 class="text-xl font-bold">VoteSecure</h1>
      </div>

      <!-- Botão Hamburguer -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="lg:hidden focus:outline-none"
      >
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24"
          height="24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-menu">
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-x">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <!-- Menu desktop -->
      <div class="hidden lg:flex items-center space-x-6">
        <nav class="flex space-x-6">
          <a href="#" class="font-medium">Painel Admin</a>
          <a href="#" class="font-medium">Votar</a>
          <a href="#" class="font-medium">Resultados</a>
        </nav>
        <div class="flex items-center space-x-4">
          <div class="text-sm">Olá, <span class="font-medium">john</span></div>
          <button
            class="flex items-center space-x-1 px-2 py-1 rounded hover:bg-blue-900 transition-colors"
          >
            <span>Sair</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-log-out">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Dropdown Mobile -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="lg:hidden absolute top-full left-0 w-full bg-[#0a2158] border-t border-blue-800"
      >
        <nav class="flex flex-col px-4 py-3 space-y-2">
          <a href="#" class="font-medium">Painel Admin</a>
          <a href="#" class="font-medium">Votar</a>
          <a href="#" class="font-medium">Resultados</a>
        </nav>
        <div class="px-4 py-3 border-t border-blue-800">
          <div class="text-sm mb-2">Olá, <span class="font-medium">john</span></div>
          <button
            class="flex items-center space-x-1 px-2 py-1 rounded hover:bg-blue-900 transition-colors w-full"
          >
            <span>Sair</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-log-out">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";
const isMenuOpen = ref(false);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
