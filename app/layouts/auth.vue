<template>
  <div class="flex min-h-screen">
    <!-- Lado esquerdo -->
    <div
      class="hidden w-1/2 flex-col justify-center bg-gradient-to-b from-blue-600 to-blue-800 px-16 text-white lg:flex"
    >
      <!-- Slot para conteúdo customizado à esquerda -->
      <slot name="left">
        <!-- Conteúdo padrão -->
        <div class="mb-8 flex items-center space-x-2">
          <i class="pi pi-shield text-3xl"></i>
          <span class="text-2xl font-semibold">VoteSecure</span>
        </div>

        <div>
          <h1 class="mb-4 text-3xl leading-snug font-bold">
            Bem-vindo ao seu Portal<br />de Votação e Compatibilidade
          </h1>
          <p class="text-white/90">
            Acesse sua conta de eleitor de forma rápida e segura. Participe das eleições da sua organização com total
            transparência e confiabilidade.
          </p>
        </div>
      </slot>
    </div>

    <!-- Lado direito -->
    <div class="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
      <!-- Slot para conteúdo customizado à direita -->
      <slot name="right">
        <slot />
      </slot>
    </div>
  </div>
</template>

<script setup>
// Nenhuma lógica adicional necessária aqui
</script>
