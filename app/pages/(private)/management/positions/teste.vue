<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-7xl">
      <!-- Header Section -->
      <div class="mb-4 rounded-lg bg-white p-4 shadow-sm sm:mb-6 sm:p-6">
        <div class="mb-4 flex flex-col gap-4">
          <!-- Search Input -->
          <div class="relative w-full">
            <svg
              class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por título, descrição..."
              class="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="flex flex-wrap items-center gap-2 sm:gap-3">
            <!-- Novo Cargo Button -->
            <button
              class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 sm:flex-initial"
              @click="router.push('/management/positions/new')"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="hidden sm:inline">Novo Cargo</span>
              <span class="sm:hidden">Novo</span>
            </button>

            <!-- Filter Dropdown -->
            <div class="relative flex-1 sm:flex-initial">
              <button
                class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors hover:bg-gray-50 sm:px-4"
              >
                <span class="truncate text-gray-700">Todas eleições</span>
                <svg class="h-4 w-4 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <!-- Refresh Button -->
            <button class="cursor-pointer rounded-lg border border-gray-300 p-2 transition-colors hover:bg-gray-50">
              <svg class="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Result Count -->
        <div class="text-xs text-gray-600 sm:text-sm">
          {{ positions?.length }} cargo{{ positions?.length !== 1 ? "s" : "" }} encontrado{{
            positions?.length !== 1 ? "s" : ""
          }}
        </div>
      </div>
      <!-- Tabela Desktop como componente com ordenação -->
      <PositionsTable :items="positions ?? []" :loading="isLoading" @edit="editCargo" @remove="deleteCargo" />

      <!-- Cards Mobile/Tablet -->
      <div class="space-y-4 lg:hidden">
        <div
          v-for="cargo in positions"
          :key="cargo.id"
          class="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <!-- Header do Card -->
          <div class="mb-3 flex items-start justify-between">
            <div class="flex-1">
              <h3 class="mb-1 text-base font-semibold text-gray-900">{{ cargo.name }}</h3>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                {{ cargo.election.title }}
              </a>
            </div>
            <div class="ml-2 flex items-center gap-1">
              <button
                class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
                title="Editar"
                @click="editCargo(cargo)"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                class="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                title="Excluir"
                @click="deleteCargo(cargo)"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Descrição -->
          <p class="mb-3 text-sm text-gray-600">{{ cargo.description }}</p>

          <!-- Info Grid -->
          <div class="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
            <div>
              <span class="mb-1 block text-xs text-gray-500">Máx. Seleções</span>
              <span
                class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white"
              >
                {{ cargo.max_candidates }}
              </span>
            </div>
            <div>
              <span class="mb-1 block text-xs text-gray-500">Ordem</span>
              <span class="text-sm font-medium text-gray-900">{{ cargo.order_index }}</span>
            </div>
          </div>
        </div>

        <!-- Empty State Mobile -->
        <div v-if="positions" class="rounded-lg bg-white p-8 text-center shadow-sm">
          <svg class="mx-auto mb-3 h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p class="text-base text-gray-500">Nenhum cargo encontrado</p>
          <p class="mt-1 text-sm text-gray-400">Tente ajustar seus filtros de busca</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePositions } from "@/api/positions/queries";
import PositionsTable from "@/components/positions/PositionsTable.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

// Estado
const searchQuery = ref("");

const router = useRouter();
const { data: positions, isLoading } = usePositions();

// Métodos
const editCargo = (cargo) => {
  const id = cargo.uuid || cargo.id;
  if (!id) return;
  router.push(`/management/positions/${id}/edit`);
};

const deleteCargo = (cargo) => {
  if (confirm(`Deseja realmente excluir o cargo "${cargo.name}"?`)) {
    const index = positions.value.findIndex((c) => c.id === cargo.id);
    if (index > -1) {
      positions.value.splice(index, 1);
    }
  }
};
</script>
