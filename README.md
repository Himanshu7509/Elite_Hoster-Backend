# Elite_hoster Backend

This is the backend for the Elite_hoster application with authentication system for admins and employees.

## Features

- **Admin Authentication**: Static admin login with predefined credentials
- **Employee Registration**: Employees can sign up with email and password
- **Employee Login**: Employees can log in with registered credentials
- **Role-based Access Control**: Different permissions for admin and employee roles
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: All passwords are securely hashed using bcrypt

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ADMIN_EMAIL=admin@elitehosters.com
   ADMIN_PASSWORD=Admin@123
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new employee
- `POST /api/auth/login` - Login for employees
- `POST /api/auth/admin/login` - Login for admin
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Employee Registration
Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Employee/Admin Login
Request:
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

Response:
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "employee",
  "token": "jwt_token"
}
```

## Admin Credentials

The admin account is static and configured in the `.env` file:
- Email: `admin@elitehosters.com`
- Password: `Admin@123`

## Project Structure

```
Elite_hosters-backend/
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── controllers/
│   └── authController.js
├── middleware/
│   ├── auth.js
│   ├── asyncHandler.js
│   └── errorHandler.js
├── utils/
│   └── generateToken.js
├── .env
├── server.js
└── package.json
```

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Role-based access control
- Input validation
- Protection against common vulnerabilities