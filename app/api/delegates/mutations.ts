import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useNuxtApp } from '#app'

export function useDelegateCreate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.post('/delegates', data)
      return response.data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GET:DELEGATES'] })
    }
  })
}

export function useDelegateUpdate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.put(`/delegates/${data.uuid}`, data)
      return response.data
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['GET:DELEGATES'] })
        await queryClient.refetchQueries({ queryKey: ['GET:DELEGATES'] })
    }
  })
}

export function useDelegateDelete() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (uuid: string) => {
      const response = await $axios.delete(`/delegates/${uuid}`)
      return response.data
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['GET:DELEGATES'] })
    }
  })
}