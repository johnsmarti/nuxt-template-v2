<template>
  <div>
    <!-- Cabeçalho do Painel Administrativo -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Painel Administrativo</h1>
      <p class="text-gray-600">Gerencie eleições, delegados, eleitores, cargos e candidatos</p>
    </div>

    <!-- Menu de navegação -->
    <div class="mb-8 flex items-center space-x-6 rounded-lg bg-white p-3 shadow-sm">
      <NuxtLink to="/dashboard" class="flex items-center space-x-2">
        <span class="i-lucide-layout-dashboard"></span>
        <span>Dashboard</span>
      </NuxtLink>
      <NuxtLink to="/eleicoes" class="flex items-center space-x-2">
        <span class="i-lucide-vote"></span>
        <span>Eleições</span>
      </NuxtLink>
      <NuxtLink to="/cargos" class="flex items-center space-x-2">
        <span class="i-lucide-briefcase"></span>
        <span>Cargos</span>
      </NuxtLink>
      <NuxtLink to="/delegados" class="flex items-center space-x-2">
        <span class="i-lucide-user-check"></span>
        <span>Delegados</span>
      </NuxtLink>
      <NuxtLink to="/eleitores" class="flex items-center space-x-2">
        <span class="i-lucide-users"></span>
        <span>Eleitores</span>
      </NuxtLink>
      <NuxtLink to="/candidatos" class="flex items-center space-x-2">
        <span class="i-lucide-user-plus"></span>
        <span>Candidatos</span>
      </NuxtLink>
    </div>

    <!-- Seção de boas-vindas -->
    <div class="mb-8 rounded-lg bg-blue-50 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">Bem-vindo, john</h2>
          <p class="text-gray-600">Gerencie suas eleições e configurações da plataforma</p>
        </div>
        <div>
          <span class="flex items-center text-amber-600">
            <span class="i-lucide-crown mr-1"></span>
            Plano Premium
          </span>
        </div>
      </div>

      <!-- Abas de navegação -->
      <div class="mt-6 flex space-x-6">
        <button class="flex items-center space-x-2">
          <span class="i-lucide-pie-chart"></span>
          <span>Visão Geral</span>
        </button>
        <button class="flex items-center space-x-2">
          <span class="i-lucide-credit-card"></span>
          <span>Assinatura</span>
        </button>
        <button class="flex items-center space-x-2 rounded-md bg-white px-3 py-2 shadow-sm">
          <span class="i-lucide-building"></span>
          <span>Empresa</span>
        </button>
        <button class="flex items-center space-x-2">
          <span class="i-lucide-user"></span>
          <span>Pessoal</span>
        </button>
        <button class="flex items-center space-x-2">
          <span class="i-lucide-bar-chart"></span>
          <span>Analytics</span>
        </button>
      </div>
    </div>

    <!-- Perfil da Empresa -->
    <div class="mb-8 rounded-lg bg-white p-6 shadow-sm">
      <div class="mb-4 flex items-center">
        <span class="i-lucide-building mr-2"></span>
        <h3 class="text-xl font-bold">Perfil da Empresa</h3>
      </div>
      <p class="mb-6 text-gray-600">Informações básicas da sua organização</p>

      <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <!-- Nome da Empresa -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Nome da Empresa</label>
          <VoltInputText v-model="companyName" class="w-full" />
        </div>

        <!-- CNPJ -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">CNPJ</label>
          <VoltInputText v-model="cnpj" class="w-full" />
        </div>
      </div>

      <!-- Descrição -->
      <div class="mb-6">
        <label class="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          v-model="description"
          rows="4"
          class="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <!-- Segmento -->
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Segmento</label>
        <VoltSelect v-model="segment" :options="segmentOptions" optionLabel="name" class="w-full" />
      </div>
    </div>

    <!-- Informações de Contato -->
    <div class="rounded-lg bg-white p-6 shadow-sm">
      <div class="mb-4 flex items-center">
        <span class="i-lucide-phone mr-2"></span>
        <h3 class="text-xl font-bold">Informações de Contato</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Dados da empresa
const companyName = ref("Empresa Exemplo LTDA");
const cnpj = ref("12.345.678/0001-99");
const description = ref("Empresa especializada em soluções eleitorais digitais");
const segment = ref(null);

// Opções de segmento
const segmentOptions = ref([
  { name: "Tecnologia", code: "tech" },
  { name: "Educação", code: "edu" },
  { name: "Saúde", code: "health" },
  { name: "Finanças", code: "finance" },
  { name: "Outros", code: "other" },
]);
</script>
