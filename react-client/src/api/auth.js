import { authClient } from './authClient'

export async function registerUser(registration) {
  try {
    const response = await authClient.post('/api/auth/register/company', registration)
    return response.data
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.detail || error.response.data?.message || 'Registration was not successful',
        data: error.response.data,
      }
    }
    throw {
      status: 0,
      message: error.message || 'Could not connect to the server',
      data: null,
    }
  }
}

export async function registerWithInvitation(registration) {
  try {
    const response = await authClient.post('/api/auth/register/invitation', registration)
    return response.data
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.detail || error.response.data?.message || 'Invitation registration was not successful',
        data: error.response.data,
      }
    }
    throw {
      status: 0,
      message: error.message || 'Could not connect to the server',
      data: null,
    }
  }
}

export async function loginUser({ email, password }) {
  try {
    // 1. Prepare data in URL-encoded format (OAuth2 standard)
    const params = new URLSearchParams();
    params.append('username', email); // FastAPI OAuth2 helper expects 'username'
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
        message: error.response.data?.detail || 'Sign-in was not successful',
      };
    }
    throw {
      status: 0,
      message: 'Could not communicate with the server',
    };
  }
}
