import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useNuxtApp } from '#app'

export function usePositionCreate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.post('/positions', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET:POSITIONS'] })
      queryClient.invalidateQueries({ queryKey: ['GET:POSITIONS_BY_ELECTION'] })
    }
  })
}

export function usePositionUpdate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.put(`/positions/${data.id}`, data)
      return response.data
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['GET:POSITION', variables.id] }),
        queryClient.invalidateQueries({ queryKey: ['GET:POSITIONS'] }),
        queryClient.invalidateQueries({ queryKey: ['GET:POSITIONS_BY_ELECTION'] })
      ])
    }
  })
}

export function usePositionDelete() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await $axios.delete(`/positions/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['GET:POSITIONS'] })
      queryClient.invalidateQueries({ queryKey: ['GET:POSITIONS_BY_ELECTION'] })
    }
  })
}
