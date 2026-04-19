import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const authClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function registerUser({ email, password }) {
  try {
    const response = await authClient.post('/api/auth/register', {
      email,
      password,
      account_type: 'company', // B2B aplikacija, defaultno company
    })
    return response.data
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.detail || error.response.data?.message || 'Registracija nije uspješna',
        data: error.response.data,
      }
    }
    throw {
      status: 0,
      message: error.message || 'Greška u konekciji sa serverom',
      data: null,
    }
  }
}
