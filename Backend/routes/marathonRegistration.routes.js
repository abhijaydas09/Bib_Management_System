import express from 'express';
import { createMarathonRegistration } from '../controller/marathonregistration.js';
import { verifyQrCode } from '../controller/registrationController.js';
import { getRegistrationsByEvent } from '../controller/registrationController.js';

const router = express.Router();

router.post('/api/registration', createMarathonRegistration);
router.get('/api/registration/verify/:qrCode', verifyQrCode);
router.get('/api/registrations/event/:eventId', getRegistrationsByEvent);

export default router;
