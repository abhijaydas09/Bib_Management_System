import React, { useState, useRef } from 'react';
import StaffNavbar from '../../components/tabs/StaffNavbar';
import Table from '../../components/table/Table';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import { FaCamera } from 'react-icons/fa';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import jsQR from 'jsqr';
import Toast from '../../components/toast/Toast';
import QRScannerTest from './QRScannerTest';

// Columns for Bib Collection tab
const bibCollectionColumns = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Phone Number', key: 'phone' },
  { label: 'Timestamp', key: 'timestamp' },
  { label: 'Category', key: 'category' },
  { label: 'BIB Number', key: 'bib' },
  { label: 'Actions', key: 'actions', render: (val, row) => <button className="table-details-btn">Details</button> },
];

// Columns for Attendance tab (Attendance Status is now "Marked")
const attendanceColumns = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Phone Number', key: 'phone' },
  { label: 'Timestamp', key: 'timestamp' },
  { label: 'Category', key: 'category' },
  { label: 'Marked', key: 'marked' },
  { label: 'Actions', key: 'actions', render: (val, row) => <button className="table-details-btn">Details</button> },
];

// Mock data for Bib Collection
const bibCollectionData = [
  { firstName: 'Archit', lastName: 'Chitte', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', bib: '1-0001' },
  { firstName: 'Abhijay', lastName: 'Das', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT02', bib: '2-0001' },
  { firstName: 'Samresh', lastName: 'Chaudhari', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', bib: '1-0002' },
  { firstName: 'Nidhi', lastName: 'Purthan', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT03', bib: '3-0001' },
  { firstName: 'Parth', lastName: 'Narkar', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT02', bib: '2-0002' },
  { firstName: 'Varun', lastName: 'Rahatgaonkar', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', bib: '1-0003' },
  { firstName: 'Tanaya', lastName: 'Jain', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT02', bib: '2-0005' },
  { firstName: 'Atharva', lastName: 'Pingle', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT03', bib: '3-0002' },
  { firstName: 'Nikhil', lastName: 'Kale', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', bib: '1-0004' },
  { firstName: 'Amav', lastName: 'Chouahary', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT03', bib: '3-0003' },
];

// Mock data for Attendance (Marked column is always "Marked")
const attendanceData = [
  { firstName: 'Archit', lastName: 'Chitte', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', marked: 'Marked' },
  { firstName: 'Abhijay', lastName: 'Das', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT02', marked: 'Marked' },
  { firstName: 'Samresh', lastName: 'Chaudhari', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', marked: 'Marked' },
  { firstName: 'Nidhi', lastName: 'Purthan', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT03', marked: 'Marked' },
  { firstName: 'Parth', lastName: 'Narkar', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT02', marked: 'Marked' },
  { firstName: 'Varun', lastName: 'Rahatgaonkar', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', marked: 'Marked' },
  { firstName: 'Tanaya', lastName: 'Jain', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT02', marked: 'Marked' },
  { firstName: 'Atharva', lastName: 'Pingle', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT03', marked: 'Marked' },
  { firstName: 'Nikhil', lastName: 'Kale', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', marked: 'Marked' },
  { firstName: 'Amav', lastName: 'Chouahary', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT03', marked: 'Marked' },
];

function QRLogs() {
  const [activeTab, setActiveTab] = useState('bib'); // 'bib' or 'attendance'
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [dummySrot, setDummySrot] = useState('');
  const [dummyFilter, setDummyFilter] = useState('');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [participantInfo, setParticipantInfo] = useState(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [infoError, setInfoError] = useState('');
  const fileInputRef = useRef();
  const [toast, setToast] = useState(null);
  const [qrValue, setQrValue] = useState(null);

  // Helper to extract qrCode from various QR formats
  function extractQrCode(value) {
    if (!value) return '';
    // If value is a URL, get last path segment
    try {
      const url = new URL(value);
      const segments = url.pathname.split('/').filter(Boolean);
      if (segments.length > 0) return segments[segments.length - 1];
    } catch (e) { /* Not a URL */ }
    // If value is JSON, try to parse and get qrCode property
    try {
      const obj = JSON.parse(value);
      if (obj.qrCode) return obj.qrCode;
    } catch (e) { /* Not JSON */ }
    // Otherwise, return as is
    return value;
  }

  // QR scan handler: fetch participant info and show modal
  const handleScan = async (result) => {
    if (result && result[0] && result[0].rawValue) {
      setScannerOpen(false);
      setLoadingInfo(true);
      setInfoError('');
      try {
        const qrCode = extractQrCode(result[0].rawValue);
        const regRes = await axios.get(`/api/registration/verify/${qrCode}`);
        if (!regRes.data.success || !regRes.data.data) {
          setToast({ type: 'error', content: 'No registration found' });
          setLoadingInfo(false);
          return;
        }
        setParticipantInfo(regRes.data.data);
        setInfoModalOpen(true);
      } catch (err) {
        setToast({ type: 'error', content: err.message || 'Failed to fetch participant info' });
      } finally {
        setLoadingInfo(false);
      }
    }
  };

  // Handle QR image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, img.width, img.height);
        if (code && code.data) {
          handleScan([{ rawValue: code.data }]);
        } else {
          setInfoError('No QR code found in the uploaded image.');
        }
      };
      img.onerror = () => setInfoError('Failed to load image.');
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Filtered data for Bib Collection
  const filteredBibData = bibCollectionData.filter(row =>
    row.firstName.toLowerCase().includes(search.toLowerCase()) ||
    row.lastName.toLowerCase().includes(search.toLowerCase()) ||
    row.phone.includes(search) ||
    (row.bib && row.bib.includes(search))
  );

  // Filtered data for Attendance
  const filteredAttendanceData = attendanceData.filter(row =>
    row.firstName.toLowerCase().includes(search.toLowerCase()) ||
    row.lastName.toLowerCase().includes(search.toLowerCase()) ||
    row.phone.includes(search)
  );

  // Reset page when switching tabs
  React.useEffect(() => {
    setPage(0);
  }, [activeTab]);

  const handleError = (err) => {
    setToast({
      type: 'error',
      content: `Error: ${err?.message || err}`,
    });
  };

  const handleModalClose = () => {
    setQrValue(null);
    setToast({ type: 'success', content: 'QR scanned successfully!' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafd' }}>
      <StaffNavbar activeTab="/staff/qr-logs" />
      <div style={{ padding: 32, background: '#fff', minHeight: 'calc(100vh - 64px)' }}>
        {/* Open Scanner Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <button
            style={{
              width: 165,
              height: 45,
              borderRadius: 2,
              background: '#0B405B',
              color: '#fff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 400,
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
            onClick={() => setScannerOpen(true)}
          >
            <FaCamera style={{ fontSize: 24, color: '#fff' }} />
            Open Scanner
          </button>
        </div>
        {/* Scanner Modal */}
        {scannerOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 24, position: 'relative', minWidth: 320 }}>
              <button
                onClick={() => setScannerOpen(false)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 36,
                  height: 36,
                  background: '#fff',
                  color: '#0B405B',
                  fontSize: 22,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 10
                }}
                aria-label="Close"
              >
                &times;
              </button>
              <QRScannerTest
                onScan={handleScan}
                onError={handleError}
                onClose={() => setScannerOpen(false)}
                hideNavbar={true}
                hideCloseButton={true}
              />
            </div>
          </div>
        )}
        {/* Participant Info Modal */}
        {infoModalOpen && participantInfo && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 32, minWidth: 400, minHeight: 320, position: 'relative', boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}>
              <button
                onClick={() => setInfoModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 36,
                  height: 36,
                  background: '#fff',
                  color: '#0B405B',
                  fontSize: 22,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 10
                }}
                aria-label="Close"
              >
                &times;
              </button>
              {/* Modal Content */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: '#0B405B', marginBottom: 8 }}>{participantInfo.eventName || 'EVENT NAME'}</div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: '#0B405B', marginBottom: 8 }}>{participantInfo.firstName} {participantInfo.lastName}</div>
                  <div style={{ fontWeight: 400, fontSize: 14, color: '#0B405B', marginBottom: 4 }}>Bib Number: <span style={{ fontWeight: 500 }}>{participantInfo.bibNumber}</span></div>
                  <div style={{ fontWeight: 400, fontSize: 14, color: '#0B405B', marginBottom: 4 }}>Category: <span style={{ fontWeight: 500 }}>{participantInfo.category || ''}</span></div>
                  <div style={{ fontWeight: 400, fontSize: 14, color: '#0B405B', marginBottom: 4 }}>T-Shirt Size: <span style={{ fontWeight: 500 }}>{participantInfo.kitSize}</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaCamera style={{ color: '#0B405B', fontSize: 18 }} />
                      <span style={{ fontWeight: 400, fontSize: 14 }}>{participantInfo.eventDate ? new Date(participantInfo.eventDate).toLocaleDateString() : 'EVENT DATE'}</span>
                    </span>
                    <span style={{ fontWeight: 400, fontSize: 14 }}>{participantInfo.venue || 'VENUE'}</span>
                  </div>
                </div>
                {/* Avatar/Initials */}
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#eaf4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#0B405B', fontWeight: 600 }}>
                  {participantInfo.firstName?.[0]}{participantInfo.lastName?.[0]}
                </div>
              </div>
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 12, marginTop: 32, justifyContent: 'flex-end' }}>
                <button style={{ background: '#e3e8ef', color: '#0B405B', border: 'none', borderRadius: 2, padding: '8px 18px', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>Mark Attendance</button>
                <button style={{ background: '#0B405B', color: '#fff', border: 'none', borderRadius: 2, padding: '8px 18px', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>Bib Collected</button>
              </div>
            </div>
          </div>
        )}
        {/* Loading/Error Modal */}
        {loadingInfo && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div style={{ background: '#fff', padding: 32, borderRadius: 8, fontSize: 18, color: '#0B405B', fontWeight: 600 }}>Loading participant info...</div>
          </div>
        )}
        {infoError && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(255,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div style={{ background: '#fff', padding: 32, borderRadius: 8, fontSize: 18, color: '#e53935', fontWeight: 600 }}>{infoError}</div>
          </div>
        )}
        {/* Modal to show scanned QR value */}
        {qrValue && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 32, minWidth: 320, minHeight: 120, position: 'relative', boxShadow: '0 2px 16px rgba(0,0,0,0.12)' }}>
              <button
                onClick={handleModalClose}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 36,
                  height: 36,
                  background: '#fff',
                  color: '#0B405B',
                  fontSize: 22,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 10
                }}
                aria-label="Close"
              >
                &times;
              </button>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#0B405B', marginBottom: 12 }}>Scanned QR Value</div>
              <div style={{ fontWeight: 400, fontSize: 16, color: '#0B405B', wordBreak: 'break-all' }}>{qrValue}</div>
            </div>
          </div>
        )}
        {toast && (
          <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 2000 }}>
            <Toast
              type={toast.type}
              content={toast.content}
              onDismiss={() => setToast(null)}
            />
          </div>
        )}
        {/* Search/filter/tabs bar */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 24, marginTop: -45 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <BasicTextInput
              placeholder="SEARCH"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: 240, height: 32, fontSize: 8.5 }}
            />
            <select
              value={dummySrot}
              onChange={e => setDummySrot(e.target.value)}
              style={{ height: 35, borderRadius: 2, border: '1px solid #000', color: '#676767', background: '#fff', padding: '0 8px', fontSize: 8.5, marginLeft:16}}
            >
              <option value="">SORT</option>
              <option value="dummy1">Dummy Srot 1</option>
              <option value="dummy2">Dummy Srot 2</option>
            </select>
            <select
              value={dummyFilter}
              onChange={e => setDummyFilter(e.target.value)}
              style={{ height: 35, borderRadius: 2, color: '#676767', border: '1px solid #000', background: '#fff', padding: '0 8px', fontSize: 8.5, marginLeft:4 }}
            >
              <option value="">FILTER</option>
              <option value="dummy1">Dummy Filter 1</option>
              <option value="dummy2">Dummy Filter 2</option>
            </select>
            {/* Tabs */}
            <div style={{ display: 'flex', marginLeft: 16 }}>
              <button
                onClick={() => setActiveTab('bib')}
                style={{
                  height: 35,
                  borderRadius: 2,
                  background: activeTab === 'bib' ? '#0B405B' : '#e3e8ef',
                  color: activeTab === 'bib' ? '#fff' : '#0B405B',
                  padding: '0 24px',
                  fontSize: 10,
                  border: 'none',
                  fontWeight: 400,
                  marginLeft: -10,
                  marginRight: 24,
                  cursor: activeTab === 'bib' ? 'default' : 'pointer',
                  transition: 'background 0.2s, color 0.2s'
                }}
                disabled={activeTab === 'bib'}
              >
                Bib Collection
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                style={{
                  height: 35,
                  borderRadius: 2,
                  background: activeTab === 'attendance' ? '#0B405B' : '#e3e8ef',
                  color: activeTab === 'attendance' ? '#fff' : '#0B405B',
                  padding: '0 24px',
                  fontSize: 10,
                  border: 'none',
                  fontWeight: 400,
                  cursor: activeTab === 'attendance' ? 'default' : 'pointer',
                  mmarginLeft: 16,
                  transition: 'background 0.2s, color 0.2s'
                }}
                disabled={activeTab === 'attendance'}
              >
                Attendance
              </button>
            </div>
          </div>
        </div>
        {/* Table area */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {activeTab === 'bib' ? (
            <Table
              columns={bibCollectionColumns}
              data={filteredBibData.slice(page * pageSize, (page + 1) * pageSize)}
              page={page}
              pageSize={pageSize}
              total={filteredBibData.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          ) : (
            <Table
              columns={attendanceColumns}
              data={filteredAttendanceData.slice(page * pageSize, (page + 1) * pageSize)}
              page={page}
              pageSize={pageSize}
              total={filteredAttendanceData.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QRLogs; 