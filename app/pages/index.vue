<template>
  <div class="container mx-auto px-4">
    <div class="py-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow">
        <h2 class="text-xl font-semibold">Bem-vindo</h2>
        <p class="mt-1 text-sm opacity-90">Gerencie suas eleições e configurações da plataforma</p>
        <div class="mt-4 flex gap-2">
          <ButtonSecondary label="Guia Rápido" />
          <ButtonSecondary label="Suporte" />
        </div>
      </div>

      <div class="rounded-2xl bg-white p-6 shadow md:col-span-2">
        <h3 class="mb-2 text-lg font-semibold">Status da Eleição</h3>
        <div class="mb-2 text-sm text-gray-600">Acompanhe as métricas principais do processo em tempo real.</div>
        <div class="mt-4">
          <div class="flex items-center justify-between text-sm">
            <span>Progresso da Votação</span>
            <span class="font-semibold">{{ progress }}%</span>
          </div>
          <div class="mt-2 h-3 w-full rounded bg-gray-200">
            <div class="h-3 rounded bg-blue-600" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="mt-3 flex gap-3 text-xs text-gray-600">
            <span>Registrados</span>
            <span>Restantes</span>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div class="rounded-md bg-pink-100 p-3 text-pink-700">Encerramento: {{ closing }}</div>
          <div class="rounded-md bg-green-100 p-3 text-green-700">Status: {{ status }}</div>
          <div class="rounded-md bg-indigo-100 p-3 text-indigo-700">Participação: {{ participation }}%</div>
          <div class="rounded-md bg-yellow-100 p-3 text-yellow-700">Votos: {{ votes }}</div>
        </div>
      </div>
    </div>

    <div class="mt-4 grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl bg-white p-6 shadow">
        <h3 class="mb-2 text-lg font-semibold">Cargos em Votação</h3>
        <ul class="space-y-2 text-sm">
          <li class="flex items-center justify-between"><span>Presidente</span><ButtonSecondary label="Ver Detalhes" /></li>
          <li class="flex items-center justify-between"><span>Segurança</span><ButtonSecondary label="Ver Detalhes" /></li>
          <li class="flex items-center justify-between"><span>Comissão Fiscal</span><ButtonSecondary label="Ver Detalhes" /></li>
        </ul>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow">
        <h3 class="mb-2 text-lg font-semibold">Convide Eleitores</h3>
        <div class="flex items-center gap-2">
          <input class="w-full rounded border p-2 text-sm" readonly value="https://votesecure.app/votar/abc123" />
          <ButtonSecondary label="Copiar Link" />
        </div>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow">
        <h3 class="mb-2 text-lg font-semibold">Verificar Voto</h3>
        <p class="text-sm text-gray-600">Verifique o status usando seu protocolo único.</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ButtonSecondary from '@/components/volt/ButtonSecondary.vue'
definePageMeta({
  title: "Home",
  colorMode: "light",
  layout: "default",
  middleware: "auth",
});
const progress = 62
const closing = '0h 00m 00s'
const status = 'Em Andamento'
const participation = 62.0
const votes = '217 de 350'
</script>

<style>
/* Add any additional styles here */
</style>
