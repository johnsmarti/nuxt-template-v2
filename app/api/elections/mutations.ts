import { useNuxtApp } from '#app'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import type { ElectionCreatePayload } from './interfaces'

export function useElectionCreate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: ElectionCreatePayload) => {
      console.log(data, 'data')
      const response = await $axios.post('/elections', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET:ELECTIONS'] })
      router.push('/elections')
    }
  })
}
export function useElectionUpdate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.put(`/elections/${data.uuid}`, data)
      return response.data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['GET:ELECTIONS'] })
      await queryClient.refetchQueries({ queryKey: ['GET:ELECTIONS'] })
      router.push('/elections')
    }
  })
}