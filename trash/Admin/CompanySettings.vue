<template>
  <div>
    <!-- Cabeçalho do Painel Administrativo -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Painel Administrativo</h1>
      <p class="text-gray-600">Gerencie eleições, delegados, eleitores, cargos e candidatos</p>
    </div>

    <!-- Menu de navegação -->
    <div class="flex items-center space-x-6 bg-white rounded-lg p-3 mb-8 shadow-sm">
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
    <div class="bg-blue-50 rounded-lg p-6 mb-8">
      <div class="flex justify-between items-center">
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
      <div class="flex mt-6 space-x-6">
        <button class="flex items-center space-x-2">
          <span class="i-lucide-pie-chart"></span>
          <span>Visão Geral</span>
        </button>
        <button class="flex items-center space-x-2">
          <span class="i-lucide-credit-card"></span>
          <span>Assinatura</span>
        </button>
        <button class="flex items-center space-x-2 bg-white px-3 py-2 rounded-md shadow-sm">
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
    <div class="bg-white rounded-lg p-6 mb-8 shadow-sm">
      <div class="flex items-center mb-4">
        <span class="i-lucide-building mr-2"></span>
        <h3 class="text-xl font-bold">Perfil da Empresa</h3>
      </div>
      <p class="text-gray-600 mb-6">Informações básicas da sua organização</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Nome da Empresa -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
          <VoltInputText v-model="companyName" class="w-full" />
        </div>

        <!-- CNPJ -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
          <VoltInputText v-model="cnpj" class="w-full" />
        </div>
      </div>

      <!-- Descrição -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea 
          v-model="description" 
          rows="4" 
          class="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <!-- Segmento -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Segmento</label>
        <VoltSelect v-model="segment" :options="segmentOptions" optionLabel="name" class="w-full" />
      </div>
    </div>

    <!-- Informações de Contato -->
    <div class="bg-white rounded-lg p-6 shadow-sm">
      <div class="flex items-center mb-4">
        <span class="i-lucide-phone mr-2"></span>
        <h3 class="text-xl font-bold">Informações de Contato</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dados da empresa
const companyName = ref('Empresa Exemplo LTDA');
const cnpj = ref('12.345.678/0001-99');
const description = ref('Empresa especializada em soluções eleitorais digitais');
const segment = ref(null);

// Opções de segmento
const segmentOptions = ref([
  { name: 'Tecnologia', code: 'tech' },
  { name: 'Educação', code: 'edu' },
  { name: 'Saúde', code: 'health' },
  { name: 'Finanças', code: 'finance' },
  { name: 'Outros', code: 'other' }
]);
</script>