import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ParticipantLogin from './pages/ParticipantLogin';
import Signup from './pages/Signup';

// Create AuthContext
export const AuthContext = createContext();

function App() {
  // Track login state globally
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <Routes>
          <Route path="/" element={<ParticipantLogin />} />
          <Route path="/login" element={<ParticipantLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/participant-signup" element={<Navigate to="/signup" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
