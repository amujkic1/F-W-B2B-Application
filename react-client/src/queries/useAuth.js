import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/api/auth.js'
import { loginUser } from '../api/auth'
import { useAppStore } from '../store/useAppStore';

function getCookieOptions() {
  const isSecure = window.location.protocol === 'https:'

  return {
    expires: 1,
    secure: isSecure,
    sameSite: isSecure ? 'strict' : 'lax',
    path: '/',
  }
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('Registracija uspješna:', data)
    },
    onError: (error) => {
      console.error('Greška pri registraciji:', error.message)
    },
  })
}

export function useLoginMutation() {
  const setUser = useAppStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
        const cookieOptions = getCookieOptions()
        Cookies.set('access_token', data.access_token, cookieOptions)

        if (data.refresh_token) {
          Cookies.set('refresh_token', data.refresh_token, cookieOptions)
        }

        setUser(data.user);
    },
    onError: (error) => {
      console.error('Greška pri prijavi:', error.message)
    },
  })
}
