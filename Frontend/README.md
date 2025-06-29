# Bib Management System - Frontend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Make sure the backend server is running on `http://localhost:5001`

## Authentication Features

### 🔐 Authentication System

The frontend implements a complete authentication system with the following features:

- **JWT Token Management** - Automatic token storage and retrieval
- **Persistent Login** - Users stay logged in across browser sessions
- **Profile Completion Tracking** - Automatic detection of profile completion status
- **Error Handling** - Comprehensive error messages and validation
- **Loading States** - Smooth loading indicators during API calls

### 📁 File Structure

```
src/
├── components/
│   ├── Login.jsx              # Login/Signup component
│   ├── LoadingSpinner.jsx     # Loading indicator
│   └── ...
├── contexts/
│   └── AuthContext.jsx        # Authentication context
├── services/
│   └── authService.js         # API service for authentication
└── ...
```

### 🔧 Key Components

#### AuthContext
- Manages global authentication state
- Provides login, signup, and logout functions
- Tracks profile completion status
- Handles token persistence

#### AuthService
- Handles all API calls to the backend
- Manages JWT tokens automatically
- Provides error handling and validation
- Supports profile management

#### Login Component
- Supports both login and signup modes
- Real-time validation
- Error message display
- Loading states
- Automatic profile completion detection

### 🚀 Usage

#### Basic Authentication Flow

```javascript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ username: 'user@example.com', password: 'password' });
      // User is now logged in
    } catch (error) {
      console.error('Login failed:', error.error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

#### Profile Completion Check

```javascript
import { useAuth } from './contexts/AuthContext';

function App() {
  const { needsProfileCompletion, getProfileCompletionPercentage } = useAuth();

  if (needsProfileCompletion()) {
    return <ProfileCompletionForm />;
  }

  return <MainApp />;
}
```

### 🔄 API Integration

The frontend automatically integrates with the backend API:

- **Base URL**: `http://localhost:5001/api`
- **Authentication**: JWT tokens in Authorization header
- **Error Handling**: Automatic token refresh and logout on expiration
- **CORS**: Configured for local development

### 🧪 Testing

You can test the authentication system in the browser console:

```javascript
// Import and run the test
import { testAuthService } from './src/test-auth.js';
testAuthService();
```

Or use the global function:
```javascript
window.testAuthService();
```

### 📱 User Experience Features

- **Smooth Transitions** - Loading states and animations
- **Error Feedback** - Clear error messages for users
- **Form Validation** - Real-time validation feedback
- **Responsive Design** - Works on all device sizes
- **Accessibility** - Keyboard navigation and screen reader support

### 🔒 Security Features

- **Token Storage** - Secure localStorage management
- **Automatic Logout** - Token expiration handling
- **Input Sanitization** - XSS prevention
- **CSRF Protection** - Token-based requests

### 🎨 Styling

The authentication components use the existing CSS framework:
- Consistent with the overall design
- Responsive and mobile-friendly
- Dark/light theme support
- Loading animations

## Development

### Adding New Features

1. **New API Endpoints**: Add methods to `authService.js`
2. **New Components**: Create in `components/` directory
3. **State Management**: Use AuthContext for global state
4. **Styling**: Follow existing CSS patterns

### Environment Variables

Create a `.env` file for configuration:

```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_APP_NAME=Marathon Master
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend is running and CORS is configured
2. **Token Issues**: Check localStorage and token expiration
3. **API Errors**: Verify backend endpoints and authentication
4. **Profile Issues**: Check profile completion requirements

### Debug Mode

Enable debug logging in the browser console:

```javascript
localStorage.setItem('debug', 'true');
```

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include loading states
4. Test authentication flows
5. Update documentation
