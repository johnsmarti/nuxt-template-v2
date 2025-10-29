import { useNuxtApp } from '#app'
import { useQuery } from '@tanstack/vue-query'
import { unref } from 'vue'

export const useCandidate = (candidateId: string) => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:CANDIDATE', candidateId],
    queryFn: () => $axios.get(`/candidates/${candidateId}`),
  })
}

export const useCandidates = () => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:CANDIDATES'],
    queryFn: () => $axios.get(`/candidates`),
  })
}

export const useCandidatesByPosition = (positionId: string) => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:CANDIDATES_BY_POSITION', positionId],
    queryFn: () => $axios.get(`/candidates/position/${positionId}`),
  })
}