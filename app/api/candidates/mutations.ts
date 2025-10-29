import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useNuxtApp } from '#app'

export function useCandidateCreate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.post('/candidates', data)
      return response.data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GET:CANDIDATES'] })
    }
  })
}

export function useCandidateUpdate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.put(`/candidates/${data.uuid}`, data)
      return response.data
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['GET:CANDIDATES'] })
        await queryClient.refetchQueries({ queryKey: ['GET:CANDIDATES'] })
    }
  })
}

export function useCandidateDelete() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (uuid: string) => {
      const response = await $axios.delete(`/candidates/${uuid}`)
      return response.data
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['GET:CANDIDATES'] })
    }
  })
}