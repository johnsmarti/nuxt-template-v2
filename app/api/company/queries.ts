import { useQuery } from '@tanstack/vue-query';
import { companySchema } from '../../schemas/companies';

export const useCompanyQuery = () => {
  const { $api } = useNuxtApp();

  return useQuery({
    queryKey: ['company'],
    queryFn: async () => {
      const response = await $api.get('/company');
      return companySchema.parse(response.data);
    },
  });
};