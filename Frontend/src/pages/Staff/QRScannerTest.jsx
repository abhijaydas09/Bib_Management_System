import React, { useState, useRef, useEffect } from 'react';
import StaffNavbar from '../../components/tabs/StaffNavbar';
import Toast from '../../components/toast/Toast';
import jsQR from 'jsqr';
import ParticipantDetailsModal from '../../components/modal/ParticipantDetailsModal';

const QRScannerTest = ({ onScan, onError, onClose, hideNavbar, hideCloseButton }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState('');
  const [ticketInfo, setTicketInfo] = useState(null);
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsScanning(true);
          startScanning();
        };
      }
      setError('');
    } catch (err) {
      setError('Camera access denied or not available');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
  };

  // Helper to extract code from URL or plain code
  const extractQrCode = (data) => {
    // Match full URL, path, or just the code
    const match = data.match(/(?:https?:\/\/[^\/]+)?\/api\/registration\/verify(?:-json)?\/([a-zA-Z0-9]+)/);
    if (match) return match[1];
    // If it's just the code, return as is
    return data;
  };

  const startScanning = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    scanIntervalRef.current = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
        if (qrCode) {
          setScannedData(qrCode.data);
          const code = extractQrCode(qrCode.data);
          console.log('Extracted code:', code); // Debug log
          validateTicket(code);
          stopCamera();
        }
      }
    }, 100);
  };

  const validateTicket = async (qrCode) => {
    try {
      console.log('Fetching:', `/api/registration/verify-json/${qrCode}`);
      const response = await fetch(`/api/registration/verify-json/${qrCode}`);
      console.log('Fetch response:', response);
      const result = await response.json();
      console.log('Backend result:', result);
      if (result.valid) {
        setTicketInfo(result.ticket);
        setToast({ type: 'success', content: '✅ Valid ticket: ' + result.ticket.name });
        setModalOpen(true);
      } else {
        setTicketInfo(null);
        setToast({ type: 'error', content: '❌ Invalid or already used ticket.' });
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setTicketInfo(null);
      setToast({ type: 'error', content: 'Error validating ticket' });
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line
  }, []);

  const handleModalClose = () => {
    setScannedData(null);
    setTicketInfo(null);
    setIsScanning(false);
    setModalOpen(false);
    stopCamera();
    if (onClose) onClose();
  };

  // Handler for Mark Attendance
  const handleMarkAttendance = async () => {
    if (!ticketInfo || !ticketInfo.qrCode) return;
    const staffName = prompt('Enter your name to mark atdance:');
    if (!staffName) return;
    try {
      const response = await fetch(`/api/registration/markAttendance/${ticketInfo.qrCode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffName })
      });
      if (response.ok) {
        setToast({ type: 'success', content: 'Attendance marked!' });
        setModalOpen(false);
      } else {
        const text = await response.text();
        setToast({ type: 'error', content: text || 'Failed to mark attendance.' });
      }
    } catch (err) {
      setToast({ type: 'error', content: 'Error marking attendance.' });
    }
  };

  // Handler for Mark Bib Collected
  const handleMarkBibCollected = async () => {
    if (!ticketInfo || !ticketInfo.qrCode) return;
    const staffName = prompt('Enter your name to mark bib collected:');
    if (!staffName) return;
    try {
      const response = await fetch(`/api/registration/markBib/${ticketInfo.qrCode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffName })
      });
      if (response.ok) {
        setToast({ type: 'success', content: 'Bib marked as collected!' });
        setModalOpen(false);
      } else {
        const text = await response.text();
        setToast({ type: 'error', content: text || 'Failed to mark bib collected.' });
      }
    } catch (err) {
      setToast({ type: 'error', content: 'Error marking bib collected.' });
    }
  };

  return (
    <>
      {!hideNavbar && <StaffNavbar />}
      <div style={{ position: 'relative', minWidth: 320, marginTop: 24 }}>
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
        <video ref={videoRef} style={{ width: 320, height: 240, border: '1px solid #ccc', borderRadius: 4, display: isScanning ? 'block' : 'none', margin: '0 auto' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
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
              marginRight: 8
            }}
            onClick={startCamera}
            disabled={isScanning}
          >
            Start Scanner
          </button>
          <button
            style={{
              background: '#888',
              color: '#fff',
              border: 'none',
              borderRadius: 2,
              padding: '8px 18px',
              fontWeight: 500,
              fontSize: 13,
              cursor: 'pointer',
              marginLeft: 8
            }}
            onClick={stopCamera}
            disabled={!isScanning}
          >
            Stop Scanner
          </button>
        </div>
      </div>
      {error && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{error}</div>}
      <ParticipantDetailsModal
        open={modalOpen}
        onClose={handleModalClose}
        participant={ticketInfo}
        onMarkAttendance={handleMarkAttendance}
        onMarkBibCollected={handleMarkBibCollected}
      />
      {toast && (
        <Toast
          type={toast.type}
          content={toast.content}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default QRScannerTest; 