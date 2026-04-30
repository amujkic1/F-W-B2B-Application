import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useAppStore } from '../store/useAppStore'

export function ProtectedRoute() {
  const location = useLocation()
  const user = useAppStore((state) => state.user)
  const token = Cookies.get('access_token');

  if (!user || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}