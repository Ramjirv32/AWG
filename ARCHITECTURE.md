# 🏗️ AWG Dashboard - System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         User's Browser                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              React Frontend (Port 5173)                   │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │  │
│  │  │   Pages     │  │  Components  │  │  State (Zustand)│  │  │
│  │  │ - Dashboard │  │ - WaterGauge │  │  - User         │  │  │
│  │  │ - Login     │  │ - PHIndicator│  │  - SensorData   │  │  │
│  │  │ - Settings  │  │ - Charts     │  │  - Errors       │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              │ WebSocket (Socket.io)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Node.js Backend (Port 5000)                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      Express Server                       │  │
│  │  ┌──────────┐  ┌────────────┐  ┌──────────┐  ┌────────┐  │  │
│  │  │  Routes  │→ │Controllers │→ │  Models  │→ │MongoDB │  │  │
│  │  │          │  │            │  │          │  │        │  │  │
│  │  │ /auth    │  │ authCtrl   │  │  User    │  │ awg_db │  │  │
│  │  │ /sensors │  │ sensorCtrl │  │  Sensor  │  │        │  │  │
│  │  │ /errors  │  │ errorCtrl  │  │  Error   │  │        │  │  │
│  │  └──────────┘  └────────────┘  └──────────┘  └────────┘  │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────┐    │  │
│  │  │         Socket.io (Real-time Updates)            │    │  │
│  │  │  - sensorUpdate  - errorAlert                    │    │  │
│  │  │  - consumptionUpdate  - maintenanceRequest       │    │  │
│  │  └──────────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  MongoDB Server  │
                    │  (Port 27017)    │
                    │                  │
                    │  Collections:    │
                    │  - users         │
                    │  - sensordatas   │
                    │  - errors        │
                    │  - consumption   │
                    │  - maintenance   │
                    └──────────────────┘
```

## Data Flow

### 1. User Authentication Flow

```
User → Login Page → POST /api/auth/login → Verify Credentials
                                          ↓
                                    Generate JWT Token
                                          ↓
                                    Return User + Token
                                          ↓
                                Store in LocalStorage
                                          ↓
                                  Redirect to Dashboard
```

### 2. Real-time Sensor Data Flow

```
Data Simulator (Backend)
        ↓
Generate Random Sensor Data (every 10s)
        ↓
Save to MongoDB (SensorData collection)
        ↓
Emit via Socket.io → "sensorUpdate" event
        ↓
Frontend Socket Listener
        ↓
Update Zustand Store
        ↓
React Components Re-render
        ↓
User Sees Updated Data
```

### 3. API Request Flow

```
Frontend Component
        ↓
Axios API Call (with JWT token in header)
        ↓
Backend Route Handler
        ↓
Middleware: Verify JWT Token
        ↓
Controller: Business Logic
        ↓
Model: Database Query
        ↓
MongoDB: Execute Query
        ↓
Return Data
        ↓
Controller: Format Response
        ↓
Send JSON Response
        ↓
Frontend: Update State
        ↓
Component: Render Data
```

## Component Hierarchy

### Frontend Component Tree

```
App
├── Router
    ├── Public Routes
    │   ├── Login
    │   └── Register
    │
    └── Protected Routes (MainLayout)
        ├── Header
        │   ├── MenuButton
        │   ├── ThemeToggle
        │   ├── Notifications
        │   └── UserMenu
        │
        ├── Sidebar
        │   └── Navigation Links
        │
        └── Main Content (Outlet)
            ├── Dashboard
            │   ├── StatCard (x4)
            │   ├── WaterLevelGauge
            │   ├── PHLevelIndicator
            │   ├── SystemStatus
            │   ├── ProductionChart
            │   ├── HydrationTracker
            │   └── ErrorList
            │
            ├── Production
            │   ├── Stats Grid
            │   └── ProductionChart
            │
            ├── Consumption
            │   ├── HydrationTracker
            │   ├── Tips Card
            │   └── LogWaterModal
            │
            ├── Errors
            │   ├── ErrorStats
            │   └── ErrorList
            │
            ├── Maintenance
            │   ├── RequestList
            │   └── CreateRequestModal
            │
            └── Settings
                ├── ProfileForm
                ├── HydrationSettings
                └── NotificationPreferences
```

## Database Schema Relationships

```
┌──────────────┐
│    User      │
│──────────────│
│ _id          │◄─────────┐
│ name         │          │
│ email        │          │
│ password     │          │
│ preferences  │          │
└──────────────┘          │
                          │
                          │ userId (FK)
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Consumption  │  │ Maintenance  │  │   (Other)    │
│──────────────│  │──────────────│  │──────────────│
│ _id          │  │ _id          │  │              │
│ userId   ────┤  │ userId   ────┤  │              │
│ amount       │  │ type         │  │              │
│ type         │  │ status       │  │              │
│ timestamp    │  │ description  │  │              │
└──────────────┘  └──────────────┘  └──────────────┘

┌──────────────┐
│ SensorData   │  (No FK - standalone IoT data)
│──────────────│
│ _id          │
│ waterLevel   │
│ phLevel      │
│ temperature  │
│ humidity     │
│ production   │
│ timestamp    │
└──────────────┘

┌──────────────┐
│  ErrorLog    │  (No FK - system-wide errors)
│──────────────│
│ _id          │
│ severity     │
│ errorCode    │
│ message      │
│ resolved     │
│ timestamp    │
└──────────────┘
```

## State Management (Zustand)

```
Global Store
├── Auth State
│   ├── user
│   ├── token
│   ├── isAuthenticated
│   └── Actions: setUser, logout
│
├── Theme State
│   ├── theme
│   └── Actions: toggleTheme
│
├── Sensor State
│   ├── currentSensorData
│   ├── historicalData
│   └── Actions: updateSensorData, addHistoricalData
│
├── Consumption State
│   ├── consumptionData
│   ├── dailyHydration
│   └── Actions: setConsumptionData, setDailyHydration
│
├── Error State
│   ├── errors
│   ├── errorStats
│   └── Actions: setErrors, addError
│
└── Maintenance State
    ├── maintenanceRequests
    └── Actions: setMaintenanceRequests, addMaintenanceRequest
```

## API Endpoint Structure

```
/api
├── /auth
│   ├── POST   /register        → Create new user
│   ├── POST   /login           → Authenticate user
│   ├── GET    /profile         → Get user profile
│   └── PUT    /profile         → Update profile
│
├── /sensors
│   ├── GET    /current         → Latest sensor reading
│   ├── GET    /historical      → Time-series data
│   ├── GET    /stats           → Aggregated statistics
│   └── POST   /                → Add sensor data (IoT)
│
├── /consumption
│   ├── GET    /                → User's consumption history
│   ├── POST   /                → Log water intake
│   ├── GET    /stats           → Consumption statistics
│   └── GET    /hydration/daily → Today's hydration progress
│
├── /errors
│   ├── GET    /                → Error logs
│   ├── POST   /                → Log new error
│   ├── GET    /stats           → Error statistics
│   └── PUT    /:id/resolve     → Mark error resolved
│
└── /maintenance
    ├── GET    /                → User's requests
    ├── POST   /                → Create request
    ├── PUT    /:id             → Update request
    └── GET    /all             → All requests (admin)
```

## Security Layers

```
Request Flow with Security:

Client Request
      ↓
1. CORS Check (server.js)
      ↓
2. Route Handler
      ↓
3. Auth Middleware (protect)
   - Verify JWT token
   - Decode user ID
   - Attach user to request
      ↓
4. Role Check (admin) [if needed]
      ↓
5. Controller Logic
      ↓
6. Database Query
      ↓
Response
```

## Real-time Communication

```
Socket.io Events:

Server → Client:
├── "sensorUpdate"        → New sensor data
├── "errorAlert"          → New error logged
├── "consumptionUpdate"   → Water logged
├── "maintenanceRequest"  → New request created
└── "maintenanceUpdate"   → Request status changed

Client → Server:
├── "connection"          → Client connected
└── "disconnect"          → Client disconnected
```

## File Organization

```
Backend Structure:
backend/
├── config/
│   └── database.js          → MongoDB connection
├── controllers/
│   ├── authController.js    → Auth logic
│   ├── sensorController.js  → Sensor CRUD
│   ├── consumptionController.js
│   ├── errorController.js
│   └── maintenanceController.js
├── models/
│   ├── User.js              → User schema
│   ├── SensorData.js        → Sensor schema
│   ├── WaterConsumption.js
│   ├── ErrorLog.js
│   └── MaintenanceRequest.js
├── routes/
│   ├── authRoutes.js        → /api/auth/*
│   ├── sensorRoutes.js      → /api/sensors/*
│   ├── consumptionRoutes.js
│   ├── errorRoutes.js
│   └── maintenanceRoutes.js
├── middleware/
│   └── auth.js              → JWT verification
└── server.js                → Main entry point

Frontend Structure:
front/src/
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── MainLayout.jsx
│   ├── Dashboard/
│   │   ├── StatCard.jsx
│   │   ├── WaterLevelGauge.jsx
│   │   ├── PHLevelIndicator.jsx
│   │   ├── ProductionChart.jsx
│   │   ├── SystemStatus.jsx
│   │   └── HydrationTracker.jsx
│   └── Errors/
│       └── ErrorList.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Production.jsx
│   ├── Consumption.jsx
│   ├── Errors.jsx
│   ├── Maintenance.jsx
│   ├── Settings.jsx
│   ├── Reports.jsx
│   └── Community.jsx
├── store/
│   └── useStore.js          → Zustand store
├── config/
│   ├── api.js               → Axios setup
│   └── socket.js            → Socket.io setup
├── App.jsx                  → Routes
└── main.jsx                 → Entry point
```

## Deployment Architecture (Future)

```
Production Setup:

┌─────────────────┐
│   CloudFlare    │  → CDN, SSL
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Nginx/Apache   │  → Reverse Proxy
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│Frontend│ │Backend │  → PM2 Process Manager
│ Build  │ │Node.js │
└────────┘ └───┬────┘
               │
               ▼
         ┌──────────┐
         │ MongoDB  │  → Replica Set
         │ Cluster  │
         └──────────┘
```

## Technology Stack Summary

```
Frontend:
├── React 19              → UI Framework
├── Vite                  → Build Tool
├── TailwindCSS           → Styling
├── React Router          → Navigation
├── Zustand               → State Management
├── Socket.io Client      → Real-time
├── Axios                 → HTTP Client
├── Recharts              → Charts
├── Lucide React          → Icons
└── date-fns              → Date Formatting

Backend:
├── Node.js               → Runtime
├── Express               → Web Framework
├── MongoDB               → Database
├── Mongoose              → ODM
├── Socket.io             → Real-time
├── JWT                   → Authentication
├── bcryptjs              → Password Hashing
└── dotenv                → Environment Config
```

---

This architecture provides a solid foundation for a scalable, maintainable, and feature-rich AWG Dashboard application.
