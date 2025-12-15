<template>
  <div class="container mx-auto px-4">
    <Tabs v-model:value="filter">
      <div class="mb-6 flex items-center justify-between rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
        <TabList>
          <Tab value="all">
            <Icon name="ic:baseline-filter-list" class="mr-1 text-lg" />
            <span class="text-lg font-medium">Todas</span>
          </Tab>
          <Tab value="active">
            <Icon name="ic:baseline-check-circle" class="mr-1 text-lg" />
            <span class="text-lg font-medium">Ativas</span>
          </Tab>
          <Tab value="scheduled">
            <Icon name="ic:baseline-schedule" class="mr-1 text-lg" />
            <span class="text-lg font-medium">Agendadas</span>
          </Tab>
          <Tab value="draft">
            <Icon name="ic:baseline-drafts" class="mr-1 text-lg" />
            <span class="text-lg font-medium">Rascunhos</span>
          </Tab>
        </TabList>
        <ButtonPrimary class="!w-[200px] max-w-[200px]" label="Nova Eleição" @click="goNew" />
      </div>
      <TabPanels>
        <slot></slot>
      </TabPanels>
    </Tabs>
    <div class="mt-6">
      <div class="flex flex-wrap items-center justify-center gap-6">
        <div v-for="item in filterList(filter)" :key="item.uuid">
          <CardElection
            :uuid="item.uuid"
            :title="item.title"
            :description="item.description"
            :status="item.status"
            :date-start="item.date_start"
            :date-end="item.date_end"
            @edit="edit"
            @remove="remove"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElections } from "@/api/elections/queries";
import CardElection from "@/components/CardElection.vue";
import ButtonPrimary from "@/components/volt/ButtonPrimary.vue";
import Tab from "@/components/volt/Tab.vue";
import TabList from "@/components/volt/TabList.vue";
import TabPanels from "@/components/volt/TabPanels.vue";
import Tabs from "@/components/volt/Tabs.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

definePageMeta({ middleware: "auth", layout: "default" });

const router = useRouter();
const filter = ref<"all" | "active" | "scheduled" | "draft" | "closed">("all");
const { data } = useElections();

const list = computed(() => {
  const payload = data?.value ?? [];
  return payload.map((e: any) => ({
    uuid: e.uuid,
    title: e.title,
    description: e.description,
    status: e.status, // 'active' | 'scheduled' | 'draft'
    date_start: e.start_date || "A definir",
    date_end: e.end_date || "A definir",
  }));
});

function goNew() {
  router.push("/management/elections/new");
}
function edit(id: string) {
  router.push(`/management/elections/${id}/edit`);
}
function remove(id: string) {
  /* TODO: integrate delete */
}
function filterList(filter: string | "all" | "active" | "scheduled" | "draft" | "closed") {
  switch (filter) {
    case "all":
      return list.value;
    case "active":
      return list.value.filter((e: any) => e.status === "active");
    case "scheduled":
      return list.value.filter((e: any) => e.status === "scheduled");
    case "draft":
      return list.value.filter((e: any) => e.status === "draft");
    case "closed":
      return list.value.filter((e: any) => e.status === "closed");
  }
}
</script>
