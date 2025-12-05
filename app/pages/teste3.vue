<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 class="text-xl font-semibold text-gray-900">Resultados oficiais da votação</h1>
          </div>
          <select
            class="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Eleições para Presidente 2025</option>
          </select>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-blue-50 rounded-xl p-5">
            <div class="text-sm text-gray-600 mb-2">Total de eleitores</div>
            <div class="text-3xl font-bold text-blue-600">{{ electionData.totalEleitores }}</div>
          </div>
          <div class="bg-amber-50 rounded-xl p-5">
            <div class="text-sm text-gray-600 mb-2">Votos computados</div>
            <div class="text-3xl font-bold text-amber-600">{{ electionData.votosComputados }}</div>
          </div>
          <div class="bg-cyan-50 rounded-xl p-5">
            <div class="text-sm text-gray-600 mb-2">Participação</div>
            <div class="text-3xl font-bold text-cyan-600">{{ electionData.participacao }}%</div>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="bg-white rounded-2xl shadow-sm p-6">
        <!-- Tabs -->
        <div class="flex gap-2 mb-8 border-b border-gray-200">
          <button @click="selectedTab = 'presidente'" :class="[
            'px-4 py-3 text-sm font-medium transition-colors',
            selectedTab === 'presidente'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          ]">
            <span class="inline-flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              Presidente
            </span>
          </button>
          <button @click="selectedTab = 'conselheiro'" :class="[
            'px-4 py-3 text-sm font-medium transition-colors',
            selectedTab === 'conselheiro'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          ]">
            <span class="inline-flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Conselheiro
            </span>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin">
          </div>
          <p class="mt-4 text-gray-600">Carregando resultados...</p>
        </div>

        <!-- Candidates List -->
        <div v-else class="space-y-6">
          <div v-for="(candidato, index) in candidatosOrdenados" :key="candidato.id"
            class="border-b border-gray-100 pb-6 last:border-0">
            <div class="flex items-start gap-4">
              <!-- Avatar -->
              <img :src="candidato.foto" :alt="candidato.nome"
                class="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100" />

              <!-- Candidate Info -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ candidato.numero }} - {{ candidato.nome }}
                    </h3>
                    <p class="text-sm text-gray-600">{{ candidato.partido }}</p>
                    <span :class="[
                      'inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium',
                      getStatusColor(candidato.status)
                    ]">
                      {{ candidato.status }}
                    </span>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-gray-900">{{ calcularPorcentagem(candidato.votos) }}%</div>
                  </div>
                </div>

                <!-- Vote Count and Bar -->
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-700 font-medium">{{ candidato.votos }} votos</span>
                    <span v-if="calcularDiferenca(index)" class="text-gray-500">
                      Vantagem de {{ calcularDiferenca(index) }} votos sobre o {{ index === 1 ? 'terceiro' : 'próximo'
                      }} colocado
                    </span>
                  </div>

                  <!-- Progress Bar -->
                  <div class="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div :class="['h-full rounded-full transition-all duration-500', getBarColor(index)]"
                      :style="{ width: calcularPorcentagem(candidato.votos) + '%' }"></div>
                  </div>

                  <div v-if="index < candidatosOrdenados.length - 1" class="text-xs text-gray-500">
                    --
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const selectedTab = ref('presidente');
const isLoading = ref(true);

const electionData = ref({
  totalEleitores: 250,
  votosComputados: 250,
  participacao: 100,
  candidatos: []
});

// Simular carregamento de dados
onMounted(async () => {
  // Simulando chamada API
  await new Promise(resolve => setTimeout(resolve, 800));

  electionData.value.candidatos = [
    {
      id: 1,
      numero: '123',
      nome: 'João Silva',
      partido: 'Partido A',
      votos: 200,
      status: 'Eleito',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      numero: '13',
      nome: 'Ana Souza',
      partido: 'Partido B',
      votos: 30,
      status: 'Segundo Colocado',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    },
    {
      id: 3,
      numero: '22',
      nome: 'Beatriz',
      partido: 'Partido PTDF',
      votos: 20,
      status: 'Terceiro Colocado',
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'
    }
  ];

  isLoading.value = false;
});

const candidatosOrdenados = computed(() => {
  return [...electionData.value.candidatos].sort((a, b) => b.votos - a.votos);
});

const calcularPorcentagem = (votos) => {
  return ((votos / electionData.value.votosComputados) * 100).toFixed(0);
};

const calcularDiferenca = (index) => {
  if (index === 0) return null;
  const candidatos = candidatosOrdenados.value;
  return candidatos[index - 1].votos - candidatos[index].votos;
};

const getStatusColor = (status) => {
  if (status === 'Eleito') return 'bg-cyan-400 text-cyan-900';
  if (status === 'Segundo Colocado') return 'bg-purple-100 text-purple-700';
  return 'bg-blue-100 text-blue-700';
};

const getBarColor = (index) => {
  if (index === 0) return 'bg-cyan-400';
  if (index === 1) return 'bg-orange-400';
  return 'bg-pink-500';
};
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
