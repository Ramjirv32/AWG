# 🚀 AWG Dashboard - Quick Reference Card

## ⚡ Start Application (3 Commands)

```bash
# Terminal 1
mongod

# Terminal 2
cd /home/ramji/Documents/AWG/backend && npm run dev

# Terminal 3
cd /home/ramji/Documents/AWG/front && npm run dev
```

**Access:** http://localhost:5173

---

## 🎯 Key Features at a Glance

| Feature | Status | Location |
|---------|--------|----------|
| Real-time Sensor Data | ✅ Working | Dashboard |
| Water Intake Tracking | ✅ Enhanced | Consumption |
| Quick Log Buttons | ✅ New | Consumption |
| IoT Multi-User Simulation | ✅ New | Backend Auto |
| Community Leaderboard | ✅ Complete | Community |
| Contact Form | ✅ New | Contact |
| Dark Mode | ✅ Working | Header Toggle |
| Real-time Updates | ✅ Working | All Pages |

---

## 📊 What Updates Automatically

- **Every 10 seconds:** Sensor data (all users)
- **Every 30 seconds:** Random user water consumption
- **Instantly:** Your manual water logs
- **Real-time:** Error alerts
- **Live:** Hydration tracker updates

---

## 🎮 Quick Actions

### Log Water (3 Ways)
1. **Quick:** Click preset button (250ml, 500ml, 750ml, 1000ml)
2. **Custom:** Click "Log Water" → Enter amount → Submit
3. **Auto:** Wait for IoT simulator (every 30s for random users)

### View Real-time Data
1. Dashboard → See all metrics update live
2. Consumption → Watch hydration tracker
3. Errors → Monitor system alerts

### Test Multi-User
1. Register 2-3 users
2. Login in different tabs
3. Watch each get personalized updates

---

## 🔑 Default Test Users

Create these for testing:
- test1@example.com / password123
- test2@example.com / password123
- test3@example.com / password123

---

## 📱 Pages Overview

| Page | Purpose | Key Features |
|------|---------|--------------|
| Dashboard | Overview | Real-time metrics, charts, gauges |
| Production | Analytics | Water production trends |
| Consumption | Tracking | Quick log, activity feed, tracker |
| Errors | Monitoring | Error logs, alerts |
| Maintenance | Support | Service requests |
| Community | Social | Leaderboard, achievements |
| Contact | Help | Contact form, FAQ |
| Settings | Profile | Preferences, theme |

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't connect | Check MongoDB is running |
| No updates | Verify Socket.io connection |
| Port in use | Kill process or change port |
| CSS warnings | Ignore (Tailwind v4 expected) |

---

## 📂 Important Files

```
Backend:
- server.js (main server)
- utils/iotSimulator.js (data generator)
- models/*.js (database schemas)

Frontend:
- App.jsx (routes)
- pages/Consumption.jsx (enhanced)
- pages/Community.jsx (complete)
- pages/Contact.jsx (new)
```

---

## 🎨 Color Codes

- 🟢 Green: Optimal/Good
- 🟡 Yellow: Warning/Acceptable
- 🔴 Red: Critical/Error
- 🔵 Blue: Info/Maintenance

---

## 💡 Pro Tips

1. **Quick Log:** Use preset buttons for fastest logging
2. **Dark Mode:** Toggle in header for eye comfort
3. **Real-time:** Keep page open to see auto-updates
4. **Multi-tab:** Test with multiple users simultaneously
5. **Activity Feed:** Check recent logs in Consumption page

---

## 📞 Support

- **Email:** support@awgdashboard.com
- **Phone:** +1 (555) 123-4567
- **Contact Page:** Built-in contact form

---

## ✅ Quick Checklist

Before starting:
- [ ] MongoDB installed and running
- [ ] Node.js v16+ installed
- [ ] Dependencies installed (npm install)
- [ ] Ports 5000 and 5173 available

After starting:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can register/login
- [ ] See real-time updates

---

## 🎯 Test Scenarios

**Scenario 1: Basic Flow**
1. Register → Login → Dashboard
2. See sensor data updating
3. Go to Consumption
4. Click quick log button
5. Watch tracker update

**Scenario 2: Multi-User**
1. Create 3 users
2. Login each in different tab
3. Wait 30 seconds
4. See random users get water logged

**Scenario 3: Real-time**
1. Open Dashboard
2. Wait 10 seconds
3. See sensor data update
4. Check charts animate

---

## 📚 Documentation

- `README.md` - Main documentation
- `QUICKSTART.md` - Getting started guide
- `TESTING_GUIDE.md` - Detailed testing
- `ARCHITECTURE.md` - System design
- `UPDATES.md` - Latest changes
- `FINAL_STATUS.md` - Complete status
- `QUICK_REFERENCE.md` - This file

---

## 🚀 Ready to Go!

Everything is set up and working. Just:
1. Start MongoDB
2. Start Backend
3. Start Frontend
4. Open browser
5. Enjoy! 🎉

---

**Version:** 1.0.0 | **Status:** ✅ Production Ready | **Last Updated:** Oct 14, 2025
