import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';

const CustomQRScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let stream;
    let animationId;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true); // for iOS
        await videoRef.current.play();
        setScanning(true);
        scanFrame();
      } catch (err) {
        setError('Camera access denied or not available.');
      }
    };

    const scanFrame = () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) {
        animationId = requestAnimationFrame(scanFrame);
        return;
      }
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code) {
        setScanning(false);
        validateTicket(code.data);
        stopCamera();
      } else {
        animationId = requestAnimationFrame(scanFrame);
      }
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };

    startCamera();

    return () => {
      stopCamera();
    };
    // eslint-disable-next-line
  }, []);

  const validateTicket = async (qrCode) => {
    try {
      const response = await fetch(`/api/registration/verify-json/${qrCode}`);
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
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <video ref={videoRef} style={{ width: 320, height: 240, border: '1px solid #ccc', borderRadius: 4 }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {!error && !scanning && <div style={{ color: 'green', marginTop: 8 }}>Scan complete!</div>}
      {ticketInfo && (
        <div style={{ border: '1px solid green', padding: '1rem', marginTop: '1rem', borderRadius: 4, background: '#f6fff6', color: '#0B405B', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          <p><strong>Name:</strong> {ticketInfo.name}</p>
          <p><strong>Ticket ID:</strong> {ticketInfo.id}</p>
          <p><strong>Email:</strong> {ticketInfo.email}</p>
        </div>
      )}
      {toast && (
        <div style={{ marginTop: 12, color: toast.type === 'success' ? 'green' : 'red', fontWeight: 500 }}>
          {toast.content}
        </div>
      )}
    </div>
  );
};

export default CustomQRScanner; 