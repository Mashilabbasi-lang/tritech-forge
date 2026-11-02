# TriTech Forge - Customer Authentication System

Complete customer authentication system with SQLite database, JWT tokens, and customer dashboard.

## Features

### Customer Authentication
- ✅ **Sign Up** - Email and password registration
- ✅ **Login** - Secure authentication with JWT tokens
- ✅ **Customer Dashboard** - Personal dashboard for logged-in users

### Customer Dashboard
- 📦 **My Orders** - View all previous orders
- ➕ **New Order** - Create new service orders
- 👤 **Profile** - View account information
- 🚪 **Logout** - Secure session termination

### Backend (SQLite + Express)
- SQLite database for user and order storage
- bcrypt password hashing
- JWT token authentication
- RESTful API endpoints

## Setup Instructions

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Start Backend Server
```bash
cd server
npm start
```
Server will run on http://localhost:5000

### 3. Start Frontend (in a new terminal)
```bash
cd d:\PROJECTS\tritech\tritechforge-clean
npm run dev
```
Frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/profile` - Get user profile (requires auth)

### Orders
- `GET /api/orders` - Get all user orders (requires auth)
- `POST /api/orders` - Create new order (requires auth)
- `PATCH /api/orders/:id` - Update order status (requires auth)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  description TEXT,
  price REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

## Customer Journey

1. **Sign Up** (`/signup`)
   - Enter email and password
   - Password must be at least 8 characters
   - Automatically logged in after signup

2. **Login** (`/login`)
   - Enter email and password
   - Receives JWT token
   - Redirected to dashboard

3. **Dashboard** (`/dashboard`)
   - **My Orders Tab**: View all previous orders with status
   - **New Order Tab**: Create new service orders
   - **Profile Tab**: View account information
   - Logout button in sidebar

## Service Types Available

- AI Receptionist
- Call Automation
- Lead Management
- 24/7 Support
- Custom Solution

## Order Statuses

- 🕐 **pending** - Order awaiting processing
- ✅ **completed** - Order fulfilled
- ❌ **cancelled** - Order cancelled

## Security Features

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens with 7-day expiration
- Protected routes requiring authentication
- Secure token storage in localStorage
- CORS enabled for frontend-backend communication

## Technologies Used

### Backend
- Express.js
- better-sqlite3
- bcryptjs
- jsonwebtoken
- cors

### Frontend
- React + TypeScript
- Vite
- Framer Motion
- React Router
- Lucide Icons

## Build Stats

- CSS: 49.10 KB (7.86 KB gzipped)
- JS: 468.57 kB (146.33 KB gzipped)
- Build time: 779ms
- **0 errors** ✓

## Notes

- SQLite database file: `server/tritechforge.db`
- JWT Secret: Change in production (server/server.js)
- Default backend port: 5000
- Default frontend port: 5173
