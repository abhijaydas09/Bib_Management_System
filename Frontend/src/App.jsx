import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ParticipantLogin from './pages/ParticipantLogin';
import Signup from './pages/Signup';
import CompleteProfile from './pages/CompleteProfile';

// Create AuthContext
export const AuthContext = createContext();

function App() {
  // Track login state globally
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CompleteProfile />
    </AuthContext.Provider>
  );
}

export default App;
