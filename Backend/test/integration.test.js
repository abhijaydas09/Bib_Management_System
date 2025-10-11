const request = require('supertest');
const app = require('../app');
const db = require('./setup');

describe('Integration tests', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  test('participant signup and login, organizer signup, create event, register, staff creation and QR scan', async () => {
    // Participant signup
    const pSignup = await request(app).post('/api/auth/signup').send({
      firstName: 'Test', lastName: 'Participant', gender: 'Female', phoneNumber: '9000000001', email: 'p@example.com', password: 'pass1234'
    });
    expect(pSignup.status).toBe(201);

    // Participant login
    const pLogin = await request(app).post('/api/auth/login').send({ email: 'p@example.com', password: 'pass1234' });
    expect(pLogin.status).toBe(200);

    // Organizer signup
    const oSignup = await request(app).post('/api/organizer/auth/signup').send({
      firstName: 'Org', lastName: 'One', gender: 'Male', phoneNumber: '9000000002', email: 'o@example.com', password: 'orgpass'
    });
    expect(oSignup.status).toBe(201);

    // Organizer login to get cookie
    const oLogin = await request(app).post('/api/organizer/auth/login').send({ email: 'o@example.com', password: 'orgpass' });
    expect(oLogin.status).toBe(200);
    const organizerCookie = oLogin.headers['set-cookie'][0].split(';')[0];

    // Organizer creates event
    const evRes = await request(app).post('/api/event').set('Cookie', organizerCookie).send({ eventName: 'Test Marathon', email: 'ev@example.com', phoneNumber: '9000000003' });
    expect(evRes.status).toBe(201);
    const eventId = evRes.body._id;

    // Public list events
    const list = await request(app).get('/api/event');
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);

    // Participant registration (public, create participant via body)
    const regRes = await request(app).post('/api/registration').send({
      participant: { firstName: 'New', lastName: 'User', phoneNumber: '9000000004', email: 'new@example.com', gender: 'Male' },
      eventId,
      categoryId: eventId, // invalid but will test validation; since event.categories empty it should 400
      kitSize: 'M',
      paymentMethod: 'UPI'
    });
    // Should fail because categories are not defined (category not found)
    expect(regRes.status).toBe(400);

    // Add a category to event (update event)
    const category = { categoryName: 'Beginner', distance: '3km', startTime: '07:00', registrationFees: 100 };
    const upd = await request(app).put(`/api/event/${eventId}`).set('Cookie', organizerCookie).send({ categories: [category] });
    expect(upd.status).toBe(200);
    const catId = upd.body.categories[0]._id;

    // Now register participant successfully
    const regRes2 = await request(app).post('/api/registration').send({
      participant: { firstName: 'New', lastName: 'User', phoneNumber: '9000000004', email: 'new@example.com', gender: 'Male' },
      eventId,
      categoryId: catId,
      kitSize: 'M',
      paymentMethod: 'UPI'
    });
    expect(regRes2.status).toBe(201);
    const qr = regRes2.body.registration.qrCode;

    // Organizer creates staff for this event
    const sCreate = await request(app).post('/api/organizer/manage/staff').set('Cookie', organizerCookie).send({ firstName: 'Staff', lastName: 'One', phoneNumber: '9000000005', userId: 'staff1', password: 'staffpass', eventId });
    expect(sCreate.status).toBe(201);

    // Staff login
    const sLogin = await request(app).post('/api/staff/login').send({ userId: 'staff1', password: 'staffpass' });
    expect(sLogin.status).toBe(200);
    const staffCookie = sLogin.headers['set-cookie'][0].split(';')[0];

    // Staff list registrations
    const sRegs = await request(app).get('/api/staff/registrations').set('Cookie', staffCookie);
    expect(sRegs.status).toBe(200);

    // Staff scan QR
    const scan = await request(app).post('/api/qr/scan').set('Cookie', staffCookie).send({ qrCode: qr, action: 'Bib Collected' });
    expect(scan.status).toBe(200);
  }, 20000);
});
