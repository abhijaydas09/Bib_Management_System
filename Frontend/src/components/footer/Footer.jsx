import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const footerStyle = {
  background: '#0B405B',
  color: '#fff',
  width: '100%',
  padding: '40px 0 0 0',
  fontFamily: 'inherit',
  fontSize: 14,
  marginTop:0,
};
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: 80,
  maxWidth: 1400,
  margin: '0 auto',
  padding: '0 40px',
};
const colStyle = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 220,
  flex: 1,
  gap: 8,
};
const headingStyle = {
  color: '#A8FD24',
  fontWeight: 700,
  fontSize: 16,
  marginBottom: 12,
  letterSpacing: 1,
  textTransform: 'uppercase',
};
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 300,
  fontSize: 13,
  marginBottom: 4,
  transition: 'color 0.2s',
};
const iconStyle = { color: '#A8FD24', marginRight: 8, fontSize: 16 };
const logoStyle = { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 };
const logoImgStyle = { height: 40 };
const logoTextStyle = { color: '#A8FD24', fontWeight: 700, fontSize: 22, letterSpacing: 1 };
const logoSubStyle = { color: '#fff', fontWeight: 600, fontSize: 13, letterSpacing: 2, marginTop: -2 };
const dividerStyle = { width: '90%', height: 1, background: '#fff', opacity: 0.4, margin: '32px auto 0 auto' };
const copyrightStyle = { color: '#fff', opacity: 0.9, fontSize: 10, textAlign: 'center', padding: '16px 0 12px 0' };

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <div style={{ ...colStyle, minWidth: 220, flex: 1.2 }}>
          <div style={logoStyle}>
            {/* Replace with actual logo image if available */}
            <img src="/logo192.png" alt="Zemo Logo" style={logoImgStyle} />
            <div>
              <div style={logoTextStyle}>ZEMO</div>
              <div style={logoSubStyle}>SPORTIFY LIFE!</div>
            </div>
          </div>
        </div>
        {/* Useful Links */}
        <div style={colStyle}>
          <div style={headingStyle}>Useful Links</div>
          <a href="#" style={linkStyle}>Terms & Conditions</a>
          <a href="#" style={linkStyle}>Privacy Policy</a>
          <a href="#" style={linkStyle}>Refund Policy</a>
          <a href="#" style={linkStyle}>Contact Us</a>
        </div>
        {/* Tournaments */}
        <div style={colStyle}>
          <div style={headingStyle}>Tournaments</div>
          <a href="#" style={linkStyle}>Upcoming</a>
          <a href="#" style={linkStyle}>Ongoing</a>
          <a href="#" style={linkStyle}>Concluded</a>
        </div>
        {/* Contact */}
        <div style={colStyle}>
          <div style={headingStyle}>Contact</div>
          <div style={{ color: '#fff', fontSize: 13, marginBottom: 8 , fontWeight:300}}>
            CIBA Vashi, 6th Floor, Agnel Technical Complex, Sector 9A Vashi, Navi Mumbai, Maharashtra 400703
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <FaEnvelope style={iconStyle} />
            <span style={{ color: '#fff', fontSize: 13, fontWeight:300 }}>support@zemo.co.in</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaPhone style={iconStyle} />
            <span style={{ color: '#fff', fontSize: 13, fontWeight:300 }}>+91 9082705182</span>
          </div>
        </div>
      </div>
      <div style={dividerStyle} />
      <div style={copyrightStyle}>
        © 2025 Futurasport Catalyst Private Limited
      </div>
    </footer>
  );
} 