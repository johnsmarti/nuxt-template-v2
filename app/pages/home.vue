<template>
  <div>
    <section class="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
      <div class="container mx-auto px-4 py-16 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h1 class="text-3xl md:text-5xl font-bold">A melhor plataforma de votação digital do Brasil.</h1>
          <p class="mt-3 text-sm md:text-base opacity-90">Seguro, rápido e compatível com os principais requisitos legais.</p>
          <div class="mt-6 flex gap-3">
            <ButtonPrimary label="Começar Agora" class="!bg-yellow-500 !border-yellow-500 text-black" />
            <ButtonSecondary label="Ver Planos" />
          </div>
        </div>
        <div class="flex justify-center">
          <div class="h-64 w-40 rounded-xl bg-white/10" />
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-12">
      <div class="grid gap-6 md:grid-cols-3">
        <div class="rounded-2xl bg-white p-6 shadow">
          <h3 class="text-lg font-semibold">Segurança Total</h3>
          <p class="mt-2 text-sm text-gray-600">Criptografia e controles de acesso reforçados.</p>
        </div>
        <div class="rounded-2xl bg-white p-6 shadow">
          <h3 class="text-lg font-semibold">Multiplas Etapas</h3>
          <p class="mt-2 text-sm text-gray-600">Fluxos flexíveis com autenticação de dois fatores.</p>
        </div>
        <div class="rounded-2xl bg-white p-6 shadow">
          <h3 class="text-lg font-semibold">LGPD</h3>
          <p class="mt-2 text-sm text-gray-600">Práticas alinhadas à legislação brasileira.</p>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-12">
      <div class="rounded-2xl bg-white p-6 shadow">
        <h3 class="text-lg font-semibold">Integração e Compatibilidade</h3>
        <p class="mt-2 text-sm text-gray-600">APIs modernas e documentação clara para integrar com seus sistemas.</p>
      </div>
    </section>

    <section class="container mx-auto px-4 py-12">
      <h3 class="mb-4 text-lg font-semibold">Soluções para Cada Necessidade</h3>
      <div class="grid gap-4 md:grid-cols-3">
        <div class="rounded-md border p-4">
          <div class="text-xl font-bold">Grátis</div>
          <ul class="mt-3 space-y-1 text-sm">
            <li>Até 100 eleitores</li>
            <li>1 eleição ativa</li>
            <li>Resultados em tempo real</li>
          </ul>
        </div>
        <div class="rounded-md border p-4">
          <div class="text-xl font-bold">R$299/mês</div>
          <ul class="mt-3 space-y-1 text-sm">
            <li>Até 500 eleitores</li>
            <li>5 eleições ativas</li>
            <li>Relatórios avançados</li>
          </ul>
        </div>
        <div class="rounded-md border p-4">
          <div class="text-xl font-bold">R$599/mês</div>
          <ul class="mt-3 space-y-1 text-sm">
            <li>Eleitores ilimitados</li>
            <li>Integração enterprise</li>
            <li>Suporte prioritário</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-12">
      <div class="rounded-2xl bg-blue-700 p-6 text-white">
        <h3 class="text-lg font-semibold">Projetos que Geram Impacto</h3>
        <p class="mt-2 text-sm opacity-90">Conheça casos reais de sucesso.</p>
        <ButtonSecondary label="Ver mais" class="mt-3" />
      </div>
    </section>

    <section class="container mx-auto px-4 py-12">
      <h3 class="text-lg font-semibold">Depoimentos de Clientes Satisfeitos</h3>
      <div class="mt-3 grid gap-3 md:grid-cols-3">
        <div class="rounded-2xl bg-white p-4 shadow">
          <div class="text-sm">“Plataforma fácil de usar e com excelente segurança.”</div>
        </div>
        <div class="rounded-2xl bg-white p-4 shadow">
          <div class="text-sm">“Suporte incrível e resultados confiáveis.”</div>
        </div>
        <div class="rounded-2xl bg-white p-4 shadow">
          <div class="text-sm">“Integração simples com nossos sistemas.”</div>
        </div>
      </div>
    </section>

    <section class="bg-slate-900 text-white">
      <div class="container mx-auto px-4 py-12 text-center">
        <h3 class="text-xl font-semibold">Sua eleição segura começa agora</h3>
        <div class="mt-3 flex justify-center gap-3">
          <ButtonPrimary label="Criar Eleição" />
          <ButtonSecondary label="Falar com Vendas" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ButtonPrimary from '@/components/volt/ButtonPrimary.vue'
import ButtonSecondary from '@/components/volt/ButtonSecondary.vue'
definePageMeta({ title: 'Home', layout: 'default' })
</script>
