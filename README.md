# Hyperloop

A modern, enterprise-level employee and leave management system built with a monorepo architecture.

## 🚀 Features

- **User Management**: Employee profiles with organizational hierarchy
- **Leave Management**: Track leave balances, requests, and approvals
- **Authentication**: Secure JWT-based auth with access and refresh tokens
- **Multi-Device Support**: Manage sessions across multiple devices
- **Role-Based Access**: Different permissions for users, admins, and moderators
- **Real-time Validation**: Shared validation schemas across frontend and backend

## 🏗️ Tech Stack

### Monorepo
- **Turborepo**: Fast build system for monorepos

### Backend
- **Node.js** + **Express**: RESTful API server
- **MongoDB** + **Mongoose**: Database and ODM
- **JWT**: Token-based authentication
- **Bcrypt**: Password hashing

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **TanStack Query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS framework

### Shared Packages
- **Zod**: Runtime validation schemas (shared between frontend/backend)
- **UI Components**: Reusable React components

## 📁 Project Structure

```
├── apps/
│   ├── backend/          # Express API server
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   └── utils/
│   │   └── package.json
│   │
│   └── frontend/         # React application
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── context/
│       │   ├── hooks/
│       │   ├── services/
│       │   └── utils/
│       └── package.json
│
├── packages/
│   ├── schemas/          # Shared Zod validation schemas
│   │   ├── src/
│   │   └── package.json
│   │
│   └── ui/              # Shared React components
│       ├── src/
│       └── package.json
│
├── package.json
└── turbo.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn or pnpm
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hr-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` file in `apps/backend`:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/hr-system
   JWT_ACCESS_SECRET=your-super-secret-access-key-min-32-chars
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars
   JWT_ACCESS_EXPIRY=15m
   JWT_REFRESH_EXPIRY=7d
   NODE_ENV=development
   ```

   Create `.env` file in `apps/frontend`:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

4. **Build shared packages**
   ```bash
   npm run build:schemas
   ```

### Development

Run all apps in development mode:
```bash
npm run dev
```

Or run individual apps:
```bash
# Run backend only
cd apps/backend && npm run dev

# Run frontend only
cd apps/frontend && npm run dev

# Watch schemas for changes
cd packages/schemas && npm run dev
```

The applications will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## 📦 Available Scripts

### Root Level
- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps and packages
- `npm run build:schemas` - Build only the schemas package
- `npm run clean` - Clean all build artifacts

### Backend (`apps/backend`)
- `npm run dev` - Start backend with nodemon
- `npm run start` - Start backend in production mode

### Frontend (`apps/frontend`)
- `npm run dev` - Start React dev server
- `npm run build` - Build for production
- `npm run start` - Serve production build

### Schemas (`packages/schemas`)
- `npm run build` - Build CommonJS and ESM outputs
- `npm run dev` - Watch mode for development

## 🔐 Authentication Flow

1. User logs in with email and password
2. Backend validates credentials and generates:
   - **Access Token** (15 min) - stored in httpOnly cookie
   - **Refresh Token** (7 days) - stored in httpOnly cookie & database
3. Frontend automatically includes cookies in all requests
4. When access token expires, refresh token is used to get new tokens
5. All refresh tokens are tracked in database for security and multi-device support

## 👥 User Roles

- **User**: Basic employee access
- **Admin**: Full system access, user management
- **Moderator**: Limited administrative access

## 🗃️ Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  designation: String,
  company: String,
  reportingManager: [String],
  reportee: [String],
  team: String,
  role: String (enum: user, admin, moderator),
  leaves: {
    totalLeaves: Mixed,
    leavesTaken: Mixed,
    leavesRemaining: Mixed
  },
  profilePicture: String,
  refreshTokens: [{
    token: String,
    deviceInfo: String,
    createdAt: Date,
    expiresAt: Date
  }],
  isActive: Boolean,
  lastLogin: Date
}
```

## 🔒 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT tokens with signature verification
- HttpOnly cookies to prevent XSS attacks
- Refresh token rotation
- Token reuse detection
- Multi-device session management
- Account lockout after failed login attempts
- CORS configuration
- Input validation with Zod

## 🧪 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout from current device
- `POST /auth/logout-all` - Logout from all devices
- `POST /auth/refresh` - Refresh access token
- `GET /auth/me` - Get current user info

### Users (Protected)
- `GET /users` - Get all users (with pagination)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🛠️ Development Guidelines

### Adding New Features

1. **Define Schema** in `packages/schemas/src/`
2. **Create API Endpoint** in `apps/backend/src/routes/`
3. **Add Service Layer** in `apps/frontend/src/services/`
4. **Create Custom Hook** in `apps/frontend/src/hooks/`
5. **Build UI Component** in `apps/frontend/src/pages/`

### Code Style
- Use ESLint and Prettier for consistent formatting
- Follow conventional commits for git messages
- Write meaningful variable and function names
- Add comments for complex logic

## 📝 Environment Variables

### Backend Required
- `MONGODB_URI` - MongoDB connection string
- `JWT_ACCESS_SECRET` - Secret key for access tokens
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `PORT` - Server port (default: 3001)

### Frontend Required
- `REACT_APP_API_URL` - Backend API URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [Your Email]

## 🙏 Acknowledgments

- Turborepo for the amazing monorepo setup
- TanStack Query for efficient data fetching
- Zod for runtime type validation