import QRCode from 'qrcode';

const myQrString = "51479343ab8c6daf"; // fetched from DB
const qrUrl = `http://localhost:8000/api/registration/verify/${myQrString}`;

// 1. Generate as a Data URL (for storing in DB or embedding in HTML)
QRCode.toDataURL(qrUrl, (err, url) => {
  if (err) return console.error(err);
  console.log("QR Code as Data URL:", url);
});

// 2. Also save as PNG file on disk
QRCode.toFile('bib_qr.png', qrUrl, (err) => {
  if (err) return console.error(err);
  console.log("QR code saved to bib_qr.png");
});
