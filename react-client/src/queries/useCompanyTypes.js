import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createCompanyType,
  deleteCompanyType,
  getCompanyType,
  getCompanyTypes,
  updateCompanyType,
} from "@/api/companyTypes.js"

export const companyTypesKeys = {
  all: ["company-types"],
  lists: () => [...companyTypesKeys.all, "list"],
  list: (filters) => [...companyTypesKeys.lists(), filters],
  detail: (id) => [...companyTypesKeys.all, "detail", id],
}

export const useCompanyTypes = (filters = {}) => {
  const normalizedFilters = {
    page: 1,
    limit: 10,
    ...filters,
  }

  return useQuery({
    queryKey: companyTypesKeys.list(normalizedFilters),
    queryFn: () => getCompanyTypes(normalizedFilters),
  })
}

export const useCompanyType = (id) => {
  return useQuery({
    queryKey: companyTypesKeys.detail(id),
    queryFn: () => getCompanyType(id),
    enabled: Boolean(id),
  })
}

export function useCreateCompanyTypeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompanyType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyTypesKeys.lists() })
    },
  })
}

export function useUpdateCompanyTypeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, companyType }) => updateCompanyType(id, companyType),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: companyTypesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: companyTypesKeys.detail(variables.id) })
    },
  })
}

export function useDeleteCompanyTypeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCompanyType,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: companyTypesKeys.lists() })
      queryClient.removeQueries({ queryKey: companyTypesKeys.detail(id) })
    },
  })
}
