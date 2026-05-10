import { authClient } from "@/api/authClient.js"
import { normalizeApiError } from "@/utils/apiError.js"

export async function createMeetingRequest(meetingRequest) {
  try {
    const response = await authClient.post("/api/meeting-requests/", meetingRequest)
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Meeting request could not be created")
  }
}
