import { useNuxtApp } from '#app'
import { useQuery } from '@tanstack/vue-query'
import { unref } from 'vue'

export const useElection = (electionId: string) => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:ELECTION', electionId],
    queryFn: () => $axios.get(`/elections/${electionId}`),
  })
}
export const useElections = () => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:ELECTIONS'],
    queryFn: () => $axios.get(`/elections`),
  })
}
