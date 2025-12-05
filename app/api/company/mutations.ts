import { useMutation, useQueryClient } from '@tanstack/vue-query';

export const useUpdateCompanyMutation = () => {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await $axios.post('/companies/create_or_update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
    },
  });
};