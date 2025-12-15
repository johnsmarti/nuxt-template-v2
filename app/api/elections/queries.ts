import { useNuxtApp } from '#app'
import { useQuery } from '@tanstack/vue-query'

export const useElection = (electionId?: string) => {
  const { $axios } = useNuxtApp()

  return useQuery({
    queryKey: ['GET:ELECTION', electionId],
    queryFn: () =>
      $axios.get(`/elections/${electionId}`).then(res => res.data),
    enabled: !!electionId, // só busca quando houver ID válido
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 1, // 1 min sem refetch
    retry: 1,
  })
}

export const useElections = () => {
  const { $axios } = useNuxtApp()

  return useQuery({
    queryKey: ['GET:ELECTIONS'],
    queryFn: () => $axios.get(`/elections`).then(res => res.data),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 1,
    retry: 1,
  })
}
