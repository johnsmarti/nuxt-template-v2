<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import DataTable from '@/volt/DataTable.vue'
import Column from 'primevue/column'
import InputText from '@/volt/InputText.vue'
import Button from '@/volt/ButtonPrimary.vue'


interface ColumnDef {
  header: string
  accessorKey: string
  cell?: (row: any) => string | number | boolean
}

const props = defineProps<{
  apiUrl: string
  columns: ColumnDef[]
  rowsPerPage?: number
}>()

const rowsPerPage = props.rowsPerPage ?? 10
const page = ref(1)
const totalRecords = ref(0)
const data = ref<any[]>([])
const loading = ref(false)

// Seleção
const selectedRows = ref<any[]>([])

// Filtros
const columnFilters = ref<Record<string, { op: string; value: any }>>({})
const globalFilter = ref('')

// Ordenação
const sortBy = ref<{ field: string; direction: string }[]>([])

const buildUrl = () => {
  const params = new URLSearchParams()
  params.append('page', String(page.value))
  params.append('size', String(rowsPerPage))
  if (globalFilter.value) {
    params.append('global_filter', globalFilter.value)
  }
  return `${props.apiUrl}?${params.toString()}`
}

// Buscar dados
const fetchData = async () => {
  loading.value = true
  try {
    const body = {
      filters: columnFilters.value,
      sort_by: sortBy.value
    }

    const res = await $fetch(buildUrl(), {
      method: 'POST',
      body
    })

    data.value = res.items
    totalRecords.value = res.total
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

// Recarregar quando filtros, paginação ou sort mudar
watch([page, columnFilters, globalFilter, sortBy], fetchData)

// Eventos da tabela
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
  page.value = 1 // resetar paginação ao filtrar
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
}
</script>

<template>
  <div>
    <!-- Filtro Global -->
    <div class="mb-2 flex items-center gap-2">
      <InputText v-model="globalFilter" placeholder="Busca global..." class="p-inputtext-sm" />
      <Button label="Limpar" size="small" @click="clearFilters" />
    </div>

    <DataTable
      :value="data"
      :lazy="true"
      :loading="loading"
      :paginator="true"
      :rows="rowsPerPage"
      :totalRecords="totalRecords"
      dataKey="uuid"
      selectionMode="checkbox"
      v-model:selection="selectedRows"
      @page="onPage"
      @sort="onSort"
      sortMode="single"
      :rowsPerPageOptions="[10, 20, 50]"
    >
      <!-- Coluna Checkbox -->
      <Column selectionMode="multiple" headerStyle="width: 3rem" />

      <!-- Colunas dinâmicas -->
      <template v-for="col in props.columns" :key="col.accessorKey">
        <Column
          :field="col.accessorKey"
          :header="col.header"
          sortable
          filter
        >
          <template #body="slotProps">
            {{ col.cell ? col.cell(slotProps.data) : slotProps.data[col.accessorKey] }}
          </template>
          <template #filter>
            <InputText
              placeholder="Filtrar..."
              @input="onColumnFilter(col.accessorKey, $event.target.value)"
            />
          </template>
        </Column>
      </template>
    </DataTable>

    <!-- Exemplo debug -->
    <pre class="mt-4 bg-gray-100 p-2 rounded">
        Selecionados: {{ selectedRows }}
    </pre>
  </div>
</template>