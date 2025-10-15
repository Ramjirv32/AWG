# Atmospheric Water Generator (AWG) Dashboard

Complete full-stack web application for monitoring and managing an Atmospheric Water Generator system with real-time IoT sensor data, AI-powered features, and comprehensive analytics.

## 🌟 Features

### Core Functionality
- **Real-time Monitoring**: Live sensor data updates via WebSocket
- **Water Production Analytics**: Detailed charts showing production trends
- **Water Level Monitoring**: Visual gauge with status indicators
- **pH Level Tracking**: Safe range monitoring with visual indicators
- **System Health Dashboard**: Real-time status and error logging
- **Hydration Tracking**: Personal water consumption goals and progress
- **Maintenance Management**: Service request system with history

### AI-Powered Features
- Personalized hydration reminders based on user activity
- Predictive alerts for water tank capacity
- Smart recommendations for optimal water usage
- Anomaly detection for unusual consumption patterns
- Predictive maintenance suggestions

### Technical Features
- JWT-based authentication
- Real-time updates with Socket.io
- Responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- RESTful API
- MongoDB database
- Data visualization with charts

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data storage
- **Socket.io** for real-time communication
- **JWT** for authentication
- **Mongoose** for ODM

### Frontend
- **React 19** with Vite
- **TailwindCSS** for styling
- **React Router** for navigation
- **Zustand** for state management
- **Recharts** for data visualization
- **Lucide React** for icons
- **Axios** for HTTP requests

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Setup

```bash
cd /home/ramji/Documents/AWG
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your settings
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/awg_dashboard
# JWT_SECRET=your_secret_key
# NODE_ENV=development

# Start MongoDB (in a separate terminal)
mongod

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../front

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

1. Open your browser and go to `http://localhost:5173`
2. Register a new account
3. Login and start using the dashboard

## 📁 Project Structure

```
AWG/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── sensorController.js  # Sensor data management
│   │   ├── consumptionController.js
│   │   ├── errorController.js
│   │   └── maintenanceController.js
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── SensorData.js        # Sensor data schema
│   │   ├── WaterConsumption.js
│   │   ├── ErrorLog.js
│   │   └── MaintenanceRequest.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── sensorRoutes.js
│   │   ├── consumptionRoutes.js
│   │   ├── errorRoutes.js
│   │   └── maintenanceRoutes.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── server.js                # Main server file
│   ├── package.json
│   └── .env
│
├── front/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   └── MainLayout.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── WaterLevelGauge.jsx
│   │   │   │   ├── PHLevelIndicator.jsx
│   │   │   │   ├── ProductionChart.jsx
│   │   │   │   ├── SystemStatus.jsx
│   │   │   │   └── HydrationTracker.jsx
│   │   │   └── Errors/
│   │   │       └── ErrorList.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Production.jsx
│   │   │   ├── Consumption.jsx
│   │   │   ├── Errors.jsx
│   │   │   ├── Maintenance.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── Community.jsx
│   │   ├── store/
│   │   │   └── useStore.js      # Zustand state management
│   │   ├── config/
│   │   │   ├── api.js           # Axios configuration
│   │   │   └── socket.js        # Socket.io configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Sensors
- `GET /api/sensors/current` - Get current sensor data
- `GET /api/sensors/historical` - Get historical data
- `GET /api/sensors/stats` - Get production statistics
- `POST /api/sensors` - Add sensor data (for IoT devices)

### Consumption
- `GET /api/consumption` - Get user consumption data
- `POST /api/consumption` - Add consumption record
- `GET /api/consumption/stats` - Get consumption statistics
- `GET /api/consumption/hydration/daily` - Get daily hydration progress

### Errors
- `GET /api/errors` - Get error logs
- `POST /api/errors` - Add error log
- `GET /api/errors/stats` - Get error statistics
- `PUT /api/errors/:id/resolve` - Mark error as resolved

### Maintenance
- `GET /api/maintenance` - Get user's maintenance requests
- `POST /api/maintenance` - Create maintenance request
- `PUT /api/maintenance/:id` - Update maintenance request

## 🔄 Real-time Events (Socket.io)

- `sensorUpdate` - Real-time sensor data updates
- `errorAlert` - Real-time error notifications
- `consumptionUpdate` - Water consumption updates
- `maintenanceRequest` - New maintenance request
- `maintenanceUpdate` - Maintenance request status update

## 🧪 Development Features

The backend includes a data simulator that generates random sensor data every 10 seconds in development mode. This allows you to test the real-time features without actual IoT hardware.

## 🎨 UI Features

- **Responsive Design**: Works seamlessly on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Live data without page refresh
- **Interactive Charts**: Recharts-powered visualizations
- **Modern UI**: Clean, professional interface with TailwindCSS

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Environment variable management

## 📊 Database Schema

### User
- Personal information (name, email, age, weight)
- Activity level and hydration goals
- Preferences (theme, notifications)
- Authentication credentials

### SensorData
- Water level, pH level, temperature, humidity
- Water production, power consumption
- System status and timestamps

### WaterConsumption
- User-specific consumption records
- Amount and type of usage
- Timestamps for tracking

### ErrorLog
- Error severity and codes
- Messages and descriptions
- Resolution status

### MaintenanceRequest
- Request type and priority
- Status tracking
- System diagnostics
- Technician notes

## 🚧 Future Enhancements

- [ ] AI chatbot for hydration assistance
- [ ] Gamification with challenges and badges
- [ ] Environmental impact dashboard
- [ ] Predictive maintenance with ML
- [ ] Multi-unit management
- [ ] Community features and forums
- [ ] Voice control integration
- [ ] AR troubleshooting guide
- [ ] PWA capabilities
- [ ] Mobile app (React Native)

## 📝 License

ISC

## 👥 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 🆘 Support

For issues or questions, please check the documentation in the backend and frontend README files.

---

**Built with ❤️ for sustainable water solutions**
# AWG
