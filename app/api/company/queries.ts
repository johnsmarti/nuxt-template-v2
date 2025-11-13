import { companySchema } from "@/schemas/companies";
import { useQuery } from "@tanstack/vue-query";

export const useCompanyQuery = () => {
  const { $axios } = useNuxtApp();

  return useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const response = await $axios.get("/companies/1");
      return companySchema.parse(response.data);
    },
  });
};
