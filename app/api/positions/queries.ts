import { useNuxtApp } from '#app'
import { useQuery } from '@tanstack/vue-query'

export const usePosition = (positionId: string) => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:POSITION', positionId],
    queryFn: () => $axios.get(`/positions/${positionId}`, {
      params: {
        include: 'election' // Include related election data
      }
    }),
    enabled: !!positionId,
  })
}

export const usePositions = () => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:POSITIONS'],
    queryFn: () => $axios.get('/positions'),
  })
}

export const usePositionsByElection = (electionId: string) => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:POSITIONS_BY_ELECTION', electionId],
    queryFn: () => $axios.get(`/positions/election/${electionId}`),
    enabled: !!electionId,
  })
}
