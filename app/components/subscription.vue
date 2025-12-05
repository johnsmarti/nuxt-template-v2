<template>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between py-4">
      <div>
        <h1 class="text-2xl font-bold">Gerenciamento de Dashboard</h1>
        <p class="text-sm text-gray-500">Painel ADMIN | Dashboard</p>
      </div>
      <ButtonPrimary label="Nova Eleição" class="!bg-blue-600 !border-blue-600" />
    </div>

    <Tabs>
      <Tab label="Visão Geral" />
      <Tab label="Assinatura" active />
      <Tab label="Empresa" />
      <Tab label="Pessoal" />
      <Tab label="Analytics" />
    </Tabs>

    <div class="mt-4 grid gap-6 md:grid-cols-2">
      <div class="rounded-2xl bg-white p-6 shadow">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Plano Premium</h2>
          <span class="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">Ativo</span>
        </div>
        <p class="mt-1 text-sm text-gray-600">Você está no Plano Premium com cobrança mensal.</p>

        <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          <div class="rounded-md bg-slate-50 p-3">
            <div class="text-xs text-gray-500">Próxima Cobrança</div>
            <div class="text-sm font-semibold">15 de Janeiro, 2025</div>
            <div class="text-xs text-gray-500">R$ 299,00</div>
          </div>
          <div class="rounded-md bg-slate-50 p-3">
            <div class="text-xs text-gray-500">Uso Atual</div>
            <div class="text-sm font-semibold">1,234 / 10,000</div>
            <div class="text-xs text-gray-500">Eleitores cadastrados</div>
          </div>
          <div class="rounded-md bg-slate-50 p-3">
            <div class="text-xs text-gray-500">Método de Pagamento</div>
            <div class="text-sm font-semibold">**** **** **** 4242</div>
          </div>
          <div class="flex items-center justify-end">
            <ButtonSecondary label="Alterar" />
          </div>
        </div>

        <div class="mt-3 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-700">
          <strong>Importante:</strong> Você está usando 12% do limite de eleitores. Considere fazer upgrade para plano Enterprise se precisar de mais capacidade.
        </div>
      </div>

      <div class="rounded-2xl bg-white p-6 shadow">
        <h3 class="mb-2 text-lg font-semibold">Gerenciar Assinatura</h3>
        <div class="grid gap-3">
          <ButtonPrimary label="Atualizar Método de Pagamento" />
          <ButtonPrimary label="Alterar Ciclo de Cobrança" />
          <ButtonSecondary label="Baixar Faturas" />
          <ButtonTertiary label="Cancelar Assinatura" />
        </div>
      </div>
    </div>

    <div class="mt-6 rounded-2xl bg-white p-6 shadow">
      <h3 class="mb-2 text-lg font-semibold">Últimas Faturas Pagas</h3>
      <div class="grid gap-3 md:grid-cols-3">
        <div class="rounded-md border p-3 text-sm">15 Ago 2025 — R$ 89,90 — <span class="text-green-600">Pago</span></div>
        <div class="rounded-md border p-3 text-sm">17 Jul 2025 — R$ 89,90 — <span class="text-green-600">Pago</span></div>
        <div class="rounded-md border p-3 text-sm">18 Jun 2025 — R$ 89,90 — <span class="text-green-600">Pago</span></div>
      </div>
      <div class="mt-3 text-sm text-blue-600">Ver Histórico Completo →</div>
    </div>

    <div class="mt-6 rounded-2xl bg-white p-6 shadow">
      <h3 class="mb-4 text-lg font-semibold">Planos Disponíveis</h3>
      <div class="grid gap-4 md:grid-cols-3">
        <div class="rounded-md border p-4">
          <div class="text-xl font-bold">Grátis</div>
          <div class="text-sm text-gray-500">Ideal para organizações pequenas e eleições simples</div>
          <div class="mt-3 text-xs">Plano Atual</div>
          <ul class="mt-3 space-y-1 text-sm">
            <li>Até 100 eleitores</li>
            <li>1 eleição ativa</li>
            <li>Interface amigável</li>
            <li>Resultados em tempo real</li>
            <li>Suporte por email</li>
          </ul>
        </div>
        <div class="rounded-md border p-4">
          <div class="text-xl font-bold">R$299/mês</div>
          <div class="text-sm text-gray-500">Profissional</div>
          <ButtonPrimary label="Fazer Upgrade" class="mt-3" />
          <ul class="mt-3 space-y-1 text-sm">
            <li>Até 500 eleitores</li>
            <li>5 eleições ativas</li>
            <li>Integração avançada</li>
            <li>Relatórios avançados</li>
          </ul>
        </div>
        <div class="rounded-md border p-4">
          <div class="text-xl font-bold">R$599/mês</div>
          <div class="text-sm text-gray-500">Enterprise</div>
          <ButtonPrimary label="Fazer Upgrade" class="mt-3" />
          <ul class="mt-3 space-y-1 text-sm">
            <li>Eleitores ilimitados</li>
            <li>Integração enterprise</li>
            <li>Suporte prioritário</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonPrimary from '@/components/volt/ButtonPrimary.vue'
import ButtonSecondary from '@/components/volt/ButtonSecondary.vue'
import ButtonTertiary from '@/components/volt/ButtonTertiary.vue'
import Tabs from '@/components/volt/Tabs.vue'
import Tab from '@/components/volt/Tab.vue'

definePageMeta({ layout: 'default', middleware: 'auth' })
</script>
