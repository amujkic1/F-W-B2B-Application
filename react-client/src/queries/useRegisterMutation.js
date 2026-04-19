import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/api/auth.js'

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
