import { useNuxtApp } from '#app'
import { useQuery } from '@tanstack/vue-query'
import { unref } from 'vue'

export const useVoter = (voterId: string) => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:VOTER', voterId],
    queryFn: () => $axios.get(`/voters/${voterId}`),
  })
}

export const useVoters = () => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:VOTERS'],
    queryFn: () => $axios.get(`/voters`),
  })
}

export const useVotersByElection = (electionId: string) => {
  const { $axios } = useNuxtApp()
  return useQuery({
    queryKey: ['GET:VOTERS_BY_ELECTION', electionId],
    queryFn: () => $axios.get(`/voters/election/${electionId}`),
  })
}