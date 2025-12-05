<template>
  <div class="container mx-auto px-4">
    <ManagerTabs>
      <TabPanel value="0" class="space-y-4 p-4">
        <div class="rounded-lg bg-white p-6 shadow-sm">hgfhfdhfd</div>
      </TabPanel>
      <TabPanel value="1" class="space-y-4 p-4">
        <Subscription />
      </TabPanel>
      <TabPanel value="2">
        <Company />
      </TabPanel>
      <TabPanel value="3">
        <Personal />
      </TabPanel>
      <TabPanel value="4" class="space-y-4 p-4">
        <div class="rounded-lg bg-white p-6 shadow-sm">hgfhfdhfd</div>
      </TabPanel>
    </ManagerTabs>
  </div>
</template>

<script setup lang="ts">
import Company from "@/components/company/index.vue";
import ManagerTabs from "@/components/ManagerTabs.vue";
import Personal from "@/components/personal.vue";
import Subscription from "@/components/subscription.vue";
import TabPanel from "@/components/volt/TabPanel.vue";

definePageMeta({
  middleware: "auth",
  layout: "default",
})
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
