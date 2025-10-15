import WaterConsumption from '../models/WaterConsumption.js';

export const addConsumption = async (req, res) => {
  try {
    const consumption = await WaterConsumption.create({
      userId: req.user._id,
      ...req.body
    });

    req.app.get('io').emit('consumptionUpdate', consumption);
    
    res.status(201).json(consumption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserConsumption = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = { userId: req.user._id };
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const consumption = await WaterConsumption.find(query)
      .sort({ timestamp: -1 })
      .limit(1000);

    res.json(consumption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConsumptionStats = async (req, res) => {
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

    const stats = await WaterConsumption.aggregate([
      { 
        $match: { 
          userId: req.user._id,
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const totalConsumption = stats.reduce((sum, item) => sum + item.total, 0);

    res.json({
      total: totalConsumption,
      byType: stats,
      period
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDailyHydration = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const hydration = await WaterConsumption.aggregate([
      {
        $match: {
          userId: req.user._id,
          type: 'drinking',
          timestamp: { $gte: startOfDay }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    res.json({
      consumed: hydration[0]?.total || 0,
      goal: req.user.hydrationGoal,
      percentage: ((hydration[0]?.total || 0) / req.user.hydrationGoal) * 100
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
