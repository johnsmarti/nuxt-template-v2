<template>
  <div class="hidden overflow-hidden rounded-lg bg-white shadow-sm lg:block">
    <VoltDataTable :value="items ?? []" data-key="id" :loading="loading" sort-mode="single" removable-sort>
      <Column field="name" header="Cargo" sortable />

      <Column header="Eleição" field="election.title" sortable>
        <template #body="{ data }">
          <a href="#" class="text-xs text-blue-600 hover:text-blue-700 hover:underline xl:text-sm">
            {{ data?.election?.title }}
          </a>
        </template>
      </Column>

      <Column field="max_candidates" header="Máx. Seleções" sortable>
        <template #body="{ data }">
          <span
            class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white xl:h-8 xl:w-8 xl:text-sm"
          >
            {{ data?.max_candidates }}
          </span>
        </template>
      </Column>

      <Column field="order_index" header="Ordem" sortable />

      <Column field="description" header="Descrição" />

      <Column header="Ações">
        <template #body="{ data }">
          <div class="flex items-center gap-1 xl:gap-2">
            <button
              class="cursor-pointer rounded-lg p-1.5 text-gray-600 transition-colors hover:bg-gray-100 xl:p-2"
              title="Editar"
              @click="$emit('edit', data)"
            >
              <svg class="h-4 w-4 xl:h-5 xl:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              class="cursor-pointer rounded-lg p-1.5 text-red-600 transition-colors hover:bg-red-50 xl:p-2"
              title="Excluir"
              @click="$emit('remove', data)"
            >
              <svg class="h-4 w-4 xl:h-5 xl:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </template>
      </Column>
    </VoltDataTable>
  </div>
</template>

<script setup>
import VoltDataTable from "@/components/volt/DataTable.vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["edit", "remove"]);
</script>
