import React, { useState, useRef, useEffect } from 'react';
import StaffNavbar from '../../components/tabs/StaffNavbar';
import Toast from '../../components/toast/Toast';
import { Html5Qrcode } from 'html5-qrcode';

function QRScannerTest({ onScan, onError, onClose, hideNavbar, hideCloseButton }) {
  const [scannerOpen, setScannerOpen] = useState(true);
  const [toast, setToast] = useState(null);
  const [qrValue, setQrValue] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    let html5QrCodeInstance = null;
    if (scannerOpen) {
      const qrRegionId = 'qr-reader';
      setTimeout(() => {
        const qrDiv = document.getElementById(qrRegionId);
        if (qrDiv && isMounted) {
          html5QrCodeInstance = new Html5Qrcode(qrRegionId);
          html5QrCodeRef.current = html5QrCodeInstance;
          html5QrCodeInstance
            .start(
              { facingMode: 'environment' },
              { fps: 10, qrbox: 250 },
              async (decodedText) => {
                setScannerOpen(false);
                setQrValue(decodedText);
                // Validate ticket with backend
                try {
                  const response = await fetch(`/api/registration/verify-json/${decodedText}`);
                  const result = await response.json();
                  if (result.valid) {
                    setTicketInfo(result.ticket);
                    setToast({ type: 'success', content: '✅ Valid ticket: ' + result.ticket.name });
                  } else {
                    setTicketInfo(null);
                    setToast({ type: 'error', content: '❌ Invalid or already used ticket.' });
                  }
                } catch (err) {
                  setTicketInfo(null);
                  setToast({ type: 'error', content: 'Error validating ticket' });
                }
                if (onScan) onScan([{ rawValue: decodedText }]);
                if (onClose) onClose();
                html5QrCodeInstance && html5QrCodeInstance.stop().catch(() => {});
              },
              (scanError) => {
                // Optionally handle scan errors
              }
            )
            .catch((err) => {
              setToast({ type: 'error', content: `Camera error: ${err}` });
              if (onError) onError(err);
            });
        }
      }, 100);
    }
    return () => {
      isMounted = false;
      if (html5QrCodeRef.current) {
        const qrInstance = html5QrCodeRef.current;
        qrInstance.stop()
          .then(() => qrInstance.clear())
          .catch(() => {})
          .finally(() => {
            html5QrCodeRef.current = null;
          });
      }
    };
    // eslint-disable-next-line
  }, [scannerOpen]);

  const handleModalClose = () => {
    setQrValue(null);
    setTicketInfo(null);
    setScannerOpen(false);
    if (onClose) onClose();
  };

  // Handle QR image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const result = await Html5Qrcode.scanFileV2(file, true);
      if (result && result.decodedText) {
        setScannerOpen(false);
        setQrValue(result.decodedText);
        // Validate ticket with backend
        try {
          const response = await fetch(`/api/registration/verify-json/${result.decodedText}`);
          const backendResult = await response.json();
          if (backendResult.valid) {
            setTicketInfo(backendResult.ticket);
            setToast({ type: 'success', content: '✅ Valid ticket: ' + backendResult.ticket.name });
          } else {
            setTicketInfo(null);
            setToast({ type: 'error', content: '❌ Invalid or already used ticket.' });
          }
        } catch (err) {
          setTicketInfo(null);
          setToast({ type: 'error', content: 'Error validating ticket' });
        }
        if (onScan) onScan([{ rawValue: result.decodedText }]);
        if (onClose) onClose();
      } else {
        setToast({ type: 'error', content: 'No QR code found in the uploaded image.' });
        if (onError) onError(new Error('No QR code found in the uploaded image.'));
      }
    } catch (err) {
      setToast({ type: 'error', content: 'Failed to scan QR from image.' });
      if (onError) onError(err);
    }
  };

  return (
    <>
      {!hideNavbar && <StaffNavbar />}
      {scannerOpen && (
        <div style={{ position: 'relative', minWidth: 320 }}>
          {!hideCloseButton && (
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
          <div id="qr-reader" style={{ width: 320, height: 320, margin: '0 auto' }} />
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
      {ticketInfo && (
        <div style={{ border: '1px solid green', padding: '1rem', marginTop: '1rem', borderRadius: 4, background: '#f6fff6', color: '#0B405B', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          <p><strong>Name:</strong> {ticketInfo.name}</p>
          <p><strong>Ticket ID:</strong> {ticketInfo.id}</p>
          <p><strong>Email:</strong> {ticketInfo.email}</p>
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