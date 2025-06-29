# Bib Management System - Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/bib_management_system
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

## Authentication API Endpoints

### Signup
- **POST** `/api/auth/signup`
- **Body:**
```json
{
  "username": "organizer1",
  "email": "organizer@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "user" // optional, defaults to "user"
}
```

### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "username": "organizer1", // or email
  "password": "password123"
}
```

### Get Profile
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`

### Logout
- **POST** `/api/auth/logout`
- **Headers:** `Authorization: Bearer <token>`

## Profile Completion API Endpoints

### Get User Profile
- **GET** `/api/profile`
- **Headers:** `Authorization: Bearer <token>`

### Create/Update Complete Profile
- **POST** `/api/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "full_name": "John Doe",
  "gender": "male",
  "date_of_birth": "1990-05-15",
  "nationality": "Indian",
  "email": "john@example.com",
  "mobile_number": "+91-9876543210",
  "mailing_address": {
    "street_address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postal_code": "400001",
    "country": "India"
  },
  "emergency_contact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phone_number": "+91-9876543211",
    "email": "jane@example.com"
  },
  "t_shirt_size": "L",
  "blood_group": "O+",
  "medical_conditions": [
    {
      "condition": "Asthma",
      "severity": "low",
      "notes": "Mild asthma"
    }
  ],
  "allergies": [
    {
      "allergen": "Peanuts",
      "severity": "moderate",
      "notes": "Avoid peanut products"
    }
  ],
  "previous_marathon_experience": [
    {
      "event_name": "Mumbai Marathon 2023",
      "event_date": "2023-01-15",
      "distance": "10K",
      "completion_time": "1:05:30",
      "notes": "First marathon"
    }
  ],
  "profile_photo": {
    "url": "https://example.com/photo.jpg",
    "filename": "profile.jpg"
  }
}
```

### Update Profile Section
- **PATCH** `/api/profile/section/:section`
- **Headers:** `Authorization: Bearer <token>`
- **Sections:** `basic`, `contact`, `emergency`, `marathon`, `medical`, `experience`, `photo`

### Get Profile Completion Status
- **GET** `/api/profile/completion-status`
- **Headers:** `Authorization: Bearer <token>`

### Delete Profile
- **DELETE** `/api/profile`
- **Headers:** `Authorization: Bearer <token>`

## Response Format

### Success Response
```json
{
  "message": "Profile completed successfully",
  "profile": {
    "id": "profile_id",
    "full_name": "John Doe",
    "gender": "male",
    "date_of_birth": "1990-05-15T00:00:00.000Z",
    "nationality": "Indian",
    "email": "john@example.com",
    "mobile_number": "+91-9876543210",
    "mailing_address": { ... },
    "emergency_contact": { ... },
    "t_shirt_size": "L",
    "blood_group": "O+",
    "medical_conditions": [ ... ],
    "allergies": [ ... ],
    "previous_marathon_experience": [ ... ],
    "profile_photo": { ... },
    "is_profile_complete": true,
    "profile_completion_percentage": 95,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  },
  "completion_percentage": 95,
  "is_complete": true
}
```

### Profile Status Response
```json
{
  "has_profile": true,
  "completion_percentage": 95,
  "is_complete": true,
  "profile": { ... }
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

## Profile Completion Features

### Required Fields
- Full Name
- Gender (male/female/other/prefer_not_to_say)
- Date of Birth
- Nationality
- Email Address
- Mobile Number
- Complete Mailing Address
- Emergency Contact Information
- T-shirt Size

### Optional Fields
- Blood Group
- Medical Conditions
- Allergies
- Previous Marathon Experience
- Profile Photo

### Completion Calculation
- **80% weight** for required fields
- **20% weight** for optional fields
- Profile is considered complete at **80% or higher**

## Authentication Middleware

Use the `authenticateToken` middleware to protect routes:

```javascript
const { authenticateToken } = require('./routes/auth');

app.get('/protected-route', authenticateToken, (req, res) => {
  // req.user contains the decoded JWT payload
  res.json({ message: 'Protected data' });
});
```

## Database Models

- **Organizer**: User accounts with authentication
- **UserProfile**: Detailed participant profiles
- **Participant**: Marathon participants
- **Event**: Marathon events
- **Category**: Event categories
- **AdminActions**: Admin activity logs

## Testing

Run the authentication tests:
```bash
node test-auth.js
```

Run the profile completion tests:
```bash
node test-profile.js 