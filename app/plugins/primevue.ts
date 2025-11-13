import PrimeVue from "primevue/config";
import AnimateOnScroll from "primevue/animateonscroll";
import ConfirmationService from "primevue/confirmationservice";
import StyleClass from "primevue/styleclass";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Calendar from "primevue/calendar";
import TabList from "primevue/tablist";
import Select from "primevue/select";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    unstyled: true,
  });

  nuxtApp.vueApp.directive("styleclass", StyleClass);
  nuxtApp.vueApp.directive("animateonscroll", AnimateOnScroll);
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("Calendar", Calendar);
  nuxtApp.vueApp.component("TabList", TabList);
  nuxtApp.vueApp.component("Select", Select);
});
