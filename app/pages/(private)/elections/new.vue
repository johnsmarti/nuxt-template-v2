<template>
  <div class="container mx-auto px-4">
    <div class="rounded-lg bg-white p-6 shadow-sm">
      <InputOverText
        :overActive="true"
        label="Nome da Eleição *"
        name="name"
        id="election-name"
        placeholder="Ex: Eleição para presidente da assembleia 2024"
      />
      <FloatTextarea
        :overActive="true"
        label="Descrição da Eleição *"
        name="description"
        id="election-description"
        placeholder="Ex: Eleição para presidente da assembleia 2024"
      />
      <DatetimeOver
        :overActive="true"
        label="Data de início *"
        name="dataInicio"
        id="election-dataInicio"
        placeholder="Ex: 2024-01-01 00:00:00"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import FloatTextarea from "@/volt/FloatTextarea.vue";
import DatetimeOver from "~~/trash/DatetimeOver.vue";
import InputOverText from "~~/trash/InputOverText.vue";
</script>
