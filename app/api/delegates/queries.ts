import { useNuxtApp } from '#app'
import { useQuery } from '@tanstack/vue-query'
import { unref } from 'vue'

export const useDelegate = (delegateId: string) => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:DELEGATE', delegateId],
    queryFn: () => $axios.get(`/delegates/${delegateId}`),
  })
}

export const useDelegates = () => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:DELEGATES'],
    queryFn: () => $axios.get(`/delegates`),
  })
}

export const useDelegatesByElection = (electionId: string) => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:DELEGATES_BY_ELECTION', electionId],
    queryFn: () => $axios.get(`/delegates/election/${electionId}`),
  })
}