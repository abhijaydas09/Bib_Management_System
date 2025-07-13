import React, { useState } from 'react';
import OrganiserNavbar from '../../components/tabs/OrganiserNavbar';
import '../../components/text-inputs/BasicTextInput.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OrganiserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/api/auth/organiser_login', {
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
      {/* Navbar aligned to the very top */}
      <div style={{ width: '100%' }}>
        <OrganiserNavbar forceLoggedOut={true} />
      </div>
      {/* Box 24px below the navbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          marginTop: 24,
          minHeight: 'calc(100vh - 24px)',
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            background: '#fff',
            padding: 32,
            borderRadius: 2,
            boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 6px rgba(0,0,0,0.08)',
            width: 322,
            height: 255,
            marginTop: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 8, color: '#000', width: '100%', fontWeight: 700, fontSize: 16 }}>Organiser Login</h2>
            {/* Welcome back text, 12px below Login */}
            <div
              style={{
                marginTop: 8,
                marginBottom: 8,
                color: '#000',
                fontWeight: 400,
                fontSize: 10,
                textAlign: 'center',
                width: '100%',
              }}
            >
              Welcome back
            </div>
            <div style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div
                className="basic-textinput-wrapper"
                style={{
                  marginBottom: 22,
                  alignItems: 'center',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <input
                  id="organiser-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="basic-textinput-input"
                  style={{
                    textAlign: 'left',
                    borderWidth: '0.5px',
                    borderRadius: 2,
                  }}
                />
              </div>
              <div
                className="basic-textinput-wrapper"
                style={{
                  marginBottom: 22,
                  alignItems: 'center',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <input
                  id="organiser-password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="basic-textinput-input"
                  style={{
                    textAlign: 'left',
                    borderWidth: '0.5px',
                    borderRadius: 2,
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: 272,
                  padding: '8px 0',
                  background: '#0B405B',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: 10,
                  marginTop: 0,
                  marginBottom: 0,
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              >
                Login
              </button>
            </div>
            <div style={{ textAlign: 'center', marginTop: 8, color: '#000', fontSize: 10, width: '100%' }}>
              Don't have an account?{' '}
              <a
                href="/signup"
                style={{ color: '#1291D0', fontSize: 10, textAlign: 'center', cursor: 'pointer' }}
                onClick={handleSignupClick}
              >
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrganiserLogin; 