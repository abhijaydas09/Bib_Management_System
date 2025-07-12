import React, { useState } from 'react';
import ParticipantNavbar from '../../components/tabs/ParticipantNavbar';
import OrganiserNavbar from '../../components/tabs/OrganiserNavbar';
import BasicTextInput from '../../components/text-inputs/BasicTextInput.jsx';
import { FaCamera, FaUser, FaVenusMars, FaEnvelope, FaLock, FaPhone, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/text-inputs/BasicTextInput.css';

const TAB_HEIGHT = 31;
const TAB_WIDTH = 626;
const BOX_WIDTH = 626;
const BOX_HEIGHT = 427;
const PROFILE_BOX_WIDTH = 270;
const PROFILE_BOX_HEIGHT = 84;
const PROFILE_CIRCLE = 60;
const CAMERA_ICON = 40;
const UPLOAD_BTN_WIDTH = 120;
const UPLOAD_BTN_HEIGHT = 12;
const INPUT_WIDTH = PROFILE_BOX_WIDTH - 20;
const INPUT_HEIGHT = 31;
const BUTTON_WIDTH = 267;
const BUTTON_HEIGHT = 31;

const participantTabs = [
  { label: 'Home', path: '/participant/home' },
  { label: 'Marathons', path: '/participant/marathons' },
  { label: 'My Events', path: '/participant/my-events' },
  { label: 'Login', path: '/login' }
];
const organiserTabs = [
  { label: 'Home', path: '/organiser/home' },
  { label: 'My Marathons', path: '/organiser/my-marathons' },
  { label: 'Create a Event', path: '/organiser/create-event' },
  { label: 'Login', path: '/login' }
];

function Signup() {
  const [role, setRole] = useState('participant');
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', gender: '', phone: '', email: '', password: '', confirmPassword: '', orgName: ''
  });
  const [activeParticipantTab, setActiveParticipantTab] = useState(participantTabs[0].path);
  const [activeOrganiserTab, setActiveOrganiserTab] = useState(organiserTabs[0].path);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('Please accept the terms and privacy policy.');
      return;
    }
    try {
      const endpoint = role === 'participant' ? 'http://localhost:5001/api/participant-signup' : 'http://localhost:5001/api/organiser-signup';
      const res = await axios.post(endpoint, form);
      alert('Signup successful!');
      // Optionally auto-login or redirect
      // localStorage.setItem('token', res.data.token);
      // navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  // Handle tab click for participant
  const handleParticipantTabClick = (path) => {
    setActiveParticipantTab(path);
    if (path === '/login') navigate('/login');
  };
  // Handle tab click for organiser
  const handleOrganiserTabClick = (path) => {
    setActiveOrganiserTab(path);
    if (path === '/login') navigate('/login');
  };

  // --- PARTICIPANT FORM ---
  const participantForm = (
    <form
      onSubmit={handleSignup}
      style={{
        background: '#fff',
        borderRadius: 4,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 6px rgba(0,0,0,0.08)',
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        marginTop: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      <div style={{ marginTop: 16, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: 18, color: '#0B405B', marginBottom: 8 }}>Welcome</div>
        <div style={{ fontWeight: 400, fontSize: 10, color: '#000', marginBottom: 10 }}>Sign Up with New Account</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            gap: 24,
            padding: 16,
            boxSizing: 'border-box',
          }}
        >
          {/* Left column */}
          <div style={{ width: INPUT_WIDTH, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16}}>
            {/* Profile picture upload */}
            <div style={{ width: PROFILE_BOX_WIDTH, height: PROFILE_BOX_HEIGHT, background: '#f5f5f5', borderRadius: 4, border: '1px dashed #bbb', display: 'flex', alignItems: 'center', marginLeft: 18, marginBottom: 20, padding: 0 }}>
              <div style={{ width: PROFILE_CIRCLE, height: PROFILE_CIRCLE, borderRadius: '50%', background: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 12, marginRight: 12, overflow: 'hidden' }}>
                {profilePicUrl ? (
                  <img src={profilePicUrl} alt="Profile Preview" style={{ width: PROFILE_CIRCLE, height: PROFILE_CIRCLE, objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <FaCamera style={{ fontSize: CAMERA_ICON, color: '#0B405B' }} />
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%', width: 120 }}>
                <label style={{ background: '#fff', border: '1px solid #0B405B', color: '#0B405B', borderRadius: 2, padding: '0 8px', fontWeight: 400, fontSize: 9, cursor: 'pointer', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4, width: UPLOAD_BTN_WIDTH, height: UPLOAD_BTN_HEIGHT, justifyContent: 'center' }}>
                  <FaCamera style={{ fontSize: 9 }} /> Upload Profile Picture
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfilePicChange} />
                </label>
                <div style={{ fontSize: 9, color: '#444', marginTop: 2 }}>or drop file</div>
              </div>
            </div>
            {/* Input fields: gender, email, confirm password */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <BasicTextInput
                name="gender"
                type="text"
                placeholder="Gender"
                value={form.gender}
                onChange={handleChange}
                icon={<FaVenusMars style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                icon={<FaEnvelope style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                icon={<FaLock style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
            </div>
          </div>
          {/* Right column */}
          <div style={{ width: INPUT_WIDTH, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <BasicTextInput
                name="firstName"
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                icon={<FaUser style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                icon={<FaUser style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="phone"
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                icon={<FaPhone style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                icon={<FaLock style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              {/* Checkbox and terms */}
              <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start', marginTop: 0, marginBottom: 0, fontSize: 8 }}>
                <input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} style={{ marginRight: 8, marginTop: 2 }} />
                <span style={{ fontSize: 8, color: '#222' }}>
                  I accept the <a href="#" style={{ color: '#1291D0', textDecoration: 'underline' }}>Terms and Services</a> and have read the <a href="#" style={{ color: '#1291D0', textDecoration: 'underline' }}>Privacy Policy</a>. I agree that Zemo may share my information with the tournament organiser.
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Sign Up Button */}
        <button
          type="submit"
          style={{
            width: BUTTON_WIDTH,
            height: BUTTON_HEIGHT,
            background: '#0B405B',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontWeight: 400,
            fontSize: 10,
            cursor: 'pointer',
            display: 'block',
            margin: '6px auto 0 auto',
          }}
        >
          Sign Up on Zemo
        </button>
        {/* Already have an account */}
        <div style={{ textAlign: 'center', marginTop: 8, marginBottom: 16, color: '#000', fontSize: 10, width: BUTTON_WIDTH, fontWeight: 400 }}>
          Already have an account?{' '}
          <a href="/" style={{ color: '#1291D0', fontSize: 10, textAlign: 'center', textDecoration: 'underline', fontWeight: 400 }}>Sign In</a>
        </div>
      </div>
    </form>
  );

  // --- ORGANISER FORM ---
  const organiserForm = (
    <form
      onSubmit={handleSignup}
      style={{
        background: '#fff',
        borderRadius: 4,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1.5px 6px rgba(0,0,0,0.08)',
        width: BOX_WIDTH,
        height: BOX_HEIGHT,
        marginTop: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      <div style={{ marginTop: 16, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: 18, color: '#0B405B', marginBottom: 8 }}>Welcome</div>
        <div style={{ fontWeight: 400, fontSize: 10, color: '#000', marginBottom: 10 }}>Sign Up with New Account</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            gap: 24,
            padding: 16,
            boxSizing: 'border-box',
          }}
        >
          {/* Left column */}
          <div style={{ width: INPUT_WIDTH, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 16 }}>
            {/* Profile picture upload */}
            <div style={{ width: PROFILE_BOX_WIDTH, height: PROFILE_BOX_HEIGHT, background: '#f5f5f5', borderRadius: 4, border: '1px dashed #bbb', display: 'flex', alignItems: 'center', marginLeft: 21, marginBottom: 19, padding: 0 }}>
              <div style={{ width: PROFILE_CIRCLE, height: PROFILE_CIRCLE, borderRadius: '50%', background: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 12, marginRight: 12, overflow: 'hidden' }}>
                {profilePicUrl ? (
                  <img src={profilePicUrl} alt="Profile Preview" style={{ width: PROFILE_CIRCLE, height: PROFILE_CIRCLE, objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <FaCamera style={{ fontSize: CAMERA_ICON, color: '#0B405B' }} />
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%', width: 120 }}>
                <label style={{ background: '#fff', border: '1px solid #0B405B', color: '#0B405B', borderRadius: 2, padding: '0 8px', fontWeight: 400, fontSize: 9, cursor: 'pointer', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4, width: UPLOAD_BTN_WIDTH, height: UPLOAD_BTN_HEIGHT, justifyContent: 'center' }}>
                  <FaCamera style={{ fontSize: 9 }} /> Upload Profile Picture
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfilePicChange} />
                </label>
                <div style={{ fontSize: 9, color: '#444', marginTop: 2 }}>or drop file</div>
              </div>
            </div>
            {/* Input fields: gender, email, confirm password */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <BasicTextInput
                name="gender"
                type="text"
                placeholder="Gender"
                value={form.gender}
                onChange={handleChange}
                icon={<FaVenusMars style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                icon={<FaEnvelope style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                icon={<FaLock style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
            </div>
          </div>
          {/* Right column */}
          <div style={{ width: INPUT_WIDTH, display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight:16 }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <BasicTextInput
                name="firstName"
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                icon={<FaUser style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                icon={<FaUser style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="phone"
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                icon={<FaPhone style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              <BasicTextInput
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                icon={<FaLock style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
              {/* Organisation Name input */}
              <BasicTextInput
                name="orgName"
                type="text"
                placeholder="Organisation Name"
                value={form.orgName}
                onChange={handleChange}
                icon={<FaBuilding style={{ fontSize: 14, color: '#0B405B' }} />}
                style={{ width: INPUT_WIDTH, height: INPUT_HEIGHT, marginBottom: 4 }}
                required
              />
            </div>
          </div>
        </div>
        {/* Checkbox and terms for organiser, centered under both columns, 8px below grid */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: -12, marginBottom: 0, fontSize: 8 }}>
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={e => setAcceptTerms(e.target.checked)}
            style={{ marginRight: 8, marginTop: 0 }}
          />
          <span style={{ fontSize: 8, color: '#222' }}>
            I accept the <a href="#" style={{ color: '#1291D0', textDecoration: 'underline' }}>Terms and Services</a> and have read the <a href="#" style={{ color: '#1291D0', textDecoration: 'underline' }}>Privacy Policy</a>. I agree that Zemo may share my information with the tournament organiser.
          </span>
        </div>
        {/* Sign Up Button */}
        <button
          type="submit"
          style={{
            width: BUTTON_WIDTH,
            height: BUTTON_HEIGHT,
            background: '#0B405B',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            fontWeight: 400,
            fontSize: 10,
            cursor: 'pointer',
            display: 'block',
            margin: '4px auto 0 auto',
          }}
        >
          Sign Up on Zemo
        </button>
        {/* Already have an account */}
        <div style={{ textAlign: 'center', marginTop: 8, marginBottom: 16, color: '#000', fontSize: 10, width: BUTTON_WIDTH, fontWeight: 400 }}>
          Already have an account?{' '}
          <a href="/" style={{ color: '#1291D0', fontSize: 10, textAlign: 'center', textDecoration: 'underline', fontWeight: 400 }}>Sign In</a>
        </div>
      </div>
    </form>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fff', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%' }}>
        {role === 'participant' ? (
          <ParticipantNavbar tabs={participantTabs} />
        ) : (
          <OrganiserNavbar tabs={organiserTabs} />
        )}
      </div>
      {/* 24px below navbar */}
      <div style={{ marginTop: 24, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Tabs */}
        <div style={{ height: TAB_HEIGHT, width: TAB_WIDTH, display: 'flex', borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 0 }}>
          <button
            onClick={() => setRole('participant')}
            style={{
              flex: 1,
              height: '100%',
              background: role === 'participant' ? '#0B405B' : '#f7f7f7',
              border: 'none',
              color: role === 'participant' ? '#A8FD24' : '#0B405B',
              fontWeight: 400,
              fontSize: 10,
              cursor: 'pointer',
              borderBottom: role === 'participant' ? '2px solid #A8FD24' : '2px solid #e0e0e0',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Sign Up as a Player
          </button>
          <button
            onClick={() => setRole('organiser')}
            style={{
              flex: 1,
              height: '100%',
              background: role === 'organiser' ? '#0B405B' : '#f7f7f7',
              border: 'none',
              color: role === 'organiser' ? '#A8FD24' : '#0B405B',
              fontWeight: 400,
              fontSize: 10,
              cursor: 'pointer',
              borderBottom: role === 'organiser' ? '2px solid #A8FD24' : '2px solid #e0e0e0',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Sign Up as a Organiser
          </button>
        </div>
        {/* Render the correct form */}
        {role === 'participant' ? participantForm : organiserForm}
      </div>
    </div>
  );
}

export default Signup;