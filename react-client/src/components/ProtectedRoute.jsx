import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useAppStore } from '../store/useAppStore'

export function ProtectedRoute() {
  const location = useLocation()
  const user = useAppStore((state) => state.user)
  
  const accessToken = Cookies.get('access_token')
  const refreshToken = Cookies.get('refresh_token')

  if (!user && !refreshToken) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}