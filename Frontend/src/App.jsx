import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ParticipantLogin from './pages/LoginSignUp/ParticipantLogin';
import OrganiserLogin from './pages/LoginSignUp/OrganiserLogin';
import Signup from './pages/LoginSignUp/Signup';
import ParticipantCompleteProfile from './pages/CompleteProfile/ParticipantCompleteProfile';
import OrganiserCompleteProfile from './pages/CompleteProfile/OrganiserCompleteProfile';
import LandingPage from './pages/LandingPage';

// Create AuthContext
export const AuthContext = createContext();

function App() {
  // Track login state globally
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/participant/login" element={<ParticipantLogin />} />
        <Route path="/organiser/login" element={<OrganiserLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/participant/complete-profile" element={<ParticipantCompleteProfile />} />
        <Route path="/organiser/complete-profile" element={<OrganiserCompleteProfile />} />
        {/* Add other routes as needed */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
