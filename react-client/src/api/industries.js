import { authClient } from "@/api/authClient.js"
import { normalizeApiError } from "@/utils/apiError.js"

export async function getIndustries({ page = 1, limit = 10, ...params } = {}) {
  try {
    const skip = (page - 1) * limit
    const response = await authClient.get("/api/industries/", {
      params: {
        skip,
        limit,
        ...params,
      },
    })
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Industries could not be loaded")
  }
}

export async function getIndustry(id) {
  try {
    const response = await authClient.get(`/api/industries/${id}`)
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Industry could not be loaded")
  }
}

export async function createIndustry(industry) {
  try {
    const response = await authClient.post("/api/industries/", industry)
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Industry could not be created")
  }
}

export async function updateIndustry(id, industry) {
  try {
    const response = await authClient.put(`/api/industries/${id}`, industry)
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Industry could not be updated")
  }
}

export async function deleteIndustry(id) {
  try {
    await authClient.delete(`/api/industries/${id}`)
  } catch (error) {
    throw normalizeApiError(error, "Industry could not be deleted")
  }
}
