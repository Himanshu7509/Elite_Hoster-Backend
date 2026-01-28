# Elite Hoster Backend

This is the backend for the Elite Hoster application with authentication system for admins and employees, company management, document upload, and email functionality.

## Features

- **Admin Authentication**: Static admin login with predefined credentials
- **Employee Registration**: Employees can sign up with email and password
- **Employee Login**: Employees can log in with registered credentials
- **Role-based Access Control**: Different permissions for admin and employee roles
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: All passwords are securely hashed using bcrypt
- **Company Management**: Create, read, update, and delete company records
- **Document Upload**: Upload company-related documents to S3 storage
- **Email Service**: Send single and group emails with attachments using Resend API
- **Mail Tracking**: Track sent emails with comprehensive logging
- **File Attachments**: Support for PDF and image attachments in emails
- **S3 Integration**: Secure storage of documents in AWS S3

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
   RESEND_API_KEY=your_resend_api_key
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   AWS_BUCKET_NAME=your_s3_bucket_name
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

### Company Management

- `POST /api/companies` - Create a new company (requires authentication)
- `GET /api/companies` - Get all companies with search, filter and sort (requires authentication)
- `GET /api/companies/:id` - Get a specific company by ID (requires authentication)
- `PUT /api/companies/:id` - Update a company by ID (requires authentication)
- `DELETE /api/companies/:id` - Delete a company by ID (admin only)
- `GET /api/companies/stats` - Get company statistics (requires authentication)
- `GET /api/companies/categories` - Get common categories for dropdown (requires authentication)

### Email Service

- `POST /api/mails/send-single` - Send email to a single company with attachments (requires authentication)
- `POST /api/mails/send-group` - Send email to multiple companies with attachments (requires authentication)
- `GET /api/mails` - Get all sent emails with pagination (requires authentication)
- `GET /api/mails/:id` - Get a specific sent email by ID (requires authentication)

### Company Creation
Request (form-data):
```json
{
  "companyName": "Test Company",
  "websiteUrl": "https://testcompany.com",
  "companyEmail": "contact@testcompany.com",
  "industry": "Technology",
  "tags": "React,Node,AWS",
  "categories": ["IT", "Software"],
  "status": "New",
  "uploadDocument": [file upload - PDF only]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "company_id",
    "companyName": "Test Company",
    "websiteUrl": "https://testcompany.com",
    "companyEmail": "contact@testcompany.com",
    "industry": "Technology",
    "tags": ["React,Node,AWS"],
    "categories": ["IT", "Software"],
    "status": "New",
    "uploadDocument": "https://s3.amazonaws.com/bucket/document.pdf",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Get Common Categories for Dropdown
Request:
```json
GET /api/companies/categories
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "data": [
    "IT",
    "Technology",
    "Software",
    "Hardware",
    "Finance",
    "Banking",
    "Healthcare",
    "Education",
    "E-commerce",
    "Retail",
    "Manufacturing",
    "Consulting",
    "Media",
    "Entertainment",
    "Telecommunications",
    "Automotive",
    "Real Estate",
    "Travel",
    "Food",
    "Energy",
    "Government",
    "Pharmaceuticals",
    "Insurance",
    "Logistics",
    "Agriculture",
    "Fashion",
    "Beauty",
    "Fitness",
    "Sports",
    "Art",
    "Design",
    "Marketing",
    "HR",
    "Legal",
    "Non-profit",
    "Startups",
    "AI/Machine Learning",
    "Cybersecurity",
    "Cloud Services",
    "Blockchain",
    "Gaming"
  ]
}
```

### Email Service - Send Single Email
Request (form-data):
```json
{
  "companyId": "company_id",
  "subject": "Email Subject",
  "message": "Email message content",
  "attachments": [file uploads - PDF or images]
}
```

Response:
```json
{
  "success": true,
  "message": "Mail sent to company@example.com",
  "sender": "user@elitehosters.com (role)",
  "messageId": "message_id"
}
```

### Email Service - Send Group Email
Request (form-data):
```json
{
  "companyIds[]": ["company_id_1", "company_id_2"],
  "subject": "Email Subject",
  "message": "Email message content",
  "attachments": [file uploads - PDF or images]
}
```

Response:
```json
{
  "success": true,
  "message": "Group mail sent to X companies",
  "emails": ["email1@example.com", "email2@example.com"],
  "sender": "user@elitehosters.com (role)",
  "messageId": "message_id"
}
```

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
Elite_Hoster-Backend/
├── models/
│   ├── User.model.js
│   ├── Company.model.js
│   └── MailTracking.model.js
├── routes/
│   ├── auth.routes.js
│   ├── Company.routes.js
│   └── Mail.route.js
├── controllers/
│   ├── authController.js
│   ├── Company.controller.js
│   └── Mail.controller.js
├── middleware/
│   ├── auth.js
│   ├── upload.js
│   └── errorHandler.js
├── utils/
│   ├── db.js
│   ├── s3.js
│   └── uploadFileToS3.js
├── .env
├── server.js
└── package.json
```

## Document Upload Feature

The application supports document upload functionality for companies:

- **File Types**: PDF files only
- **Storage**: AWS S3 bucket
- **Field**: `uploadDocument` in Company model
- **Size Limit**: 10MB per file
- **Security**: Files are stored with unique UUID-based names
- **Cleanup**: When a company is deleted, associated documents are automatically removed from S3

## Email Service Feature

The application includes a comprehensive email service:

- **Provider**: Resend API
- **Authentication**: Requires valid JWT token
- **Attachments**: Supports PDF and image files (up to 5 attachments per email)
- **File Size**: Maximum 5MB per attachment
- **Single Email**: Send to individual companies
- **Group Email**: Send to multiple companies using BCC for privacy
- **Tracking**: All sent emails are logged with comprehensive details
- **Templates**: Professional HTML email templates

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Role-based access control
- Input validation
- Protection against common vulnerabilities