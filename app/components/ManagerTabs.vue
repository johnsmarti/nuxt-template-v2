<template>
  <Tabs value="0">
    <div class="mb-6 rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
      <TabList>
        <Tab value="0">
          <Icon name="lucide:layout-dashboard" class="mr-2 text-xl" />
          <span class="text-lg font-medium">Visão Geral</span>
        </Tab>
        <Tab value="1">
          <Icon name="lucide:credit-card" class="mr-2 text-xl" />
          <span class="text-lg font-medium">Assinatura</span>
        </Tab>
        <Tab value="2">
          <Icon name="lucide:building-2" class="mr-2 text-xl" />
          <span class="text-lg font-medium">Empresa</span>
        </Tab>
        <Tab value="3">
          <Icon name="lucide:file-text" class="mr-2 text-xl" />
          <span class="text-lg font-medium">Pessoal</span>
        </Tab>
        <Tab value="4">
          <Icon name="lucide:chart-line" class="mr-2 text-xl" />
          <span class="text-lg font-medium">Analytics</span>
        </Tab>
      </TabList>
    </div>
    <TabPanels>
      <slot></slot>
    </TabPanels>
  </Tabs>
</template>
<script setup lang="ts">
import Tabs from "@/components/volt/Tabs.vue";
import TabList from "@/components/volt/TabList.vue";
import Tab from "@/components/volt/Tab.vue";
import TabPanels from "@/components/volt/TabPanels.vue";
</script>
