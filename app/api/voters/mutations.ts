import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useNuxtApp } from '#app'

export function useVoterCreate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.post('/voters', data)
      return response.data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['GET:VOTERS'] })
    }
  })
}

export function useVoterUpdate() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await $axios.put(`/voters/${data.uuid}`, data)
      return response.data
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['GET:VOTERS'] })
        await queryClient.refetchQueries({ queryKey: ['GET:VOTERS'] })
    }
  })
}

export function useVoterDelete() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (uuid: string) => {
      const response = await $axios.delete(`/voters/${uuid}`)
      return response.data
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['GET:VOTERS'] })
    }
  })
}

export function useVoterImport() {
  const { $axios } = useNuxtApp()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await $axios.post('/voters/import', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['GET:VOTERS'] })
    }
  })
}