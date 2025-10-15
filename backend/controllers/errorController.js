import ErrorLog from '../models/ErrorLog.js';

export const getErrors = async (req, res) => {
  try {
    const { severity, resolved } = req.query;
    
    const query = {};
    if (severity) query.severity = severity;
    if (resolved !== undefined) query.resolved = resolved === 'true';

    const errors = await ErrorLog.find(query)
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(errors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addError = async (req, res) => {
  try {
    const errorLog = await ErrorLog.create(req.body);
    
    // Emit real-time error notification
    req.app.get('io').emit('errorAlert', errorLog);
    
    res.status(201).json(errorLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resolveError = async (req, res) => {
  try {
    const errorLog = await ErrorLog.findById(req.params.id);
    
    if (errorLog) {
      errorLog.resolved = true;
      errorLog.resolvedAt = new Date();
      await errorLog.save();
      
      req.app.get('io').emit('errorResolved', errorLog);
      
      res.json(errorLog);
    } else {
      res.status(404).json({ message: 'Error log not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getErrorStats = async (req, res) => {
  try {
    const stats = await ErrorLog.aggregate([
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 },
          unresolved: {
            $sum: { $cond: [{ $eq: ['$resolved', false] }, 1, 0] }
          }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
