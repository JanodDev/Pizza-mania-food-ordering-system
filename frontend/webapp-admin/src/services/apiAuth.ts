// services/apiAuth.js

const BASE_URL = 'http://localhost:3000/api/auth'; // adjust the URL as needed

export async function signup({ fullName, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error during signup');
    }

    // Store the token in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function login({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error during login');
    }

    // Store the token in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.user;
  } catch (error) {
    logout(); // Clear invalid session
    throw new Error(error.message);
  }
}

export async function logout() {
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export async function updateUser({ fullName, email, password, avatar }) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No authentication token found');

  try {
    const response = await fetch(`${BASE_URL}/update-profile`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
        avatar,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error updating profile');
    }

    // Update stored user data
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Helper function to get the authentication token
export function getToken() {
  return localStorage.getItem('token');
}

// Helper function to check if user is authenticated
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
