import axios from 'axios'
import Cookies from 'js-cookie'

import { useAppStore } from '../store/useAppStore'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function getCookieOptions() {
  const isSecure =
    typeof window !== 'undefined' && window.location.protocol === 'https:'

  return {
    expires: 1,
    secure: isSecure,
    sameSite: isSecure ? 'strict' : 'lax',
    path: '/',
  }
}

function clearAuthSession() {
  useAppStore.getState().clearUser()
  Cookies.remove('access_token', { path: '/' })
  Cookies.remove('refresh_token', { path: '/' })
}

const PUBLIC_PATHS = new Set(['/login', '/register', '/register/invitation', '/'])

function isPublicPath(pathname) {
  return PUBLIC_PATHS.has(pathname) || pathname.startsWith('/register/invitation/')
}

function redirectToLogin() {
  if (
    typeof window !== 'undefined' &&
    !isPublicPath(window.location.pathname)
  ) {
    window.location.replace('/login')
  }
}

export const authClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

authClient.interceptors.request.use((config) => {
  const accessToken = Cookies.get('access_token')

  if (accessToken) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

let refreshPromise = null

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const originalRequest = error.config
    const requestUrl = originalRequest?.url || ''
    const isAuthRoute =
      requestUrl.includes('/api/auth/login') ||
      requestUrl.includes('/api/auth/register') ||
      requestUrl.includes('/api/auth/refresh')

    if (status === 401 && !isAuthRoute && originalRequest && !originalRequest._retry) {
      const refreshToken = Cookies.get('refresh_token')

      if (!refreshToken) {
        clearAuthSession()
        redirectToLogin()
        return Promise.reject(error)
      }

      originalRequest._retry = true

      try {
        refreshPromise =
          refreshPromise ??
          axios.post(`${API_URL}/api/auth/refresh`, null, {
            params: { refresh_token: refreshToken },
          })

        const response = await refreshPromise
        refreshPromise = null

        const cookieOptions = getCookieOptions()
        Cookies.set('access_token', response.data.access_token, cookieOptions)

        if (response.data.refresh_token) {
          Cookies.set('refresh_token', response.data.refresh_token, cookieOptions)
        }

        if (response.data.user) {
          useAppStore.getState().setUser(response.data.user)
        }

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`

        return authClient(originalRequest)
      } catch (refreshError) {
        refreshPromise = null
        clearAuthSession()
        redirectToLogin()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
