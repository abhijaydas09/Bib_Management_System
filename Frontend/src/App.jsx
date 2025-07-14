import React, { useState, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StaffLogin from './pages/Staff/StaffLogin';
import StaffHome from './pages/Staff/Home';
import StaffEventDetails from './pages/Staff/EventDetails';
import StaffQRLogs from './pages/Staff/QRLogs';
import StaffProfile from './pages/Staff/Profile';
import QrPage from './pages/EventQRs';
import QRScannerTest from './pages/Staff/QRScannerTest';
// import ParticipantLogin from './pages/LoginSignUp/ParticipantLogin';
// import OrganiserLogin from './pages/LoginSignUp/OrganiserLogin';
// import Signup from './pages/LoginSignUp/Signup';
// import ParticipantCompleteProfile from './pages/CompleteProfile/ParticipantCompleteProfile';
// import OrganiserCompleteProfile from './pages/CompleteProfile/OrganiserCompleteProfile';
// import LandingPage from './pages/LandingPage';
// import Footer from './components/footer/Footer';
// import './components/footer/Footer.css';
// import EventOverview from './pages/CreateEvent/EventOverview';
// import MarathonManagement from './pages/MarathonManagement/MarathonManagement';

// Create AuthContext
export const AuthContext = createContext();

function App() {
  // Track login state globally
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/staff/home" element={<StaffHome />} />
        <Route path="/staff/event-details" element={<StaffEventDetails />} />
        <Route path="/staff/qr-logs" element={<StaffQRLogs />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
        <Route path="/staff/qr-scanner-test" element={<QRScannerTest />} />
        <Route path="/qr/:eventId" element={<QrPage />} />
        {/* Add other routes as needed */}
        <Route path="*" element={<Navigate to="/staff/login" />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
