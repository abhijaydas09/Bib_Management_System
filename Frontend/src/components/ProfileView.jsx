/**
 * ProfileView.jsx
 * Modern profile view/edit component for marathon user details
 */
import React, { useState, useEffect } from 'react';
import './ProfileView.css';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

const ProfileView = () => {
  const { user, updateProfileStatus } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orgProfile, setOrgProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (user?.role !== 'user') {
          // Fetch organiser profile
          const response = await authService.getOrganizerProfile();
          setOrgProfile(response.organizer);
        } else {
          // Fetch participant profile
          const response = await authService.getProfile();
          setProfile(response.profile || response);
          setForm(response.profile || response);
        }
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  // Calculate age from DOB
  const getAge = (dob) => {
    if (!dob) return '';
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleEdit = () => {
    setForm(profile);
    setEditMode(true);
    setError('');
  };

  const handleCancel = () => {
    setForm(profile);
    setEditMode(false);
    setError('');
  };

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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    // Validate required fields
    let missing = [];
    if (!form.full_name) missing.push('Full Name');
    if (!form.gender) missing.push('Gender');
    if (!form.date_of_birth) missing.push('Date of Birth');
    if (!form.nationality) missing.push('Nationality');
    if (!form.email) missing.push('Email');
    if (!form.mobile_number) missing.push('Mobile Number');
    if (!form.mailing_address?.street_address) missing.push('Street Address');
    if (!form.mailing_address?.city) missing.push('City');
    if (!form.mailing_address?.state) missing.push('State/Province');
    if (!form.mailing_address?.postal_code) missing.push('Postal Code');
    if (!form.mailing_address?.country) missing.push('Country');
    if (!form.emergency_contact?.name) missing.push('Emergency Contact Name');
    if (!form.emergency_contact?.relationship) missing.push('Emergency Contact Relationship');
    if (!form.emergency_contact?.phone_number) missing.push('Emergency Contact Number');
    if (!form.t_shirt_size) missing.push('T-shirt Size');
    
    if (missing.length > 0) {
      setError('Please fill all required fields: ' + missing.join(', '));
      setSaving(false);
      return;
    }

    try {
      const body = JSON.stringify(form);
      const headers = {
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
      setProfile(result.profile || result);
      setEditMode(false);
      setError('');
      await updateProfileStatus();
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  // Save handler
  const handleOrgSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    let missing = [];
    if (!form.name) missing.push('Organisation/Organiser Name');
    if (!form.org_description) missing.push('Description');
    if (!form.email) missing.push('Email');
    if (!form.phone) missing.push('Phone');
    if (!form.address) missing.push('Address');
    if (!form.org_type) missing.push('Type');
    if (missing.length > 0) {
      setError('Please fill all required fields: ' + missing.join(', '));
      setSaving(false);
      return;
    }
    let logo_url = form.logo_url;
    if (logoPreview && logoPreview.startsWith('data:')) {
      logo_url = logoPreview;
    }
    try {
      const body = JSON.stringify({
        org_name: form.name,
        org_description: form.org_description,
        email: form.email,
        phone: form.phone,
        website: form.website,
        social_links: form.social_links,
        address: form.address,
        logo_url,
        org_type: form.org_type
      });
      const headers = {
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
      setOrgProfile(result.organiser);
      setEditMode(false);
      setError('');
      setLogoPreview(null);
      await updateProfileStatus();
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  // Handle logo file change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setForm(f => ({ ...f, logo_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-icon">🔄</div>
          Loading profile...
        </div>
      </div>
    );
  }

  if (error && !editMode) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          {error}
        </div>
      </div>
    );
  }

  if (user?.role !== 'user' && orgProfile) {
    // Inline edit mode for organiser
    const renderOrgValue = (label, value, field, type = 'text', required = false) =>
      editMode ? (
        <input
          type={type}
          name={field}
          placeholder={label + (required ? ' *' : '')}
          value={form[field] || ''}
          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          required={required}
          className="profile-form-input"
          style={{ padding: '1.2rem 1.8rem', border: '1.5px solid #3e7cb133', borderRadius: '1rem', fontSize: '1.1rem', fontFamily: 'inherit', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '100%', minHeight: '3.8rem', boxSizing: 'border-box', marginBottom: 0 }}
        />
      ) : (
        <div className="info-value">{value || 'Not provided'}</div>
      );
    const renderOrgTextarea = (label, value, field, required = false) =>
      editMode ? (
        <textarea
          name={field}
          placeholder={label + (required ? ' *' : '')}
          value={form[field] || ''}
          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          required={required}
          className="profile-form-input"
          style={{ padding: '1.2rem 1.8rem', border: '1.5px solid #3e7cb133', borderRadius: '1rem', fontSize: '1.1rem', fontFamily: 'inherit', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '100%', minHeight: '3.8rem', boxSizing: 'border-box', marginBottom: 0, resize: 'vertical' }}
        />
      ) : (
        <div className="info-value">{value || 'Not provided'}</div>
      );
    const renderOrgSelect = (label, value, field, required = false) =>
      editMode ? (
        <select
          name={field}
          value={form[field] || ''}
          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          required={required}
          className="profile-form-input"
          style={{ padding: '1.2rem 1.8rem', border: '1.5px solid #3e7cb133', borderRadius: '1rem', fontSize: '1.1rem', fontFamily: 'inherit', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '100%', minHeight: '3.8rem', boxSizing: 'border-box', marginBottom: 0 }}
        >
          <option value="">Select Organisation/Organiser Type *</option>
          <option value="company">Company</option>
          <option value="non-profit">Non-profit</option>
          <option value="club">Club</option>
          <option value="individual">Individual</option>
          <option value="other">Other</option>
        </select>
      ) : (
        <div className="info-value">{value || 'Not provided'}</div>
      );
    const renderOrgSocial = (label, value, field) =>
      editMode ? (
        <input
          type="text"
          name={field}
          placeholder={label}
          value={form.social_links?.[field] || ''}
          onChange={e => setForm(f => ({ ...f, social_links: { ...f.social_links, [field]: e.target.value } }))}
          className="profile-form-input"
          style={{ padding: '1.2rem 1.8rem', border: '1.5px solid #3e7cb133', borderRadius: '1rem', fontSize: '1.1rem', fontFamily: 'inherit', background: 'rgba(255,255,255,0.1)', color: '#fff', width: '100%', minHeight: '3.8rem', boxSizing: 'border-box', marginBottom: 0 }}
        />
      ) : (
        value ? (<a href={value} target="_blank" rel="noopener noreferrer">{value}</a>) : 'Not provided'
      );
    return (
      <div className="profile-view-root">
        <div className="profile-view-box">
          <h2 className="profile-title">Organiser Profile</h2>
          <div className="profile-logo" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            {editMode ? (
              logoPreview ? (
                <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: '1rem', background: '#fff', padding: 8, margin: '0 auto', display: 'block' }} />
              ) : form.logo_url ? (
                <img src={form.logo_url} alt="Logo" style={{ maxWidth: 120, maxHeight: 120, borderRadius: '1rem', background: '#fff', padding: 8, margin: '0 auto', display: 'block' }} />
              ) : (
                <div style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem', background: '#fff', fontSize: 64, color: '#3e7cb1', margin: '0 auto', boxShadow: '0 2px 12px #3e7cb133' }}>
                  <span role="img" aria-label="Org">🏢</span>
                </div>
              )
            ) : (
              orgProfile.logo_url ? (
                <img src={orgProfile.logo_url} alt="Logo" style={{ maxWidth: 120, maxHeight: 120, borderRadius: '1rem', background: '#fff', padding: 8 }} />
              ) : (
                <div style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem', background: '#fff', fontSize: 64, color: '#3e7cb1', margin: '0 auto', boxShadow: '0 2px 12px #3e7cb133' }}>
                  <span role="img" aria-label="Org">🏢</span>
                </div>
              )
            )}
            {editMode && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <input type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'block', margin: '0 auto' }} />
                <div style={{ color: '#b0c4de', fontSize: 13, marginTop: 4, textAlign: 'center' }}>(Optional) Upload logo image</div>
              </div>
            )}
          </div>
          <form onSubmit={handleOrgSave}>
            <div className="info-card">
              <h3 className="card-title">Organisation/Organiser Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">Name</div>
                  {renderOrgValue('Organisation/Organiser Name', orgProfile.name, 'name', 'text', true)}
                </div>
                <div className="info-item">
                  <div className="info-label">Type</div>
                  {renderOrgSelect('Type', orgProfile.org_type, 'org_type', true)}
                </div>
                <div className="info-item">
                  <div className="info-label">Description</div>
                  {renderOrgTextarea('Profile/Organisation Description', orgProfile.org_description, 'org_description', true)}
                </div>
                <div className="info-item">
                  <div className="info-label">Email</div>
                  {renderOrgValue('Email', orgProfile.email, 'email', 'email', true)}
                </div>
                <div className="info-item">
                  <div className="info-label">Phone</div>
                  {renderOrgValue('Phone', orgProfile.phone, 'phone', 'tel', true)}
                </div>
                <div className="info-item">
                  <div className="info-label">Website</div>
                  {renderOrgValue('Website', orgProfile.website, 'website', 'text', false)}
                </div>
                <div className="info-item">
                  <div className="info-label">Address</div>
                  {renderOrgValue('Address', orgProfile.address, 'address', 'text', true)}
                </div>
                <div className="info-item">
                  <div className="info-label">Public Profile Link</div>
                  <div className="info-value">{orgProfile.public_profile_link ? (<a href={orgProfile.public_profile_link} target="_blank" rel="noopener noreferrer">{orgProfile.public_profile_link}</a>) : 'Not provided'}</div>
                </div>
              </div>
            </div>
            <div className="info-card">
              <h3 className="card-title">Social Links</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">Facebook</div>
                  {renderOrgSocial('Facebook', orgProfile.social_links?.facebook, 'facebook')}
                </div>
                <div className="info-item">
                  <div className="info-label">Instagram</div>
                  {renderOrgSocial('Instagram', orgProfile.social_links?.instagram, 'instagram')}
                </div>
                <div className="info-item">
                  <div className="info-label">LinkedIn</div>
                  {renderOrgSocial('LinkedIn', orgProfile.social_links?.linkedin, 'linkedin')}
                </div>
                <div className="info-item">
                  <div className="info-label">Twitter</div>
                  {renderOrgSocial('Twitter', orgProfile.social_links?.twitter, 'twitter')}
                </div>
              </div>
            </div>
            {editMode && (
              <div className="profile-actions" style={{ marginTop: 24 }}>
                <button type="button" className="btn-secondary" onClick={() => { setEditMode(false); setForm(orgProfile); }}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
              </div>
            )}
            {error && <div className="error-message">{error}</div>}
          </form>
          {!editMode && (
            <div className="profile-actions" style={{ marginTop: 24 }}>
              <button className="btn-primary" onClick={() => { setEditMode(true); setForm(orgProfile); }}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!profile && !editMode) {
    return (
      <div className="no-profile-container">
        <div className="no-profile-content">
          <div className="no-profile-icon">��</div>
          No profile found.
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'personal', label: 'Personal Info', icon: '📝' },
    { id: 'contact', label: 'Contact Details', icon: '📞' },
    { id: 'address', label: 'Address', icon: '📍' },
    { id: 'emergency', label: 'Emergency Contact', icon: '🚨' },
    { id: 'marathon', label: 'Marathon Info', icon: '🏃' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="profile-content">
            {/* Personal Information */}
            <div className="info-card">
              <h3 className="card-title">👤 Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">Full Name</div>
                  <div className="info-value">{profile?.full_name || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Age</div>
                  <div className="info-value">{getAge(profile?.date_of_birth) || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Gender</div>
                  <div className="info-value">{profile?.gender || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Nationality</div>
                  <div className="info-value">{profile?.nationality || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Date of Birth</div>
                  <div className="info-value">
                    {profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : 'Not provided'}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="info-card">
              <h3 className="card-title">📞 Contact Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">Email Address</div>
                  <div className="info-value">{profile?.email || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Mobile Number</div>
                  <div className="info-value">{profile?.mobile_number || 'Not provided'}</div>
                </div>
              </div>
            </div>

            {/* Mailing Address */}
            <div className="info-card">
              <h3 className="card-title">📍 Mailing Address</h3>
              <div className="info-grid">
                <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                  <div className="info-label">Street Address</div>
                  <div className="info-value">{profile?.mailing_address?.street_address || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">City</div>
                  <div className="info-value">{profile?.mailing_address?.city || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">State/Province</div>
                  <div className="info-value">{profile?.mailing_address?.state || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Postal Code</div>
                  <div className="info-value">{profile?.mailing_address?.postal_code || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Country</div>
                  <div className="info-value">{profile?.mailing_address?.country || 'Not provided'}</div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="info-card">
              <h3 className="card-title">🚨 Emergency Contact</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">Contact Name</div>
                  <div className="info-value">{profile?.emergency_contact?.name || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Relationship</div>
                  <div className="info-value">{profile?.emergency_contact?.relationship || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Phone Number</div>
                  <div className="info-value">{profile?.emergency_contact?.phone_number || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Email (Optional)</div>
                  <div className="info-value">{profile?.emergency_contact?.email || 'Not provided'}</div>
                </div>
              </div>
            </div>

            {/* Marathon Information */}
            <div className="info-card">
              <h3 className="card-title">🏃 Marathon Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">T-shirt Size</div>
                  <div className="info-value">{profile?.t_shirt_size || 'Not provided'}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Blood Group</div>
                  <div className="info-value">{profile?.blood_group || 'Not provided'}</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="profile-content">
            <div className="info-card">
              <h3 className="card-title">📝 Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    name="full_name" 
                    value={form?.full_name || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select name="gender" value={form?.gender || ''} onChange={handleChange} disabled={!editMode} required className="form-select">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Date of Birth *</label>
                  <input 
                    type="date" 
                    name="date_of_birth" 
                    value={form?.date_of_birth ? form.date_of_birth.slice(0,10) : ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input 
                    type="text" 
                    value={getAge(form?.date_of_birth)} 
                    disabled 
                    readOnly 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nationality *</label>
                  <input 
                    type="text" 
                    name="nationality" 
                    value={form?.nationality || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="profile-content">
            <div className="info-card">
              <h3 className="card-title">📞 Contact Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={form?.email || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input 
                    type="tel" 
                    name="mobile_number" 
                    value={form?.mobile_number || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'address':
        return (
          <div className="profile-content">
            <div className="info-card">
              <h3 className="card-title">📍 Mailing Address</h3>
              <div className="form-grid">
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Street Address *</label>
                  <input 
                    type="text" 
                    name="mailing_address.street_address" 
                    value={form?.mailing_address?.street_address || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input 
                    type="text" 
                    name="mailing_address.city" 
                    value={form?.mailing_address?.city || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State/Province *</label>
                  <input 
                    type="text" 
                    name="mailing_address.state" 
                    value={form?.mailing_address?.state || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Postal Code *</label>
                  <input 
                    type="text" 
                    name="mailing_address.postal_code" 
                    value={form?.mailing_address?.postal_code || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Country *</label>
                  <input 
                    type="text" 
                    name="mailing_address.country" 
                    value={form?.mailing_address?.country || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'emergency':
        return (
          <div className="profile-content">
            <div className="info-card">
              <h3 className="card-title">🚨 Emergency Contact</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Emergency Contact Name *</label>
                  <input 
                    type="text" 
                    name="emergency_contact.name" 
                    value={form?.emergency_contact?.name || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Relationship *</label>
                  <input 
                    type="text" 
                    name="emergency_contact.relationship" 
                    placeholder="e.g., Spouse, Parent, Friend"
                    value={form?.emergency_contact?.relationship || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Emergency Contact Number *</label>
                  <input 
                    type="tel" 
                    name="emergency_contact.phone_number" 
                    value={form?.emergency_contact?.phone_number || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    required 
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Emergency Contact Email (Optional)</label>
                  <input 
                    type="email" 
                    name="emergency_contact.email" 
                    value={form?.emergency_contact?.email || ''} 
                    onChange={handleChange} 
                    disabled={!editMode} 
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'marathon':
        return (
          <div className="profile-content">
            <div className="info-card">
              <h3 className="card-title">🏃 Marathon Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">T-shirt Size *</label>
                  <select name="t_shirt_size" value={form?.t_shirt_size || ''} onChange={handleChange} disabled={!editMode} required className="form-select">
                    <option value="">Select T-shirt Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Blood Group (Optional)</label>
                  <select name="blood_group" value={form?.blood_group || 'unknown'} onChange={handleChange} disabled={!editMode} className="form-select">
                    <option value="unknown">Select Blood Group</option>
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
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="profile-view-container">
      {/* Sidebar */}
      <div className="profile-sidebar">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {profile?.full_name?.charAt(0)?.toUpperCase() || '👤'}
          </div>
          <h3 className="profile-name">
            {profile?.full_name || 'User Profile'}
          </h3>
          <div className="profile-email">
            {profile?.email || 'No email'}
          </div>
        </div>

        {/* Navigation */}
        <nav className="profile-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>

        {/* Edit Button */}
        <div className="edit-section">
          {!editMode ? (
            <button onClick={handleEdit} className="edit-btn">
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="save-btn">
                {saving ? '💾 Saving...' : '💾 Save'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-main">
        {/* Header */}
        <div className="profile-header-bar">
          <div>
            <h1 className="header-title">
              {sections.find(s => s.id === activeSection)?.label || 'Profile'}
            </h1>
            <p className="header-subtitle">
              Manage your marathon profile information
            </p>
          </div>
          {editMode && (
            <div className="edit-mode-indicator">
              ✏️ Edit Mode Active
            </div>
          )}
        </div>

        {/* Content */}
        <div className="profile-content">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
          
          <form onSubmit={handleSave}>
            {renderSection()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileView; 