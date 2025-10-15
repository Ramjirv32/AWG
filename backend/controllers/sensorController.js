import SensorData from '../models/SensorData.js';

export const getCurrentData = async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ timestamp: -1 });
    res.json(latestData || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHistoricalData = async (req, res) => {
  try {
    const { startDate, endDate, interval = 'hour' } = req.query;
    
    const query = {};
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const data = await SensorData.find(query)
      .sort({ timestamp: -1 })
      .limit(1000);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addSensorData = async (req, res) => {
  try {
    const sensorData = await SensorData.create(req.body);
    
    // Emit real-time update via Socket.io
    req.app.get('io').emit('sensorUpdate', sensorData);
    
    res.status(201).json(sensorData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductionStats = async (req, res) => {
  try {
    const { period = 'day' } = req.query;
    
    let startDate = new Date();
    switch(period) {
      case 'day':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
    }

    const stats = await SensorData.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      {
        $group: {
          _id: null,
          totalProduction: { $sum: '$waterProduction' },
          avgPhLevel: { $avg: '$phLevel' },
          avgWaterLevel: { $avg: '$waterLevel' },
          avgTemperature: { $avg: '$temperature' },
          avgHumidity: { $avg: '$humidity' },
          totalPowerConsumption: { $sum: '$powerConsumption' }
        }
      }
    ]);

    res.json(stats[0] || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
