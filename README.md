# iBentix

A modern, full-stack event management platform designed to streamline event
creation, ticketing, and audience engagement with integrated coupon systems and
advanced user features.

## Tech Stack

### Backend

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)

### Tools & Libraries

![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=react-query&logoColor=white)

## Features

- **Event Management** – Create, manage, and organize events with detailed
  configurations
- **Ticketing System** – Flexible ticket generation and management
- **Coupon & Promotion Engine** – Event coupons, referral programs, and app-wide
  promotions
- **User Authentication** – Secure JWT-based authentication with access &
  refresh tokens
- **Order Management** – Complete order processing and tracking
- **Email Notifications** – Automated email communication via Nodemailer
- **Image Management** – Cloud-based image storage integration with Cloudinary
- **Points System** – Loyalty and rewards tracking
- **Geolocation Support** – Country-based features and configurations
- **Data Validation** – Type-safe validation with Zod
- **Responsive Design** – Mobile-first UI with Tailwind CSS

## How to Run

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**

   ```bash
   # Create a .env file with required variables
   DATABASE_URL=postgresql://...
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. **Setup database**

   ```bash
   npm run build
   npx prisma migrate deploy
   npx prisma db seed
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:3000` (or your configured port)

### Frontend Setup

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables**

   ```bash
   # Create a .env file with API endpoints
   VITE_API_URL=http://localhost:3000
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:5173`

### Production Build

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## Project Structure

```
ibentix/
├── backend/               # Express API server
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── routers/       # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── schemas/       # Validation schemas
│   │   ├── config/        # Configuration files
│   │   ├── jobs/          # Scheduled tasks
│   │   └── types/         # TypeScript types
│   └── prisma/            # Database schema & migrations
└── frontend/              # React + Vite application
    ├── src/
    │   ├── pages/         # Page components
    │   ├── components/    # Reusable UI components
    │   ├── services/      # API services
    │   ├── store/         # State management
    │   ├── types/         # TypeScript types
    │   ├── utils/         # Utility functions
    │   └── assets/        # Static assets
    └── public/            # Public files
```

## Scheduled Tasks (Cron Jobs)

The backend includes automated scheduled tasks that run at regular intervals to
maintain data integrity and improve user experience:

### Auto-Cancel Orders

- **Schedule:** Every 1 minute
- **Purpose:** Automatically cancels orders that are stuck in pending admin
  confirmation state
- **Service:** `orderTask.service.ts`
- **Behavior:**
  - Checks for orders awaiting admin confirmation
  - Cancels orders that exceed the timeout threshold
  - Logs the number of cancelled orders for monitoring
  - Handles errors gracefully to prevent job failure

**Configuration:**

```typescript
// Cron pattern: "*/1 * * * *" (every minute)
// Add more jobs by extending the initCronJobs() function
```

Jobs are initialized automatically when the server starts. Monitor the console
logs for `[CRON]` prefixed messages to track job execution.

## Contributing

Please follow the [CONVENTION.md](./CONVENTION.md) for code standards and git
workflow guidelines.

## License

ISC
