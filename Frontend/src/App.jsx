import './App.css';
import shirt from './assets/shirt (1).png';
import qrCode from './assets/qr-code.png';
import React, { useState } from 'react';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Marathons from './components/Marathons';
import ContactUs from './components/ContactUs';
import RegisterMarathon from './components/RegisterMarathon';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'participant' or 'organiser'
  const [page, setPage] = useState('home'); // 'home', 'marathons', 'contact'

  // Simulate login callback
  const handleLogin = (role = 'participant') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setShowLogin(false);
  };

  // Simulate logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setShowProfile(false);
    setPage('home');
  };

  // Extract user profile info if logged in (dummy for now)
  const userProfile = isLoggedIn && userRole === 'participant'
    ? { name: 'John Doe', email: 'john@example.com', bib_number: 'BIB123' }
    : null;

  // Show login page (no navbar)
  if (showLogin) {
    return <Login onLogin={handleLogin} />;
  }

  // Show user profile page
  if (showProfile && isLoggedIn && userRole) {
    return <>
      <header className="navbar">
        <div className="logo-title">🏃‍♂️ Marathon Master</div>
        <nav>
          <a href="#" className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</a>
          <a href="#" className={page === 'marathons' ? 'active' : ''} onClick={() => setPage('marathons')}>Marathons</a>
          <a href="#" className={page === 'contact' ? 'active' : ''} onClick={() => setPage('contact')}>Contact Us</a>
          {!isLoggedIn ? (
            <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
          ) : (
            <>
              <button className="login-btn" onClick={() => setShowProfile(true)}>Profile</button>
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </header>
      <UserProfile role={userRole} onSubmit={() => setShowProfile(false)} />
    </>;
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
            <h1 className="hero-title">Complete Bib Management & QR-based Attendance System</h1>
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
          {!isLoggedIn ? (
            <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
          ) : (
            <>
              <button className="login-btn" onClick={() => setShowProfile(true)}>Profile</button>
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </header>
      {pageContent}
    </div>
  );
}

export default App;
