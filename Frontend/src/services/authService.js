import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('Token expired or unauthorized, clearing localStorage');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Don't redirect, let the app handle it
    }
    return Promise.reject(error);
  }
);

class AuthService {
  // Signup
  async signup(userData) {
    try {
      const response = await api.post('/auth/signup', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.organizer));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Signup failed' };
    }
  }

  // Login
  async login(credentials) {
    try {
      console.log('Attempting login with:', { username: credentials.username, password: '***' });
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.organizer));
        console.log('Token and user saved to localStorage');
      }
      return response.data;
    } catch (error) {
      console.error('Login error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      throw error.response?.data || { error: 'Login failed' };
    }
  }

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get profile' };
    }
  }

  // Create/update profile
  async updateProfile(profileData) {
    try {
      const response = await api.post('/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update profile' };
    }
  }

  // Get profile completion status
  async getProfileStatus() {
    try {
      console.log('Getting profile status...');
      const response = await api.get('/profile/completion-status');
      console.log('Profile status response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Profile status error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      throw error.response?.data || { error: 'Failed to get profile status' };
    }
  }

  // Update profile section
  async updateProfileSection(section, data) {
    try {
      const response = await api.patch(`/profile/section/${section}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update profile section' };
    }
  }
}

export default new AuthService(); 