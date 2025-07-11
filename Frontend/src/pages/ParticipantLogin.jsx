 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ParticipantNavbar from '../components/tabs/ParticipantNavbar';
import '../components/text-inputs/BasicTextInput.css';

const participantTabs = [
  { label: 'Home', path: '/participant/home' },
  { label: 'Marathons', path: '/participant/marathons' },
  { label: 'My Events', path: '/participant/my-events' },
  { label: 'Login', path: '/login' }
];

function ParticipantLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('/login');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/participant-login', { email, password });
      // Save token/user info as needed
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      // navigate('/dashboard') or similar
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate('/signup');
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
        <ParticipantNavbar
          onTabClick={setActiveTab}
          activeTab={activeTab}
          tabs={participantTabs}
        />
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
            {/* 
              The fontWeight property in inline styles expects a number (e.g., 700) or a string like "bold".
              However, some browsers may not apply "bold" if the font being used does not have a bold weight available,
              or if a CSS rule with higher specificity (such as a class or external stylesheet) is overriding it.
              Also, if the BasicTextInput.css or other CSS files set h2 { font-weight: normal !important; }, 
              the inline style will be overridden.
              To ensure the font weight is applied, use a numeric value (700) and check for !important in CSS.
            */}
            <h2 style={{ textAlign: 'center', marginBottom: 8, color: '#000', width: '100%', fontWeight: 700, fontSize: 16 }}>Login</h2>
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
                  id="participant-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="basic-textinput-input"
                  style={{
                    textAlign: 'left', // Align input text and placeholder to the left
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
                  id="participant-password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="basic-textinput-input"
                  style={{
                    textAlign: 'left', // Align input text and placeholder to the left
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

export default ParticipantLogin; 