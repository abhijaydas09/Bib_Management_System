import './App.css';
import shirt from './assets/shirt (1).png';
import qrCode from './assets/qr-code.png';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Marathons from './components/Marathons';
import ContactUs from './components/ContactUs';
import RegisterMarathon from './components/RegisterMarathon';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuth } from './contexts/AuthContext';
import ProfileView from './components/ProfileView';

function App() {
  const { user, logout, profileStatus, needsProfileCompletion, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileView, setShowProfileView] = useState(false);
  const [isCompletingProfile, setIsCompletingProfile] = useState(false);
  const [page, setPage] = useState('home'); // 'home', 'marathons', 'contact'
  const [justSignedUp, setJustSignedUp] = useState(false);

  // Temporary debugging
  console.log('App render state:', {
    user: user ? { id: user.id, name: user.name } : null,
    profileStatus,
    loading,
    showLogin,
    showProfile,
    needsProfileCompletion: needsProfileCompletion()
  });

  // Show loading spinner while initializing auth
  if (loading) {
    return <LoadingSpinner message="Initializing..." />;
  }

  // Handle login success
  const handleLogin = (role) => {
    console.log('handleLogin called, setting showLogin to false');
    setShowLogin(false);
    // Profile completion check is handled by useEffect above
  };

  // Handle signup success
  const handleSignup = () => {
    setJustSignedUp(true);
    setShowProfile(true);
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setShowProfile(false);
    setPage('home');
    setJustSignedUp(false);
  };

  // Handle profile completion
  const handleProfileComplete = () => {
    setIsCompletingProfile(false);
    setShowProfile(false);
    setShowProfileView(false);
    setPage('home'); // Go to landing page after completion
    setJustSignedUp(false);
  };

  // Handle profile start
  const handleProfileStart = () => {
    console.log('handleProfileStart called - starting profile completion');
    setIsCompletingProfile(true);
    setShowProfile(true);
  };

  // Handle profile icon click
  const handleProfileIconClick = () => {
    setShowProfileView(true);
    setShowProfile(false);
    setIsCompletingProfile(false);
  };

  // Extract user profile info if logged in
  const userProfile = user ? { 
    name: user.name, 
    email: user.email, 
    role: user.role,
    profileStatus: profileStatus
  } : null;

  // Helper function to get first name
  const getFirstName = (fullName) => {
    return fullName ? fullName.split(' ')[0] : '';
  };

  // Show login page (no navbar)
  if (showLogin) {
    return <Login onLogin={handleLogin} />;
  }

  // Show ProfileView page
  if (showProfileView && user) {
    return (
      <>
        <header className="navbar">
          <div className="logo-title">🏃‍♂️ Marathon Master</div>
          <nav>
            <a href="#" className={page === 'home' ? 'active' : ''} onClick={() => { setShowProfileView(false); setPage('home'); }}>Home</a>
            <a href="#" className={page === 'marathons' ? 'active' : ''} onClick={() => { setShowProfileView(false); setPage('marathons'); }}>Marathons</a>
            <a href="#" className={page === 'contact' ? 'active' : ''} onClick={() => { setShowProfileView(false); setPage('contact'); }}>Contact Us</a>
            <div className="user-section">
              <span className="user-info">
                Welcome, {getFirstName(user.name)}!
              </span>
              <button 
                className="profile-icon-btn" 
                onClick={handleProfileIconClick}
                title="View Profile"
              >
                👤
              </button>
              <button className="logout-btn" onClick={handleLogout} title="Logout">
                Logout
              </button>
            </div>
          </nav>
        </header>
        <ProfileView />
      </>
    );
  }

  // Show user profile page ONLY if just signed up
  if (showProfile && user && justSignedUp) {
    return (
      <>
        <header className="navbar">
          <div className="logo-title">🏃‍♂️ Marathon Master</div>
          <nav>
            <a href="#" className={page === 'home' ? 'active' : ''} onClick={() => { setShowProfileView(false); setPage('home'); }}>Home</a>
            <a href="#" className={page === 'marathons' ? 'active' : ''} onClick={() => setPage('marathons')}>Marathons</a>
            <a href="#" className={page === 'contact' ? 'active' : ''} onClick={() => setPage('contact')}>Contact Us</a>
            <div className="user-section">
              <span className="user-info">
                Welcome, {getFirstName(user.name)}!
              </span>
              <button 
                className="profile-icon-btn" 
                onClick={handleProfileIconClick}
                title="View Profile"
              >
                👤
              </button>
              <button className="logout-btn" onClick={handleLogout} title="Logout">
                Logout
              </button>
            </div>
          </nav>
        </header>
        <UserProfile role={user.role} onSubmit={handleProfileComplete} onStart={handleProfileStart} />
      </>
    );
  }

  // Main app with navbar always visible
  let pageContent;
  if (page === 'marathons') {
    pageContent = <Marathons userProfile={userProfile} />;
  } else if (page === 'contact') {
    pageContent = <ContactUs />;
  } else {
    pageContent = (
      <>
        <section className="hero hero-landing">
          <div className="hero-bg" />
          <div className="hero-center-content">
            <h1 className="hero-title">Marathon Bib Management & QR-based Attendance System</h1>
          </div>
          <div className="hero-below-content">
            <p className="hero-desc">Empowering Marathons with seamless registration, real-time tracking, and instant attendance using QR codes.</p>
            <div className="cta-buttons">
              <button className="primary">Get Started</button>
              <button className="secondary">Learn More</button>
            </div>
          </div>
        </section>
        <section className="features" id="features">
          <h2>Features</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <img className="feature-icon" src={shirt} alt="Cartoon Bib Icon" />
              <h3>Bib Management</h3>
              <p>Automate bib assignment, tracking, and results for every participant.</p>
            </div>
            <div className="feature-card">
              <img className="feature-icon" src={qrCode} alt="Cartoon Attendance QR Icon" />
              <h3>QR-based Attendance</h3>
              <p>Fast, contactless check-in and attendance with unique QR codes.</p>
            </div>
            <div className="feature-card">
              <img className="feature-icon" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Admin Dashboard Icon" />
              <h3>Admin Dashboard</h3>
              <p>Powerful tools for organizers to manage users, attendance, and analytics.</p>
            </div>
        </div>
        </section>
        <section className="highlights" id="highlights">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Lightning-fast check-ins</li>
            <li>Accurate participant tracking</li>
            <li>Real-time analytics</li>
            <li>Secure and scalable</li>
          </ul>
        </section>
        <footer className="footer" id="contact">
          <p>© {new Date().getFullYear()} Marathon Master. All rights reserved.</p>
        </footer>
      </>
    );
  }

  return (
    <div className="landing-root">
      <header className="navbar">
        <div className="logo-title">🏃‍♂️ Marathon Master</div>
        <nav>
          <a href="#" className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</a>
          <a href="#" className={page === 'marathons' ? 'active' : ''} onClick={() => setPage('marathons')}>Marathons</a>
          <a href="#" className={page === 'contact' ? 'active' : ''} onClick={() => setPage('contact')}>Contact Us</a>
          {!user ? (
            <button className="login-btn" onClick={() => {
              setShowLogin(true);
            }}>Login</button>
          ) : (
            <div className="user-section">
              <span className="user-info">
                Welcome, {getFirstName(user.name)}!
              </span>
              <button 
                className="profile-icon-btn" 
                onClick={handleProfileIconClick}
                title="View Profile"
              >
                👤
              </button>
              <button className="logout-btn" onClick={handleLogout} title="Logout">
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>
      {pageContent}
    </div>
  );
}

export default App;
