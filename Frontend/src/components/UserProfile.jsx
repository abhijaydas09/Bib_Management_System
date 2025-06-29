import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

function UserProfile({ role, onSubmit, onStart }) {
  const { updateProfileStatus, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState({
    full_name: '',
    gender: '',
    date_of_birth: '',
    nationality: '',
    email: '',
    mobile_number: '',
    mailing_address: {
      street_address: '',
      city: '',
      state: '',
      postal_code: '',
      country: ''
    },
    emergency_contact: {
      name: '',
      relationship: '',
      phone_number: '',
      email: ''
    },
    t_shirt_size: '',
    blood_group: 'unknown'
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let profileData = null;
        try {
          const response = await authService.getProfile();
          profileData = response.profile || response;
        } catch (error) {
          try {
            const statusResponse = await authService.getProfileStatus();
            profileData = statusResponse.profile || statusResponse;
          } catch (statusError) {
            throw statusError;
          }
        }
        if (profileData) {
          setForm(prev => ({
            ...prev,
            full_name: profileData.full_name || '',
            gender: profileData.gender || '',
            date_of_birth: profileData.date_of_birth ? new Date(profileData.date_of_birth).toISOString().split('T')[0] : '',
            nationality: profileData.nationality || '',
            email: profileData.email || '',
            mobile_number: profileData.mobile_number || '',
            mailing_address: {
              street_address: profileData.mailing_address?.street_address || '',
              city: profileData.mailing_address?.city || '',
              state: profileData.mailing_address?.state || '',
              postal_code: profileData.mailing_address?.postal_code || '',
              country: profileData.mailing_address?.country || ''
            },
            emergency_contact: {
              name: profileData.emergency_contact?.name || '',
              relationship: profileData.emergency_contact?.relationship || '',
              phone_number: profileData.emergency_contact?.phone_number || '',
              email: profileData.emergency_contact?.email || ''
            },
            t_shirt_size: profileData.t_shirt_size || '',
            blood_group: profileData.blood_group || 'unknown'
          }));
        }
        setProfileLoaded(true);
      } catch (error) {
        if (user && user.name) {
          setForm(prev => ({
            ...prev,
            full_name: user.name || '',
            email: user.email || ''
          }));
        }
        setProfileLoaded(true);
      }
    };
    fetchProfileData();
  }, [user]);

  useEffect(() => {
    if (onStart) onStart();
  }, [onStart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleNextStep = () => {
    let missing = [];
    if (!form.full_name) missing.push('Full Name');
    if (!form.gender) missing.push('Gender');
    if (!form.date_of_birth) missing.push('Date of Birth');
    if (!form.nationality) missing.push('Nationality');
    if (!form.email) missing.push('Email');
    if (!form.mobile_number) missing.push('Mobile Number');
    if (!form.mailing_address.street_address) missing.push('Street Address');
    if (!form.mailing_address.city) missing.push('City');
    if (!form.mailing_address.state) missing.push('State/Province');
    if (!form.mailing_address.postal_code) missing.push('Postal Code');
    if (!form.mailing_address.country) missing.push('Country');
    if (missing.length > 0) {
      setError('Please fill all required fields: ' + missing.join(', '));
      return;
    }
    setError('');
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Validate only step 2 required fields
    let missing = [];
    if (!form.emergency_contact.name) missing.push('Emergency Contact Name');
    if (!form.emergency_contact.relationship) missing.push('Emergency Contact Relationship');
    if (!form.emergency_contact.phone_number) missing.push('Emergency Contact Number');
    if (!form.t_shirt_size) missing.push('T-shirt Size');
    // No need to check optional fields
    if (missing.length > 0) {
      if (missing.includes('Emergency Contact Name') || missing.includes('Emergency Contact Relationship') || missing.includes('Emergency Contact Number')) {
        setError('⚠️ Complete emergency contact information required');
      } else {
        setError('Please fill all required fields: ' + missing.join(', '));
      }
      setLoading(false);
      return;
    }
    try {
      let body;
      let headers;
      body = JSON.stringify(form);
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      };
      const response = await fetch('http://localhost:5001/api/profile', {
        method: 'POST',
        headers,
        body,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save profile');
      }
      const result = await response.json();
      setSuccess(true);
      setError('');
      try {
        await updateProfileStatus();
      } catch {}
      setTimeout(() => {
        if (onSubmit) onSubmit(result);
      }, 2000);
    } catch (error) {
      setError(error.message || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-root">
      <div className="profile-box">
        <h2 className="profile-title">Complete Your Profile</h2>
        {!profileLoaded && (
          <div className="loading-message">🔄 Loading your profile data...</div>
        )}
        {error && (
          <div className="error-message">⚠️ {error}</div>
        )}
        {success && (
          <div className="success-message" style={{ fontSize: '1.2rem', padding: '2rem', textAlign: 'center', margin: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Profile Created Successfully!</div>
            <div style={{ fontSize: '1rem', opacity: 0.8 }}>Redirecting to main page...</div>
          </div>
        )}
        {profileLoaded && !success && (
        <form className="profile-form" onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <>
                <div className="input-group">
                  <input type="text" name="full_name" placeholder="Full Name *" value={form.full_name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <select name="gender" value={form.gender} onChange={handleChange} required>
                    <option value="">Select Gender *</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
                <div className="input-group">
                  <input type="date" name="date_of_birth" placeholder="Date of Birth *" value={form.date_of_birth} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="text" name="nationality" placeholder="Nationality *" value={form.nationality} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="email" name="email" placeholder="Email Address *" value={form.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="tel" name="mobile_number" placeholder="Mobile Number *" value={form.mobile_number} onChange={handleChange} required />
                </div>
                <h4>📮 Mailing/Residential Address</h4>
                <div className="input-group">
                  <input type="text" name="mailing_address.street_address" placeholder="Street Address *" value={form.mailing_address.street_address} onChange={handleChange} required />
                </div>
                <div className="address-grid">
                  <div className="input-group">
                    <input type="text" name="mailing_address.city" placeholder="City *" value={form.mailing_address.city} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <input type="text" name="mailing_address.state" placeholder="State/Province *" value={form.mailing_address.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className="address-grid">
                  <div className="input-group">
                    <input type="text" name="mailing_address.postal_code" placeholder="Postal Code *" value={form.mailing_address.postal_code} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <input type="text" name="mailing_address.country" placeholder="Country *" value={form.mailing_address.country} onChange={handleChange} required />
                  </div>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <h4>🚨 Emergency Contact</h4>
                <div className="input-group">
                  <input type="text" name="emergency_contact.name" placeholder="Emergency Contact Name *" value={form.emergency_contact.name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="text" name="emergency_contact.relationship" placeholder="Relationship (e.g., Spouse, Parent) *" value={form.emergency_contact.relationship} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="tel" name="emergency_contact.phone_number" placeholder="Emergency Contact Number *" value={form.emergency_contact.phone_number} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="email" name="emergency_contact.email" placeholder="Emergency Contact Email (Optional)" value={form.emergency_contact.email} onChange={handleChange} />
                </div>
                <h4>🏃 Marathon Info</h4>
                <div className="input-group">
                  <select name="t_shirt_size" value={form.t_shirt_size} onChange={handleChange} required>
                    <option value="">Select T-shirt Size *</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </select>
                </div>
                <div className="input-group">
                  <select name="blood_group" value={form.blood_group} onChange={handleChange}>
                    <option value="unknown">Blood Group (Optional)</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </>
            )}
            <div className="profile-actions">
              {currentStep === 2 && (
                <button type="button" onClick={() => setCurrentStep(1)} className="btn-secondary">
                  ← Previous
                </button>
              )}
              {currentStep === 1 && (
                <button type="button" onClick={handleNextStep} className="btn-primary">
                  Next →
                </button>
              )}
              {currentStep === 2 && (
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? '💾 Saving...' : '✅ Complete Profile'}
                </button>
              )}
            </div>
        </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile; 