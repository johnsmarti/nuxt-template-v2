<template>
  <div class="container mx-auto px-4">
    <div class="rounded-lg bg-white p-6 shadow-sm">
      <InputOverText
        :OverActive="true"
        label="Nome da Eleição *"
        name="name"
        id="election-name"
        placeholder="Ex: Eleição para presidente da assembleia 2024"
      />
      <FloatTextarea
        :OverActive="true"
        label="Descrição da Eleição *"
        name="description"
        id="election-description"
        placeholder="Ex: Eleição para presidente da assembleia 2024"
      />
      <DatetimeOver
        :OverActive="true"
        label="Data de início *"
        name="dataInicio"
        id="election-dataInicio"
        placeholder="Ex: 2024-01-01 00:00:00"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import InputOverText from "@/volt/InputOverText.vue";
import FloatTextarea from "@/volt/FloatTextarea.vue";
import DatetimeOver from "@/volt/DatetimeOver.vue";
</script>
