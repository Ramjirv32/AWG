# 🚀 Quick Start Guide - AWG Dashboard

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v16+)
- ✅ MongoDB installed (v5+)
- ✅ npm or yarn package manager

## Step-by-Step Setup

### 1. Start MongoDB

Open a terminal and start MongoDB:

```bash
mongod
```

Keep this terminal open. MongoDB must be running for the application to work.

### 2. Option A: Use the Startup Script (Recommended)

The easiest way to start both servers:

```bash
cd /home/ramji/Documents/AWG
./start.sh
```

This will start both backend and frontend servers automatically.

### 2. Option B: Manual Start

If you prefer to start servers manually:

**Terminal 1 - Backend:**
```bash
cd /home/ramji/Documents/AWG/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /home/ramji/Documents/AWG/front
npm run dev
```

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### 4. Create Your Account

1. Click "Sign up" on the login page
2. Fill in your details:
   - Full Name
   - Email
   - Password
   - Age (optional)
   - Weight (optional)
3. Click "Create Account"

### 5. Explore the Dashboard

Once logged in, you'll see:
- **Real-time sensor data** updating every 10 seconds
- **Water level gauge** showing tank status
- **pH level indicator** with safe range visualization
- **Production charts** with historical trends
- **Hydration tracker** for your daily water intake

## 🎯 First Steps

### Log Your First Water Intake
1. Go to "Usage & Hydration" page
2. Click "Log Water"
3. Enter amount (or use preset buttons)
4. Click "Log Water"

### Create a Maintenance Request
1. Go to "Maintenance" page
2. Click "New Request"
3. Fill in the details
4. Submit the request

### Customize Your Settings
1. Go to "Settings" page
2. Update your profile information
3. Set your hydration goal
4. Configure notification preferences
5. Click "Save Changes"

## 📊 Understanding the Dashboard

### Dashboard Page
- **Stat Cards**: Quick overview of key metrics
- **Water Level Gauge**: Visual representation of tank level
- **pH Indicator**: Shows water quality status
- **System Status**: Current operational state
- **Production Chart**: Historical water production data
- **Hydration Tracker**: Your daily water consumption progress
- **Error List**: Recent system alerts

### Color Coding
- 🟢 **Green**: Optimal/Good status
- 🟡 **Yellow**: Warning/Acceptable status
- 🔴 **Red**: Critical/Error status
- 🔵 **Blue**: Info/Maintenance status

## 🔧 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify port 5000 is not in use
- Check `.env` file configuration

### Frontend won't start
- Verify port 5173 is not in use
- Check if backend is running
- Clear npm cache: `npm cache clean --force`

### No real-time updates
- Check browser console for errors
- Verify WebSocket connection
- Restart both servers

### Database connection error
- Ensure MongoDB is running
- Check MongoDB URI in `.env`
- Verify MongoDB is accessible on localhost:27017

## 🎨 Features to Try

1. **Toggle Dark Mode**: Click the moon/sun icon in the header
2. **View Real-time Updates**: Watch the dashboard update automatically
3. **Track Hydration**: Set goals and log water intake
4. **Monitor System Health**: Check error logs and system status
5. **Request Maintenance**: Create and track service requests

## 📱 Mobile Access

The dashboard is fully responsive! Access it from:
- Desktop browsers
- Tablets
- Mobile phones

## 🔐 Default Credentials

There are no default credentials. You must register a new account on first use.

## 📝 Sample Data

The backend includes a data simulator that generates:
- Sensor readings every 10 seconds
- Random water production data
- Occasional error alerts
- System status updates

This allows you to test the application without actual IoT hardware.

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints in backend/README.md
- Check component documentation in frontend/README.md

## 🎉 You're All Set!

Enjoy using the AWG Dashboard! The system will automatically:
- Update sensor data in real-time
- Track your water consumption
- Monitor system health
- Alert you to any issues

---

**Happy Monitoring! 💧**
