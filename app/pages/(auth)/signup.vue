<template>
  <NuxtLayout name="auth">
    <!-- Slot para o lado esquerdo -->
    <template #left>
      <div class="flex flex-col items-center justify-center text-center">
        <h2 class="mb-4 text-4xl font-bold">Bem-vindo de volta!</h2>
        <p>Entre para participar das votações.</p>
      </div>
    </template>

    <!-- Slot para o lado direito -->
    <template #right>
      <div class="w-full max-w-md">
        <h3 class="mb-6 text-2xl font-semibold">Login</h3>
        <form class="space-y-4">
          <button class="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">Entrar</button>
        </form>
      </div>
    </template>
  </NuxtLayout>
</template>
<script setup>
definePageMeta({ layout: "auth" });
</script>
