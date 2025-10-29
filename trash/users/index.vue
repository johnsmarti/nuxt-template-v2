<script setup lang="ts">
import { createColumnHelper, type ColumnDef } from "@tanstack/vue-table";
import DataTableGeneric from "~~/trash/DataTableQuery.vue";
import Calendar from "primevue/calendar";

const columns = [
  { header: "Nome", accessorKey: "name", filterOp: "contains", type: "text" },
  { header: "Email", accessorKey: "email", filterOp: "contains", type: "text" },
  {
    header: "Ativo",
    accessorKey: "is_active",
    filterOp: "eq",
    type: "checkbox",
    cell: (row: any) => (row.is_active ? "Sim" : "Não"),
  },
  {
    header: "Perfil",
    accessorKey: "role",
    filterOp: "eq",
    type: "select",
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
    ],
  },
];

const date = ref<Date>();
</script>

<template>
  <div class="p-4">
    <h1 class="mb-4 text-xl font-bold">Usuários</h1>
    <DataTableGeneric apiUrl="http://localhost:8000/api/v1/users/lazy/" :columns="columns" :rowsPerPage="10" />
  </div>
  <Calendar v-model="date" />
</template>
