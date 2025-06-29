import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileStatus, setProfileStatus] = useState(null);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
          
          // Get profile status
          try {
            const status = await authService.getProfileStatus();
            setProfileStatus(status);
            console.log('Profile status loaded:', status);
          } catch (error) {
            console.log('No profile found for user');
            setProfileStatus({ has_profile: false, needs_profile_completion: true });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.signup(userData);
      setUser(response.organizer);
      setProfileStatus(response.profile_status);
      console.log('Signup successful, profile status:', response.profile_status);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      setUser(response.organizer);
      setProfileStatus(response.profile_status);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setProfileStatus(null);
    }
  };

  // Update profile status
  const updateProfileStatus = async () => {
    try {
      const status = await authService.getProfileStatus();
      setProfileStatus(status);
      console.log('Profile status updated:', status);
      return status;
    } catch (error) {
      console.error('Failed to update profile status:', error);
      throw error;
    }
  };

  // Check if user needs profile completion
  const needsProfileCompletion = () => {
    // Use the needs_profile_completion field from backend if available
    if (profileStatus?.needs_profile_completion !== undefined) {
      return profileStatus.needs_profile_completion;
    }
    // Fallback to checking has_profile and is_complete
    const needs = !profileStatus?.has_profile || !profileStatus?.is_complete;
    console.log('needsProfileCompletion check:', { profileStatus, needs });
    return needs;
  };

  // Get profile completion percentage
  const getProfileCompletionPercentage = () => {
    return profileStatus?.completion_percentage || 0;
  };

  const value = {
    user,
    loading,
    profileStatus,
    signup,
    login,
    logout,
    updateProfileStatus,
    needsProfileCompletion,
    getProfileCompletionPercentage,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 