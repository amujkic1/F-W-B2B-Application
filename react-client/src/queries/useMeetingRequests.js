import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createMeetingRequest } from "@/api/meetingRequests.js"

export const meetingRequestKeys = {
  all: ["meeting-requests"],
  lists: () => [...meetingRequestKeys.all, "list"],
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
