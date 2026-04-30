import axios from 'axios'
import Cookies from 'js-cookie'

import { useAppStore } from '../store/useAppStore'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const requestUrl = error.config?.url || ''
    const isAuthRoute =
      requestUrl.includes('/api/auth/login') ||
      requestUrl.includes('/api/auth/register') ||
      requestUrl.includes('/api/auth/refresh')

    if (status === 401 && !isAuthRoute) {
      useAppStore.getState().clearUser()
      Cookies.remove('access_token', { path: '/' })
      Cookies.remove('refresh_token', { path: '/' })

      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.replace('/login')
      }
    }

    return Promise.reject(error)
  }
)