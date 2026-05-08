import { useQuery } from "@tanstack/react-query"
import { getProfiles, getProfile } from "@/api/profiles"

export const profileKeys = {
  all: ["profiles"],
  lists: () => [...profileKeys.all, "list"],
  list: (filters) => [...profileKeys.lists(), filters],
  detail: (id) => [...profileKeys.all, "detail", id],
}

export const useProfiles = (filters = {}) => {
  const normalizedFilters = {
    page: 1,
    limit: 10,
    ...filters,
  }

  return useQuery({
    queryKey: profileKeys.list(normalizedFilters),
    queryFn: () => getProfiles(normalizedFilters),
  })
}

export const useProfile = (id) => {
  return useQuery({
    queryKey: profileKeys.detail(id),
    queryFn: () => getProfile(id),
    enabled: Boolean(id),
  })
}
