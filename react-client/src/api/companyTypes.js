import { authClient } from "@/api/authClient.js"
import { normalizeApiError } from "@/utils/apiError.js"

export async function getCompanyTypes({ page = 1, limit = 10, ...params } = {}) {
  try {
    const skip = (page - 1) * limit
    const response = await authClient.get("/api/company-types/", {
      params: {
        skip,
        limit,
        ...params,
      },
    })
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Company types could not be loaded")
  }
}

export async function getCompanyType(id) {
  try {
    const response = await authClient.get(`/api/company-types/${id}`)
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Company type could not be loaded")
  }
}

export async function createCompanyType(companyType) {
  try {
    const response = await authClient.post("/api/company-types/", companyType)
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Company type could not be created")
  }
}

export async function updateCompanyType(id, companyType) {
  try {
    const response = await authClient.put(`/api/company-types/${id}`, companyType)
    return response.data
  } catch (error) {
    throw normalizeApiError(error, "Company type could not be updated")
  }
}

export async function deleteCompanyType(id) {
  try {
    await authClient.delete(`/api/company-types/${id}`)
  } catch (error) {
    throw normalizeApiError(error, "Company type could not be deleted")
  }
}
