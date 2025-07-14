import React, { useState, useRef } from 'react';
import StaffNavbar from '../../components/tabs/StaffNavbar';
import { Scanner } from '@yudiel/react-qr-scanner';
import Toast from '../../components/toast/Toast';

// import jsQR from 'jsqr';

function QRScannerTest({ onScan, onError, onClose, hideNavbar, hideCloseButton }) {
  const [scannerOpen, setScannerOpen] = useState(true);
  const [toast, setToast] = useState(null);
  const [qrValue, setQrValue] = useState(null);
  const fileInputRef = useRef();

  const handleScan = (result) => {
    if (result && result[0] && result[0].rawValue) {
      setScannerOpen(false);
      setQrValue(result[0].rawValue);
      setToast({ type: 'success', content: 'QR scanned successfully!' });
      if (onScan) onScan(result);
      if (onClose) onClose();
    }
  };

  const handleError = (err) => {
    setToast({
      type: 'error',
      content: `Error: ${err?.message || err}`,
    });
    if (onError) onError(err);
  };

  const handleModalClose = () => {
    setQrValue(null);
    setScannerOpen(false);
    if (onClose) onClose();
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
          if (onScan) onScan([{ rawValue: code.data }]);
          if (onClose) onClose();
        } else {
          setToast({ type: 'error', content: 'No QR code found in the uploaded image.' });
          if (onError) onError(new Error('No QR code found in the uploaded image.'));
        }
      };
      img.onerror = () => {
        setToast({ type: 'error', content: 'Failed to load image.' });
        if (onError) onError(new Error('Failed to load image.'));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {!hideNavbar && <StaffNavbar />}
      {scannerOpen && (
        <div style={{
          position: 'relative',
          minWidth: 320
        }}>
          { !hideCloseButton && (
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
          )}
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
      )}
      {toast && (
        <Toast
          type={toast.type}
          content={toast.content}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default QRScannerTest; 