<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import DataTable from '@/volt/DataTable.vue'
import Column from 'primevue/column'
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/ButtonPrimary.vue'



// Tipos
interface ColumnDef {
  header: string
  accessorKey: string
  cell?: (row: unknown) => string | number | boolean
}

const props = defineProps<{
  apiUrl: string
  columns: ColumnDef[]
  rowsPerPage?: number
}>()

// Estado
const rowsPerPage = ref(props.rowsPerPage ?? 10)
const page = ref(1)
const sortBy = ref<{ field: string; direction: string }[]>([])
const columnFilters = ref<Record<string, { op: string; value: any }>>({})
const globalFilter = ref('')
const selectedRows = ref<any[]>([])

// URL + Body builder
const buildUrl = () => {
  const params = new URLSearchParams()
  params.append('page', String(page.value))
  params.append('size', String(rowsPerPage.value))
  if (globalFilter.value) {
    params.append('global_filter', globalFilter.value)
  }
  return `${props.apiUrl}?${params.toString()}`
}

const buildBody = () => ({
  filters: columnFilters.value,
  sort_by: sortBy.value
})

// Query
const { data, isFetching, refetch } = useQuery({
  queryKey: computed(() => [
    'datatable',
    page.value,
    rowsPerPage.value,
    globalFilter.value,
    { ...columnFilters.value },
    sortBy.value
  ]),
  queryFn: async () => {
    const res = await $fetch(buildUrl(), {
      method: 'POST',
      body: buildBody()
    })
    return res
  },
  keepPreviousData: true
})

// Handlers
const onPage = (event: any) => {
  page.value = event.page + 1
}

const onSort = (event: any) => {
  sortBy.value = []
  if (event.sortField) {
    sortBy.value.push({
      field: event.sortField,
      direction: event.sortOrder === 1 ? 'asc' : 'desc'
    })
  }
}

const onColumnFilter = (field: string, value: any) => {
  page.value = 1
  if (value) {
    columnFilters.value[field] = { op: 'contains', value }
  } else {
    delete columnFilters.value[field]
  }
}

const clearFilters = () => {
  globalFilter.value = ''
  columnFilters.value = {}
  page.value = 1
  refetch()
}
</script>

<template>
  <div>
    <!-- Filtro Global -->
    <div class="mb-2 flex items-center gap-2">
      <InputText v-model="globalFilter" placeholder="Busca global..." class="p-inputtext-sm" />
      <Button label="Limpar" size="small" @click="clearFilters" />
    </div>

    <DataTable :value="data?.items || []" :lazy="true" :loading="isFetching" :paginator="true" :rows="rowsPerPage"
      :totalRecords="data?.total || 0" dataKey="uuid" selectionMode="checkbox" v-model:selection="selectedRows"
      @page="onPage" @sort="onSort" sortMode="single" :rowsPerPageOptions="[10, 20, 50]">
      <!-- Coluna Checkbox -->
      <Column selectionMode="multiple" headerStyle="width: 3rem" />

      <!-- Colunas dinâmicas -->
      <template v-for="col in props.columns" :key="col.accessorKey">
        <Column :field="col.accessorKey" :header="col.header" sortable filter>
          <template #body="slotProps">
            {{ col.cell ? col.cell(slotProps.data) : slotProps.data[col.accessorKey] }}
          </template>
          <template #filter>
            <InputText placeholder="Filtrar..." @input="onColumnFilter(col.accessorKey, $event.target.value)" />
          </template>
        </Column>
      </template>
    </DataTable>

    <!-- Debug -->
    <pre class="mt-4 bg-gray-100 p-2 rounded">
  Selecionados: {{ selectedRows }}
</pre>
  </div>
</template>