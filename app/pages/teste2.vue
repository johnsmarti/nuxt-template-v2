<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
        <div class="flex flex-col gap-4 mb-4">
          <!-- Search Input -->
          <div class="relative w-full">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Buscar por título, descrição..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" />
          </div>

          <div class="flex flex-wrap items-center gap-2 sm:gap-3">
            <!-- Novo Cargo Button -->
            <button
              class="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex-1 sm:flex-initial">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="hidden sm:inline">Novo Cargo</span>
              <span class="sm:hidden">Novo</span>
            </button>

            <!-- Filter Dropdown -->
            <div class="relative flex-1 sm:flex-initial">
              <button
                class="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <span class="text-gray-700 truncate">Todas eleições</span>
                <svg class="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <!-- Refresh Button -->
            <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Result Count -->
        <div class="text-xs sm:text-sm text-gray-600">
          {{ filteredCargos.length }} cargo{{ filteredCargos.length !== 1 ? 's' : '' }} encontrado{{
            filteredCargos.length !== 1 ? 's' : '' }}
        </div>
      </div>

      <!-- Table Desktop -->
      <div class="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-blue-50 border-b border-blue-100">
                <th class="text-left px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm font-semibold text-gray-700">Cargo
                </th>
                <th class="text-left px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm font-semibold text-gray-700">Eleição
                </th>
                <th class="text-left px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm font-semibold text-gray-700">Máx.
                  Seleções</th>
                <th class="text-left px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm font-semibold text-gray-700">Ordem
                </th>
                <th class="text-left px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm font-semibold text-gray-700">Descrição
                </th>
                <th class="text-left px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm font-semibold text-gray-700">Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cargo in filteredCargos" :key="cargo.id"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm text-gray-900 font-medium">
                  {{ cargo.nome }}
                </td>
                <td class="px-4 xl:px-6 py-3 xl:py-4">
                  <a href="#" class="text-xs xl:text-sm text-blue-600 hover:text-blue-700 hover:underline">
                    {{ cargo.eleicao }}
                  </a>
                </td>
                <td class="px-4 xl:px-6 py-3 xl:py-4">
                  <span
                    class="inline-flex items-center justify-center w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-blue-600 text-white text-xs xl:text-sm font-semibold">
                    {{ cargo.maxSelecoes }}
                  </span>
                </td>
                <td class="px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm text-gray-900">
                  {{ cargo.ordem }}
                </td>
                <td class="px-4 xl:px-6 py-3 xl:py-4 text-xs xl:text-sm text-gray-600">
                  {{ cargo.descricao }}
                </td>
                <td class="px-4 xl:px-6 py-3 xl:py-4">
                  <div class="flex items-center gap-1 xl:gap-2">
                    <button @click="editCargo(cargo)"
                      class="p-1.5 xl:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                      <svg class="w-4 h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="deleteCargo(cargo)"
                      class="p-1.5 xl:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                      <svg class="w-4 h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCargos.length === 0" class="py-12 text-center">
          <svg class="mx-auto w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-4" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p class="text-gray-500 text-base sm:text-lg">Nenhum cargo encontrado</p>
          <p class="text-gray-400 text-xs sm:text-sm mt-2">Tente ajustar seus filtros de busca</p>
        </div>
      </div>

      <!-- Cards Mobile/Tablet -->
      <div class="lg:hidden space-y-4">
        <div v-for="cargo in filteredCargos" :key="cargo.id"
          class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
          <!-- Header do Card -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h3 class="text-base font-semibold text-gray-900 mb-1">{{ cargo.nome }}</h3>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                {{ cargo.eleicao }}
              </a>
            </div>
            <div class="flex items-center gap-1 ml-2">
              <button @click="editCargo(cargo)" class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Editar">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button @click="deleteCargo(cargo)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Excluir">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Descrição -->
          <p class="text-sm text-gray-600 mb-3">{{ cargo.descricao }}</p>

          <!-- Info Grid -->
          <div class="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
            <div>
              <span class="text-xs text-gray-500 block mb-1">Máx. Seleções</span>
              <span
                class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold">
                {{ cargo.maxSelecoes }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500 block mb-1">Ordem</span>
              <span class="text-sm font-medium text-gray-900">{{ cargo.ordem }}</span>
            </div>
          </div>
        </div>

        <!-- Empty State Mobile -->
        <div v-if="filteredCargos.length === 0" class="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg class="mx-auto w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p class="text-gray-500 text-base">Nenhum cargo encontrado</p>
          <p class="text-gray-400 text-sm mt-1">Tente ajustar seus filtros de busca</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

// Estado
const searchQuery = ref('');

// Dados mockados
const cargos = ref([
  {
    id: 1,
    nome: 'Presidente',
    eleicao: 'Eleição Conselho 2025',
    maxSelecoes: 1,
    ordem: 1,
    descricao: 'Cargo máximo do executivo.'
  },
  {
    id: 2,
    nome: 'Governador',
    eleicao: 'Comitê de Ética',
    maxSelecoes: 5,
    ordem: 16,
    descricao: 'Lidera o estado e administra suas políticas.'
  },
  {
    id: 3,
    nome: 'Diretor',
    eleicao: 'Eleição Diretoria Q3',
    maxSelecoes: 2,
    ordem: 5,
    descricao: 'Responsável pela gestão do município.'
  }
]);

// Computed
const filteredCargos = computed(() => {
  if (!searchQuery.value) return cargos.value;

  const query = searchQuery.value.toLowerCase();
  return cargos.value.filter(cargo =>
    cargo.nome.toLowerCase().includes(query) ||
    cargo.descricao.toLowerCase().includes(query) ||
    cargo.eleicao.toLowerCase().includes(query)
  );
});

// Métodos
const editCargo = (cargo) => {
  console.log('Editando cargo:', cargo);
  alert(`Editando: ${cargo.nome}`);
};

const deleteCargo = (cargo) => {
  if (confirm(`Deseja realmente excluir o cargo "${cargo.nome}"?`)) {
    const index = cargos.value.findIndex(c => c.id === cargo.id);
    if (index > -1) {
      cargos.value.splice(index, 1);
    }
  }
};
</script>