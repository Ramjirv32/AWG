# AWG Dashboard - Frontend

Modern, responsive dashboard for Atmospheric Water Generator monitoring and management.

## Features

- **Real-time Monitoring**: Live sensor data updates via WebSocket
- **Water Production Analytics**: Detailed charts and trend analysis
- **Hydration Tracking**: Personal water consumption goals and reminders
- **System Health**: Error logging and alert management
- **Maintenance Management**: Service request tracking
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Socket.io Client** - Real-time updates
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Dashboard/   # Dashboard-specific components
│   ├── Errors/      # Error display components
│   └── Layout/      # Layout components (Sidebar, Header)
├── pages/           # Page components
├── store/           # Zustand state management
├── config/          # API and Socket configuration
├── App.jsx          # Main app component with routing
└── main.jsx         # Entry point
```

## Available Pages

- **Dashboard** - Overview with real-time metrics
- **Production** - Water production analytics
- **Consumption** - Water usage and hydration tracking
- **Errors** - System health and error logs
- **Maintenance** - Service requests and history
- **Reports** - Usage reports (coming soon)
- **Community** - User community features (coming soon)
- **Settings** - User preferences and profile

## Authentication

The app uses JWT-based authentication. Users must register/login to access the dashboard.

## Real-time Updates

The dashboard connects to the backend via Socket.io for real-time updates:
- Sensor data updates every 10 seconds
- Error alerts in real-time
- Maintenance request notifications
