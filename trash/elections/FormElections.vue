<template>
  <div class="m-5 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3 class="text-xl font-semibold tracking-tight">Nova Eleição</h3>
    </div>
    <Form class="elections-form">
      <div class="flex flex-col gap-1">
        <Label
          class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="username"
          >Título da eleição *</Label
        >
        <InputText name="username" type="text" placeholder="Username" fluid />
      </div>
      <div class="flex flex-col gap-1">
        <Label
          class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="username"
          >Título da eleição *</Label
        >
        <InputText name="username" type="text" placeholder="Username" fluid />
      </div>
      <div class="flex flex-col gap-1">
        <Label
          class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="username"
          >Título da eleição *</Label
        >
        <InputText name="username" type="text" placeholder="Username" fluid />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form } from "@primevue/forms";
import InputText from "@/volt/InputText.vue";
</script>
<style scoped>
.elections-form {
  font-family:
    ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>
