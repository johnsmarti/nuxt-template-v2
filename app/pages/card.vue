<template>
  <div class="max-w-7xl mx-auto">
    <!-- Primeira linha de cards -->
    <div class="flex flex-wrap items-center justify-center gap-6 mb-6">

      <CardElection title="Comitê de Ética" description="Votação interna para renovação do comitê" status="Agendada"
        dateText="02 – 05 Abr" />

      <CardElection title="Eleição Conselho 2025" description="Votação para escolha do conselho administrativo."
        status="Ativo" dateText="12 – 15 Mar" />

      <CardElection title="Eleição Diretoria Q3" description="Escolha dos diretores para o próximo trimestre"
        status="Agendada" dateText="18 Mar" />

      <CardElection title="Assembleia Anual" description="Rascunho inicial para votação anual dos membros..."
        status="Rascunho" dateText="A definir" />
    </div>
  </div>

</template>

<script setup>
import CardElection from "@/components/CardElection.vue";
</script>
