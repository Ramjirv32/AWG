# 🧪 Testing Guide - AWG Dashboard

## Pre-Flight Checklist

Before running the application, verify:

- [ ] Node.js installed: `node --version` (should be v16+)
- [ ] MongoDB installed: `mongod --version` (should be v5+)
- [ ] npm installed: `npm --version`
- [ ] All dependencies installed in both backend and frontend
- [ ] MongoDB is running

## Step-by-Step Testing

### 1. Start MongoDB

```bash
# In a new terminal
mongod

# You should see:
# "Waiting for connections on port 27017"
```

**Troubleshooting:**
- If port 27017 is in use: `sudo lsof -i :27017` to find the process
- If MongoDB won't start: Check `/var/log/mongodb/mongod.log`

### 2. Start Backend Server

```bash
# In a new terminal
cd /home/ramji/Documents/AWG/backend
npm run dev

# You should see:
# "Server running on port 5000"
# "MongoDB Connected: localhost"
# "Environment: development"
```

**Expected Console Output:**
```
Server running on port 5000
Environment: development
MongoDB Connected: localhost
```

**Test Backend Health:**
```bash
# In another terminal
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","timestamp":"2024-10-14T..."}
```

### 3. Start Frontend Server

```bash
# In a new terminal
cd /home/ramji/Documents/AWG/front
npm run dev

# You should see:
# "VITE v... ready in ... ms"
# "➜  Local:   http://localhost:5173/"
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the login page with the AWG logo.

## Testing User Registration

### Test Case 1: Create New User

1. Click "Sign up" link
2. Fill in the registration form:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Password:** password123
   - **Confirm Password:** password123
   - **Age:** 25 (optional)
   - **Weight:** 70 (optional)

3. Click "Create Account"

**Expected Result:**
- ✅ Redirect to dashboard
- ✅ Welcome message shows "Welcome back, Test User!"
- ✅ Dashboard loads with data

**Verify in MongoDB:**
```bash
mongosh
use awg_dashboard
db.users.find().pretty()

# You should see your user document
```

### Test Case 2: Login with Existing User

1. Logout (click user icon → Logout)
2. Enter credentials:
   - **Email:** test@example.com
   - **Password:** password123
3. Click "Sign In"

**Expected Result:**
- ✅ Successful login
- ✅ Redirect to dashboard
- ✅ Token stored in localStorage

## Testing Dashboard Features

### Test Case 3: Real-time Sensor Updates

1. Navigate to Dashboard
2. Observe the stat cards and charts
3. Wait 10 seconds

**Expected Result:**
- ✅ Data updates automatically
- ✅ Charts show new data points
- ✅ Water level gauge animates
- ✅ No page refresh needed

**Verify in Browser Console:**
```javascript
// Open DevTools (F12) → Console
// You should see Socket.io connection messages
```

### Test Case 4: Water Level Gauge

**Expected Behavior:**
- Shows percentage (0-100%)
- Color changes based on level:
  - Red: < 20%
  - Yellow: 20-50%
  - Blue: > 50%
- Smooth animation on updates

### Test Case 5: pH Level Indicator

**Expected Behavior:**
- Shows pH value (0-14)
- Marker position updates
- Color indicates status:
  - Red: < 6.5 or > 8.5 (dangerous)
  - Yellow: 6.5-7 or 8-8.5 (acceptable)
  - Green: 7-8 (optimal)

### Test Case 6: Production Chart

**Expected Behavior:**
- Shows historical data
- Smooth line/area chart
- Tooltip on hover
- X-axis shows time
- Y-axis shows liters

## Testing Water Consumption

### Test Case 7: Log Water Intake

1. Navigate to "Usage & Hydration"
2. Click "Log Water"
3. Enter amount: 250ml (or use preset button)
4. Click "Log Water"

**Expected Result:**
- ✅ Modal closes
- ✅ Hydration tracker updates
- ✅ Progress ring animates
- ✅ Percentage increases

**Verify in Database:**
```bash
mongosh
use awg_dashboard
db.waterconsumptions.find().pretty()
```

### Test Case 8: Hydration Progress

1. Log multiple water intakes
2. Watch the circular progress indicator

**Expected Behavior:**
- Progress ring fills up
- Color changes:
  - Red: < 30% of goal
  - Yellow: 30-70% of goal
  - Green: > 70% of goal
- Percentage updates in real-time

## Testing Error System

### Test Case 9: View Errors

1. Navigate to "System Health & Errors"
2. Wait for simulated errors to appear

**Expected Result:**
- ✅ Error list displays
- ✅ Errors color-coded by severity
- ✅ Timestamps shown
- ✅ Error descriptions visible

**Error Severity Colors:**
- 🔴 Critical: Red background
- 🟡 Warning: Yellow background
- 🔵 Info: Blue background

### Test Case 10: Real-time Error Alerts

1. Stay on the Errors page
2. Wait for new errors (random, ~5% chance every 10s)

**Expected Result:**
- ✅ New errors appear automatically
- ✅ No page refresh needed
- ✅ Error count updates

## Testing Maintenance

### Test Case 11: Create Maintenance Request

1. Navigate to "Maintenance & Support"
2. Click "New Request"
3. Fill in the form:
   - **Type:** Routine Maintenance
   - **Priority:** Medium
   - **Description:** "Test maintenance request"
4. Click "Submit Request"

**Expected Result:**
- ✅ Modal closes
- ✅ Request appears in list
- ✅ Status badge shows "pending"
- ✅ Timestamp is current

**Verify in Database:**
```bash
mongosh
use awg_dashboard
db.maintenancerequests.find().pretty()
```

## Testing Settings

### Test Case 12: Update Profile

1. Navigate to "Settings"
2. Update information:
   - Change name
   - Update hydration goal
   - Toggle notification preferences
3. Click "Save Changes"

**Expected Result:**
- ✅ Success message appears
- ✅ Header shows updated name
- ✅ Changes persist after logout/login

### Test Case 13: Theme Toggle

1. Click moon/sun icon in header
2. Observe theme change

**Expected Result:**
- ✅ Entire UI switches theme
- ✅ Colors invert appropriately
- ✅ Theme persists on page reload

## Testing Navigation

### Test Case 14: Sidebar Navigation

1. Click each menu item in sidebar
2. Verify page loads

**Expected Pages:**
- ✅ Dashboard
- ✅ Water Production
- ✅ Usage & Hydration
- ✅ System Health
- ✅ Maintenance
- ✅ Reports (placeholder)
- ✅ Community (placeholder)
- ✅ Settings

### Test Case 15: Mobile Responsiveness

1. Resize browser to mobile width (< 768px)
2. Click hamburger menu icon
3. Navigate between pages

**Expected Result:**
- ✅ Sidebar becomes overlay
- ✅ Hamburger menu appears
- ✅ Sidebar closes after navigation
- ✅ All content responsive

## API Testing with curl

### Test Authentication

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test User",
    "email": "apitest@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "password123"
  }'

# Save the token from response
```

### Test Protected Endpoints

```bash
# Get current sensor data
curl http://localhost:5000/api/sensors/current \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get user profile
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get errors
curl http://localhost:5000/api/errors \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Performance Testing

### Test Case 16: Load Testing

1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate to Dashboard
4. Check:
   - Initial page load time
   - API response times
   - WebSocket connection

**Expected Performance:**
- Page load: < 2 seconds
- API calls: < 100ms
- WebSocket: Connected immediately

### Test Case 17: Memory Leaks

1. Open DevTools → Performance
2. Start recording
3. Navigate between pages multiple times
4. Stop recording
5. Check memory usage

**Expected Result:**
- ✅ Memory usage stable
- ✅ No continuous growth
- ✅ Garbage collection working

## Database Testing

### Verify Data Structure

```bash
mongosh
use awg_dashboard

# Check collections
show collections

# Expected collections:
# - users
# - sensordatas
# - waterconsumptions
# - errorlogs
# - maintenancerequests

# Check indexes
db.sensordatas.getIndexes()
db.users.getIndexes()

# Sample data
db.sensordatas.find().limit(5).pretty()
```

### Test Data Simulator

The backend automatically generates sensor data every 10 seconds in development mode.

**Verify:**
```bash
# Watch sensor data being created
mongosh
use awg_dashboard
db.sensordatas.find().sort({timestamp: -1}).limit(1).pretty()

# Wait 10 seconds and run again
# You should see a new document
```

## Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"

**Solution:**
```bash
# Check if MongoDB is running
ps aux | grep mongod

# If not running, start it
mongod

# Or as a service
sudo systemctl start mongod
```

### Issue 2: "Port 5000 already in use"

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

### Issue 3: "WebSocket connection failed"

**Solution:**
1. Check backend is running
2. Verify CORS settings
3. Check browser console for errors
4. Restart both servers

### Issue 4: "JWT token invalid"

**Solution:**
1. Logout and login again
2. Clear localStorage
3. Check JWT_SECRET in backend/.env

### Issue 5: "Charts not displaying"

**Solution:**
1. Check if data exists in database
2. Verify API calls in Network tab
3. Check browser console for errors
4. Ensure Recharts is installed

## Browser Compatibility

Test in multiple browsers:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Security Testing

### Test Case 18: Protected Routes

1. Logout
2. Try to access: `http://localhost:5173/dashboard`

**Expected Result:**
- ✅ Redirect to login page
- ✅ Cannot access protected routes

### Test Case 19: Token Expiration

1. Login
2. Manually expire token in localStorage
3. Try to make API call

**Expected Result:**
- ✅ Redirect to login
- ✅ Token cleared
- ✅ Error message shown

## Final Checklist

Before considering testing complete:

- [ ] User registration works
- [ ] User login works
- [ ] Dashboard displays data
- [ ] Real-time updates working
- [ ] Water logging works
- [ ] Hydration tracker updates
- [ ] Error list displays
- [ ] Maintenance requests work
- [ ] Settings save correctly
- [ ] Theme toggle works
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Database storing data
- [ ] WebSocket connected
- [ ] API endpoints responding
- [ ] Charts rendering
- [ ] Logout works

## Test Results Template

```
Test Date: ___________
Tester: ___________

✅ Backend Running: Yes/No
✅ Frontend Running: Yes/No
✅ MongoDB Connected: Yes/No
✅ User Registration: Pass/Fail
✅ User Login: Pass/Fail
✅ Real-time Updates: Pass/Fail
✅ Water Logging: Pass/Fail
✅ Error Display: Pass/Fail
✅ Maintenance: Pass/Fail
✅ Settings: Pass/Fail
✅ Theme Toggle: Pass/Fail
✅ Mobile Responsive: Pass/Fail

Notes:
_________________________________
_________________________________
```

## Automated Testing (Future)

For production, consider adding:
- Jest for unit tests
- React Testing Library for component tests
- Cypress for E2E tests
- Supertest for API tests

---

**Happy Testing! 🧪**

If all tests pass, your AWG Dashboard is fully functional and ready to use!
