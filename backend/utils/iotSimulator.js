import SensorData from '../models/SensorData.js';
import ErrorLog from '../models/ErrorLog.js';
import WaterConsumption from '../models/WaterConsumption.js';
import User from '../models/User.js';

// Simulate IoT device sending sensor data
export const simulateSensorData = async (io) => {
  try {
    const waterLevel = Math.random() * 100;
    const phLevel = 6.5 + Math.random() * 2; // pH between 6.5 and 8.5
    const waterProduction = Math.random() * 5; // 0-5 liters per reading
    const temperature = 20 + Math.random() * 15; // 20-35°C
    const humidity = 40 + Math.random() * 40; // 40-80%
    const powerConsumption = Math.random() * 2; // 0-2 kWh

    let systemStatus = 'operational';
    if (waterLevel > 95) systemStatus = 'warning';
    if (phLevel < 6.5 || phLevel > 8.5) systemStatus = 'warning';

    const sensorData = await SensorData.create({
      waterLevel,
      phLevel,
      waterProduction,
      temperature,
      humidity,
      systemStatus,
      powerConsumption
    });

    // Emit to all connected clients
    io.emit('sensorUpdate', sensorData);

    // Randomly generate errors (5% chance)
    if (Math.random() > 0.95) {
      await generateRandomError(io);
    }

    return sensorData;
  } catch (error) {
    console.error('Error simulating sensor data:', error);
  }
};

// Simulate random errors
const generateRandomError = async (io) => {
  const errorCodes = [
    { code: 'ERR_001', message: 'Low humidity detected', severity: 'warning' },
    { code: 'ERR_002', message: 'High temperature alert', severity: 'warning' },
    { code: 'ERR_003', message: 'pH level out of range', severity: 'critical' },
    { code: 'ERR_004', message: 'Water tank nearly full', severity: 'info' },
    { code: 'ERR_005', message: 'Filter replacement needed', severity: 'warning' },
    { code: 'ERR_006', message: 'Power consumption spike', severity: 'info' }
  ];
  
  const randomError = errorCodes[Math.floor(Math.random() * errorCodes.length)];
  const errorLog = await ErrorLog.create({
    errorCode: randomError.code,
    message: randomError.message,
    severity: randomError.severity,
    description: `System detected ${randomError.message.toLowerCase()}`
  });

  io.emit('errorAlert', errorLog);
  return errorLog;
};

// Simulate water consumption for all users
export const simulateUserConsumption = async (io) => {
  try {
    // Get all users
    const users = await User.find();
    
    if (users.length === 0) {
      return;
    }

    // Randomly select 1-3 users to simulate consumption
    const numUsers = Math.min(Math.floor(Math.random() * 3) + 1, users.length);
    const selectedUsers = [];
    
    for (let i = 0; i < numUsers; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      if (!selectedUsers.find(u => u._id.equals(randomUser._id))) {
        selectedUsers.push(randomUser);
      }
    }

    // Simulate consumption for selected users
    for (const user of selectedUsers) {
      // Simulate drinking water (100-500ml)
      const amount = Math.floor(Math.random() * 400) + 100;
      
      const consumption = await WaterConsumption.create({
        userId: user._id,
        amount,
        type: 'drinking'
      });

      // Emit to specific user's socket room
      io.to(user._id.toString()).emit('consumptionUpdate', consumption);
    }
  } catch (error) {
    console.error('Error simulating user consumption:', error);
  }
};

// Simulate realistic daily patterns
export const simulateDailyPattern = async (io) => {
  const hour = new Date().getHours();
  
  // Higher consumption during peak hours (7-9 AM, 12-2 PM, 6-9 PM)
  const isPeakHour = (hour >= 7 && hour <= 9) || 
                     (hour >= 12 && hour <= 14) || 
                     (hour >= 18 && hour <= 21);
  
  if (isPeakHour && Math.random() > 0.3) {
    await simulateUserConsumption(io);
  } else if (Math.random() > 0.7) {
    await simulateUserConsumption(io);
  }
};

// Initialize IoT simulation
export const startIoTSimulation = (io) => {
  console.log('🤖 IoT Simulator started');
  
  // Simulate sensor data every 10 seconds
  setInterval(() => {
    simulateSensorData(io);
  }, 10000);

  // Simulate user consumption every 30 seconds
  setInterval(() => {
    simulateDailyPattern(io);
  }, 30000);

  // Initial data
  simulateSensorData(io);
};
