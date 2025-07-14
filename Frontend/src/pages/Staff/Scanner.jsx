import React, { useState, useRef } from 'react';
import StaffNavbar from '../../components/tabs/StaffNavbar';
import { Scanner } from '@yudiel/react-qr-scanner';
import Toast from '../../components/toast/Toast';
import jsQR from 'jsqr';

function Scanner() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [qrValue, setQrValue] = useState(null);
  const fileInputRef = useRef();

  const handleScan = (result) => {
    if (result && result[0] && result[0].rawValue) {
      setScannerOpen(false);
      setQrValue(result[0].rawValue);
      setToast({ type: 'success', content: 'QR scanned successfully!' });
    }
  };

  const handleError = (err) => {
    setToast({
      type: 'error',
      content: `Error: ${err?.message || err}`,
    });
  };

  const handleModalClose = () => {
    setQrValue(null);
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
          setScannerOpen(false);
          setQrValue(code.data);
          setToast({ type: 'success', content: 'QR scanned successfully!' });
        } else {
          setToast({ type: 'error', content: 'No QR code found in the uploaded image.' });
        }
      };
      img.onerror = () => setToast({ type: 'error', content: 'Failed to load image.' });
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafd' }}>
      <StaffNavbar />
      <div style={{ padding: 32, background: '#fff', minHeight: 'calc(100vh - 64px)' }}>
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
          Open Scanner
        </button>
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
              <Scanner
                onResult={handleScan}
                onError={handleError}
                styles={{ container: { width: 320, height: 320 } }}
              />
              <div style={{ textAlign: 'center', marginTop: 12, color: '#0B405B', fontWeight: 500 }}>Scan QR Code</div>
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <button
                  style={{
                    background: '#0B405B',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 2,
                    padding: '8px 18px',
                    fontWeight: 500,
                    fontSize: 13,
                    cursor: 'pointer',
                    marginTop: 8
                  }}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  Upload QR
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
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
      </div>
    </div>
  );
}

export default Scanner; 