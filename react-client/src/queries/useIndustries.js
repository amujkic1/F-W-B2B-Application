import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createIndustry,
  deleteIndustry,
  getIndustries,
  getIndustry,
  updateIndustry,
} from "@/api/industries.js"

export const industriesKeys = {
  all: ["industries"],
  lists: () => [...industriesKeys.all, "list"],
  list: (filters) => [...industriesKeys.lists(), filters],
  detail: (id) => [...industriesKeys.all, "detail", id],
}

export const useIndustries = (filters = {}) => {
  const normalizedFilters = {
    page: 1,
    limit: 10,
    ...filters,
  }

  return useQuery({
    queryKey: industriesKeys.list(normalizedFilters),
    queryFn: () => getIndustries(normalizedFilters),
  })
}

export const useIndustry = (id) => {
  return useQuery({
    queryKey: industriesKeys.detail(id),
    queryFn: () => getIndustry(id),
    enabled: Boolean(id),
  })
}

export function useCreateIndustryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createIndustry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: industriesKeys.lists() })
    },
  })
}

export function useUpdateIndustryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, industry }) => updateIndustry(id, industry),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: industriesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: industriesKeys.detail(variables.id) })
    },
  })
}

export function useDeleteIndustryMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteIndustry,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: industriesKeys.lists() })
      queryClient.removeQueries({ queryKey: industriesKeys.detail(id) })
    },
  })
}
