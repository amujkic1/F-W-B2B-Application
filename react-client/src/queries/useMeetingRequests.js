import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createMeetingRequest,
  getMeetingRequests,
  updateMeetingRequest,
} from "@/api/meetingRequests.js"

export const meetingRequestKeys = {
  all: ["meeting-requests"],
  lists: () => [...meetingRequestKeys.all, "list"],
  list: (filters) => [...meetingRequestKeys.lists(), filters],
}

export function useMeetingRequests(filters = {}) {
  const normalizedFilters = {
    page: 1,
    limit: 100,
    ...filters,
  }

  return useQuery({
    queryKey: meetingRequestKeys.list(normalizedFilters),
    queryFn: () => getMeetingRequests(normalizedFilters),
    enabled: Boolean(
      normalizedFilters.requester_user_id ||
        normalizedFilters.recipient_user_id ||
        normalizedFilters.status
    ),
  })
}

export function useCreateMeetingRequestMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMeetingRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingRequestKeys.lists() })
    },
  })
}

export function useUpdateMeetingRequestMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, meetingRequest }) => updateMeetingRequest(id, meetingRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingRequestKeys.lists() })
    },
  })
}
