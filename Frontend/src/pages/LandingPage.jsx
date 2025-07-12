// The variable `heroBg` is imported from '../assets/20141102-nyc-marathon-petrsvab-2081.jpg'
// It is used as the background image for the Hero Section div below.

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import ParticipantNavbar from '../components/tabs/ParticipantNavbar';
import heroBg from '../assets/20141102-nyc-marathon-petrsvab-2081.jpg';

function LandingPage() {
  // Prevent horizontal scroll on the body
  React.useEffect(() => {
    const originalOverflowX = document.body.style.overflowX;
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = originalOverflowX;
    };
  }, []);

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleCreateEvent = () => {
    navigate('/organiser/login');
  };

  const handleRegisterEvent = () => {
    navigate('/participant/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      {/* Navbar */}
      <div style={{ width: '100%' }}>
        <ParticipantNavbar forceLoggedOut={true} />
      </div>
      {/* Hero Section */}
      <div
        style={{
          width: '100%',
          maxWidth: '100vw',
          height: 469,
          background: `url(${heroBg}) center/cover`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative',
          paddingRight: 64,
          marginBottom: 42,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(11, 64, 91, 0.45)' }} />
        <div style={{ position: 'relative', zIndex: 1, color: '#fff', textAlign: 'right', maxWidth: 600, marginRight: 0 }}>
          <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 2, letterSpacing: 0, lineHeight: 1.15, marginTop:  -40 }}>
            Complete Bib Management &<br />QR-based Attendance System for Marathons
          </h1>
          <div style={{ marginLeft:-10, fontSize: 16, fontWeight: 300, marginBottom: 10, color: '#e6e6e6' }}>
            Join exciting marathons across India. Register, track, and run — all in one place.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button onClick={handleCreateEvent} style={{ background: '#fff', color: '#0B405B', border: 'none', borderRadius: 4, fontWeight: 400, fontSize: 10, padding: '6px 8x', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              Create an Event
            </button>
            <button onClick={handleRegisterEvent} style={{ background: '#0B405B', color: '#ffffff', border: 'none', borderRadius: 4, fontWeight: 400, fontSize: 10, padding: '6px 8px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              Register for event
            </button>
          </div>
        </div>
      </div>
      {/* Highlights Section */}
      <div style={{ width: '100%', maxWidth: '100vw', display: 'flex', justifyContent: 'center', marginTop: -48, gap: 0, overflowX: 'hidden', boxSizing: 'border-box' }}>
        {/* Participant Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 600, marginRight: 0, boxSizing: 'border-box' }}>
          <h2 style={{ color: '#0B405B', fontWeight: 700, fontSize: 36, marginBottom: 18, textAlign: 'center' }}>Participant Highlights</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', marginBottom: 32 }}>
            {(() => {
              const boxStyle = {
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                width: 460,
                maxWidth: '90vw',
                height: 100,
                fontSize: 18,
                fontWeight: 400,
                color: '#0B405B',
                margin: 0,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              };
              const descStyle = {
                fontWeight: 300,
                fontSize: 14,
                color: '#676767',
                padding: '0 20px'
              };
              const participantBoxes = [
                {
                  title: "Discover Upcoming Marathons",
                  desc: "Browse races in your city and across India."
                },
                {
                  title: "Easy Registration",
                  desc: "Register in minutes with digital payments"
                },
                {
                  title: "Live Event Updates",
                  desc: "Get event notifications, bib pickup info, and reminders"
                },
                {
                  title: "Track History & Certificates",
                  desc: "View past events, download e-certificates, and relive the race."
                },
                {
                  title: "Instant Bib & QR Code",
                  desc: "Access your bib and attendance QR from your dashboard."
                }
              ];
              return (
                <>
                  {participantBoxes.map((box, i) => (
                    <div key={i} style={boxStyle}>
                      <div style={{ fontWeight: 400, fontSize: 22, marginBottom: 2 }}>{box.title}</div>
                      <div style={descStyle}>{box.desc}</div>
                    </div>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
        {/* Organiser Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 600, boxSizing: 'border-box' }}>
          <h2 style={{ color: '#0B405B', fontWeight: 700, fontSize: 36, marginBottom: 18, textAlign: 'center' }}>Organiser Highlights</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', marginBottom: 32 }}>
            {(() => {
              const boxStyle = {
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                width: 460,
                maxWidth: '90vw',
                height: 100,
                fontSize: 18,
                fontWeight: 400,
                color: '#0B405B',
                margin: 0,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              };
              const descStyle = {
                fontWeight: 300,
                fontSize: 14,
                color: '#676767',
                padding: '0 20px'
              };
              const organiserBoxes = [
                {
                  title: "Create & Publish Events",
                  desc: "Customise marathon details, categories, fees, T-shirt sizes, and more."
                },
                {
                  title: "Manage Participants & Staff",
                  desc: "Add team members, assign roles, view participant data in real-time."
                },
                {
                  title: "Bib Assignment & QR Attendance",
                  desc: "Real-time check-ins with QR scans, bib management, and status tracking."
                },
                {
                  title: "Analytics Dashboard",
                  desc: "Track registrations, payment status, category-wise stats, and bib collection."
                },
                {
                  title: "Secure Payments & Digital Records",
                  desc: "Collect fees online and download reports for accounting."
                }
              ];
              return organiserBoxes.map((box, i) => (
                <div key={i} style={boxStyle}>
                  <div style={{ fontWeight: 400, fontSize: 22, marginBottom: 2 }}>{box.title}</div>
                  <div style={descStyle}>{box.desc}</div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
      {/* How It Works Section */}
      <div style={{ width: '100%', marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
        <h2 style={{ color: '#0B405B', fontWeight: 600, fontSize: 40, marginBottom: 18 }}>HOW IT WORKS?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 400px))', gap: 160, maxWidth: '100vw', boxSizing: 'border-box', overflowX: 'auto' }}>
          <div style={{ width: 400, maxWidth: '90vw', height: 100, background: '#0B405B', color: '#fff', borderRadius: 4, fontWeight: 400, fontSize: 24, padding: '16px 20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -136, boxSizing: 'border-box' }}>
            Search event by city or distance
          </div>
          <div style={{ width: 400, maxWidth: '90vw', height: 100, background: '#0B405B', color: '#fff', borderRadius: 4, fontWeight: 400, fontSize: 24, padding: '16px 20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -136, boxSizing: 'border-box' }}>
            Create your profile and manage marathons
          </div>
          <div style={{ width: 400, maxWidth: '90vw', height: 100, background: '#0B405B', color: '#fff', borderRadius: 4, fontWeight: 400, fontSize: 24, padding: '16px 20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -136, boxSizing: 'border-box' }}>
            Register for Marathons and get QRs
          </div>
          <div style={{ width: 400, maxWidth: '90vw', height: 100, background: '#0B405B', color: '#fff', borderRadius: 4, fontWeight: 400, fontSize: 24, padding: '16px 20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -136, boxSizing: 'border-box' }}>
            Publish your marathons in easy ways
          </div>
          <div style={{ width: 400, maxWidth: '90vw', height: 100, background: '#0B405B', color: '#fff', borderRadius: 4, fontWeight: 400, fontSize: 24, padding: '16px 20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -136, boxSizing: 'border-box' }}>
            Participate in different events
          </div>
          <div style={{ width: 400, maxWidth: '90vw', height: 100, background: '#0B405B', color: '#fff', borderRadius: 4, fontWeight: 400, fontSize: 24, padding: '16px 20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -136, boxSizing: 'border-box' }}>
            Track Registrations and Real-time Attendance
          </div>
          <div style={{ width: 400, maxWidth: '90vw', height: 100, background: '#0B405B', color: '#fff', borderRadius: 4, fontWeight: 400, fontSize: 24, padding: '16px 20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -136, boxSizing: 'border-box' }}>
            Collect your medals & e-Certificates
          </div>
          <div style={{ width: 400, maxWidth: '90vw', height: 100, background: '#0B405B', color: '#fff', borderRadius: 4, fontWeight: 400, fontSize: 24, padding: '16px 20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 0, boxSizing: 'border-box' }}>
            Manage BIB Allocation & Analytics
          </div>
        </div>
      </div>
      {/* Featured Events Section */}
      <div style={{ width: '100%', maxWidth: '100vw', marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden', boxSizing: 'border-box', marginBottom: 64 }}>
        <h2 style={{ color: '#0B405B', fontWeight: 600, fontSize: 40, marginBottom: 18 }}>FEATURED EVENTS</h2>
        <div
          style={{
            width: 700,
            maxWidth: '95vw',
            height: 180,
            background: `url(https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80) center/cover`,
            borderRadius: 8,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ position: 'absolute', bottom: 16, left: 24, color: '#fff', fontWeight: 700, fontSize: 32, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>MARATHON 26,2 MILES</div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 