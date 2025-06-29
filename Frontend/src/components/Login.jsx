import React, { useState } from 'react';
import './Login.css';
import UserProfile from './UserProfile';
import { useAuth } from '../contexts/AuthContext';

function Login({ onLogin }) {
  const { signup, login } = useAuth();
  const [role, setRole] = useState('participant');
  const [form, setForm] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    name: ''
  });
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setForm({ username: '', email: '', password: '', confirmPassword: '', name: '' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        // Validation
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match!');
          return;
        }

        if (form.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }

        if (!form.username || !form.email || !form.password || !form.name) {
          setError('All fields are required');
          return;
        }

        // Signup
        const signupData = {
          username: form.username,
          email: form.email,
          password: form.password,
          name: form.name,
          role: role === 'participant' ? 'user' : 'staff'
        };

        const response = await signup(signupData);
        
        // Check if profile completion is needed
        if (response.profile_status?.needs_profile_completion) {
          console.log('Login: Profile completion needed, showing profile form');
          setShowProfile(true);
          // Always call onLogin to hide the login modal
          if (onLogin) onLogin(role);
        } else {
          console.log('Login: Profile complete, calling onLogin');
          if (onLogin) onLogin(role);
        }
      } else {
        // Login
        const loginData = {
          username: form.email, // Can be email or username
          password: form.password
        };

        const response = await login(loginData);
        
        // Check if profile completion is needed
        if (response.profile_status?.needs_profile_completion) {
          console.log('Login: Profile completion needed, showing profile form');
          setShowProfile(true);
          // Always call onLogin to hide the login modal
          if (onLogin) onLogin(role);
        } else {
          console.log('Login: Profile complete, calling onLogin');
          if (onLogin) onLogin(role);
        }
      }
    } catch (error) {
      setError(error.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = (profileData) => {
    setShowProfile(false);
    if (onLogin) onLogin(role);
  };

  if (showProfile) {
    return (
      <div className={`login-root ${role}`}>
        <UserProfile role={role} onSubmit={handleProfileSubmit} />
      </div>
    );
  }

  return (
    <div className={`login-root ${role}`}>
      <div className="login-box">
        <div className="login-tabs">
          <button
            className={role === 'participant' ? 'active' : ''}
            onClick={() => handleRoleChange('participant')}
          >
            Participant
          </button>
          <button
            className={role === 'organiser' ? 'active' : ''}
            onClick={() => handleRoleChange('organiser')}
          >
            Organiser
          </button>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">
            {role === 'participant' ? 'Participant' : 'Organiser'} {mode === 'login' ? 'Login' : 'Sign Up'}
          </h2>
          
          {mode === 'signup' && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </>
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          {mode === 'signup' && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          )}
          <button 
            type="submit" 
            className="login-submit"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>
        
        <div className="login-switch">
          {mode === 'login' ? (
            <span>Don't have an account?{' '}
              <button 
                type="button" 
                className="switch-btn" 
                onClick={() => setMode('signup')}
                disabled={loading}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>Already have an account?{' '}
              <button 
                type="button" 
                className="switch-btn" 
                onClick={() => setMode('login')}
                disabled={loading}
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login; 