import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';

const QrPage = () => {
  const { eventId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/registrations/event/${eventId}`);
        if (response.data.success) {
          setRegistrations(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching registrations:", err);
      }
      setLoading(false);
    };
    fetchRegistrations();
  }, [eventId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>QR Codes for Event ID: {eventId}</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {registrations.map(reg => (
          <div key={reg._id} style={{ margin: "10px", textAlign: "center" }}>
            <QRCode
              value={`http://localhost:8000/api/registration/verify/${reg.qrCode}`}
              size={128}
            />
            <p>{reg.firstName} {reg.lastName}</p>
            <small>Bib: {reg.bibNumber}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QrPage;