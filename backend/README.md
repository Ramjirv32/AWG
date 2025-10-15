# AWG Backend API

Backend API for Atmospheric Water Generator Dashboard with real-time data updates.

## Features

- RESTful API with Express.js
- Real-time updates with Socket.io
- MongoDB database
- JWT authentication
- Sensor data management
- Water consumption tracking
- Error logging and alerts
- Maintenance request system

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/awg_dashboard
JWT_SECRET=your_secret_key
NODE_ENV=development
```

3. Start MongoDB:
```bash
mongod
```

4. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile (protected)
- PUT `/api/auth/profile` - Update user profile (protected)

### Sensors
- GET `/api/sensors/current` - Get current sensor data
- GET `/api/sensors/historical` - Get historical data
- GET `/api/sensors/stats` - Get production statistics
- POST `/api/sensors` - Add sensor data (for IoT devices)

### Consumption
- GET `/api/consumption` - Get user consumption data
- POST `/api/consumption` - Add consumption record
- GET `/api/consumption/stats` - Get consumption statistics
- GET `/api/consumption/hydration/daily` - Get daily hydration progress

### Errors
- GET `/api/errors` - Get error logs
- POST `/api/errors` - Add error log
- GET `/api/errors/stats` - Get error statistics
- PUT `/api/errors/:id/resolve` - Mark error as resolved

### Maintenance
- GET `/api/maintenance` - Get user's maintenance requests
- POST `/api/maintenance` - Create maintenance request
- PUT `/api/maintenance/:id` - Update maintenance request
- GET `/api/maintenance/all` - Get all requests (admin only)

## Socket.io Events

- `sensorUpdate` - Real-time sensor data updates
- `errorAlert` - Real-time error notifications
- `consumptionUpdate` - Water consumption updates
- `maintenanceRequest` - New maintenance request
- `maintenanceUpdate` - Maintenance request status update

## Development

The server includes a data simulator that generates random sensor data every 10 seconds in development mode.
