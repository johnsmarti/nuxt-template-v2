<template>
  <div class="flex min-h-screen">
    <!-- Lado esquerdo -->
    <div
      class="hidden w-1/2 flex-col justify-center bg-gradient-to-b from-blue-600 to-blue-800 px-16 text-white lg:flex"
    >
      <!-- Slot para conteúdo customizado à esquerda -->
      <slot name="left"></slot>
    </div>

    <!-- Lado direito -->
    <div class="lg:w-1/2">
      <slot name="top" class="h-[10vh]"></slot>
      <!-- Slot para conteúdo customizado à direita -->
      <div class="flex w-full flex-col items-center justify-center p-6 h-[90vh]">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
