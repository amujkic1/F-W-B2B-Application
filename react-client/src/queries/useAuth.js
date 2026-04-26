import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/api/auth.js'
import { loginUser } from '../api/auth'
import { useAppStore } from '../store/useAppStore';

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

  const navigate = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
        Cookies.set('access_token', data.access_token, { expires: 1, secure: true, sameSite: 'strict' });
        setUser(data.user);
        navigate('/dashboard')
    },
    onError: (error) => {
      console.error('Greška pri prijavi:', error.message)
    },
  })
}
