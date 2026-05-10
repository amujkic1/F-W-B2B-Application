export function getErrorMessage(error, fallback) {
  const detail = error.response?.data?.detail

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).join(". ")
  }

  return detail || error.response?.data?.message || error.message || fallback
}

export function normalizeApiError(error, fallback) {
  return {
    status: error.response?.status ?? 0,
    message: getErrorMessage(error, fallback),
    data: error.response?.data ?? null,
  }
}
