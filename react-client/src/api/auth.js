import { authClient } from './authClient'

export async function registerUser({ email, password }) {
  try {
    const response = await authClient.post('/api/auth/register', {
      email,
      password,
      account_type: 'company',
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

export async function loginUser({ email, password }) {
  try {
    // 1. Priprema podataka u URL-encoded formatu (OAuth2 standard)
    const params = new URLSearchParams();
    params.append('username', email); // FastAPI OAuth2 helper traži 'username'
    params.append('password', password);

    const response = await authClient.post('/api/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // (access_token, refresh_token, token_type)
    return response.data;
    
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.detail || 'Prijava nije uspela',
      };
    }
    throw {
      status: 0,
      message: 'Greška u komunikaciji sa serverom',
    };
  }
}
