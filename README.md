# ChatterZbox - Social Media Platform

A modern, Instagram-like social media web application built with React, TypeScript, Node.js, and PostgreSQL.

## Features

- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- 🎨 **Modern UI**: Instagram-inspired interface with Tailwind CSS
- 🔐 **Secure Authentication**: JWT-based auth with refresh tokens
- 📸 **Media Sharing**: Upload and share photos and videos
- 💬 **Social Interactions**: Like, comment, follow, and message users
- 🔍 **Content Discovery**: Explore trending content and search
- 📊 **Real-time Features**: WebSocket support for live messaging
- 🏗️ **Scalable Architecture**: Built with modern best practices

## Tech Stack

### Frontend
- **Framework**: Vite + React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: Zustand + React Query
- **UI**: Tailwind CSS + Headless UI
- **Forms**: React Hook Form + Zod validation
- **Icons**: Heroicons
- **Real-time**: Socket.io-client

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **File Storage**: Cloudinary
- **Real-time**: Socket.io
- **Caching**: Redis
- **Validation**: Zod schemas

## Project Structure

```
Necklace-Designer/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Zustand state stores
│   │   ├── services/       # API services
│   │   ├── utils/          # Helper functions
│   │   ├── types/          # TypeScript types
│   │   └── styles/         # Global styles
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   ├── models/         # Prisma models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Helper functions
│   │   ├── config/         # Configuration
│   │   └── types/          # TypeScript types
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/
│   └── package.json
└── shared/                  # Shared types and utilities
    └── types/
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Necklace-Designer
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install

   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment setup**
   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   # Edit .env with your configuration

   # Frontend environment
   cd ../frontend
   cp .env.example .env
   ```

4. **Database setup**
   ```bash
   cd backend

   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma db push

   # (Optional) Seed database with sample data
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   # Start backend (port 5000)
   cd backend
   npm run dev

   # Start frontend (port 3000)
   cd ../frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database Studio: `npm run db:studio` (from backend directory)

## Development Scripts

### Backend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push schema changes
npm run db:studio    # Open database studio
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## License

This project is licensed under the MIT License.

---

Built with ❤️ using modern web technologies