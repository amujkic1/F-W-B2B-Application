import { authClient } from "@/api/authClient.js"

function getErrorMessage(error, fallback) {
  const detail = error.response?.data?.detail

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).join(". ")
  }

  return detail || error.response?.data?.message || error.message || fallback
}

export async function createMeetingRequest(meetingRequest) {
  try {
    const response = await authClient.post("/api/meeting-requests/", meetingRequest)
    return response.data
  } catch (error) {
    throw {
      status: error.response?.status ?? 0,
      message: getErrorMessage(error, "Meeting request could not be created"),
      data: error.response?.data ?? null,
    }
  }
}
