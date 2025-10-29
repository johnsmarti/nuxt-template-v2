import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useNuxtApp } from '#app'

export function useElectionCreate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.post('/elections', data)
      return response.data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GET:ELECTIONS'] })
    }
  })
}
export function useElectionUpdate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.put(`/elections/${data.uuid}`, data)
      return response.data
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['GET:ELECTIONS'] })
        await queryClient.refetchQueries({ queryKey: ['GET:ELECTIONS'] })
    }
  })
}