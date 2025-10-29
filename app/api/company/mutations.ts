import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { Company } from '../../schemas/companies';

export const useUpdateCompanyMutation = () => {
  const { $api } = useNuxtApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyData: Company) => {
      const response = await $api.put('/company', companyData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
    },
  });
};