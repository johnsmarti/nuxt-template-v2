<template>
  <div class="container mx-auto px-4">
    <div class="py-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Votação</h1>
      <span class="text-sm text-gray-500">1 de 2</span>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="rounded-2xl bg-white p-6 shadow">
        <h2 class="mb-3 text-lg font-semibold">Votação para: Presidente</h2>
        <div class="mb-4">
          <InputText v-model="number" label="Número do candidato:" placeholder="" />
        </div>

        <div class="grid grid-cols-3 gap-3">
          <ButtonSecondary v-for="n in digits" :key="n" :label="String(n)" @click="append(n)" />
          <ButtonSecondary label="Corrigir" class="col-span-3" @click="clear" />
        </div>

        <div class="mt-5 grid grid-cols-2 gap-3">
          <ButtonSecondary label="Votar em Branco" />
          <ButtonPrimary label="Anular Voto" class="!bg-yellow-500 !border-yellow-500" />
        </div>
      </div>

      <div class="rounded-2xl bg-white p-6 shadow min-h-[280px] flex items-center justify-center text-gray-500 text-sm">
        Digite o número do candidato para visualizar as informações
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from '@/components/volt/InputText.vue'
import ButtonPrimary from '@/components/volt/ButtonPrimary.vue'
import ButtonSecondary from '@/components/volt/ButtonSecondary.vue'
import { ref } from 'vue'

definePageMeta({ title: 'Votação', layout: 'default', middleware: 'auth' })

const number = ref('')
const digits = [1,2,3,4,5,6,7,8,9,0]
function append(n: number) { number.value = number.value + String(n) }
function clear() { number.value = '' }
</script>
