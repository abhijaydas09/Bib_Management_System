import React, { useState } from 'react';
import './Login.css';
import UserProfile from './UserProfile';

function Login({ onLogin }) {
  const [role, setRole] = useState('participant');
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showProfile, setShowProfile] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setForm({ email: '', password: '', confirmPassword: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup') {
      if (form.password !== form.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      // Placeholder for sign-up logic
      setShowProfile(true);
    } else {
      // Placeholder for login logic
      if (onLogin) onLogin(role);
      else alert(`Logging in as ${role}: ${form.email}`);
    }
  };

  const handleProfileSubmit = (profileData) => {
    setProfileComplete(true);
    setTimeout(() => {
      setShowProfile(false);
      setProfileComplete(false);
      setMode('login');
      if (onLogin) onLogin(role);
    }, 2000);
  };

  if (showProfile) {
    return (
      <div className={`login-root ${role}`}>
        {profileComplete ? (
          <div className="login-box"><h2 style={{color:'#fff',textAlign:'center'}}>Profile completed!<br/>You can now log in.</h2></div>
        ) : (
          <UserProfile role={role} onSubmit={handleProfileSubmit} />
        )}
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
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">
            {role === 'participant' ? 'Participant' : 'Organiser'} {mode === 'login' ? 'Login' : 'Sign Up'}
          </h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {mode === 'signup' && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit" className="login-submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
        </form>
        <div className="login-switch">
          {mode === 'login' ? (
            <span>Don't have an account?{' '}
              <button type="button" className="switch-btn" onClick={() => setMode('signup')}>Sign Up</button>
            </span>
          ) : (
            <span>Already have an account?{' '}
              <button type="button" className="switch-btn" onClick={() => setMode('login')}>Login</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login; 