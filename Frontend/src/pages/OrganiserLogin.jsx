import React, { useState } from 'react';
import OrganiserNavbar from '../components/tabs/OrganiserNavbar';
import '../components/text-inputs/BasicTextInput.css';

function OrganiserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/api/auth/player_login', {
      email,
      password
    });

    console.log('Login success:', response.data);

    // Save player to localStorage
    localStorage.setItem('player', JSON.stringify(response.data.player));

    alert('Login successful!');
    navigate('/participant/home');
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Login failed');
  }
};


  // Fallback navigation for environments without react-router context
  const handleSignupClick = (e) => {
    e.preventDefault();
    window.location.href = '/signup';
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        justifyContent: 'flex-start',
        background: '#fff',
        width: '100vw',
      }}
    >
      <OrganiserNavbar onTabClick={() => {}} activeTab={null} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', marginTop: 24 }}>
        <form onSubmit={handleLogin} style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: 320 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 16, color: '#000' }}>Organiser Login</h2>
          <div style={{ marginBottom: 16 }}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 4, border: '1px solid #ccc' }} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: 10, background: '#0B405B', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600 }}>Login</button>
          <div style={{ textAlign: 'center', marginTop: 12, color: '#000' }}>
            Don't have an account?{' '}
            <a
              href="/signup"
              style={{ color: '#1291D0', fontSize: 10, textAlign: 'center', cursor: 'pointer' }}
              onClick={handleSignupClick}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganiserLogin; 