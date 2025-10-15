import MaintenanceRequest from '../models/MaintenanceRequest.js';
import SensorData from '../models/SensorData.js';

export const createMaintenanceRequest = async (req, res) => {
  try {
    // Get current system diagnostics
    const latestSensorData = await SensorData.findOne().sort({ timestamp: -1 });
    
    const maintenanceRequest = await MaintenanceRequest.create({
      userId: req.user._id,
      ...req.body,
      systemDiagnostics: latestSensorData
    });

    await maintenanceRequest.populate('userId', 'name email');
    
    req.app.get('io').emit('maintenanceRequest', maintenanceRequest);
    
    res.status(201).json(maintenanceRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMaintenanceRequests = async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { userId: req.user._id };
    if (status) query.status = status;

    const requests = await MaintenanceRequest.find(query)
      .sort({ timestamp: -1 })
      .populate('userId', 'name email');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMaintenanceRequest = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id);
    
    if (request) {
      Object.assign(request, req.body);
      
      if (req.body.status === 'completed') {
        request.completedDate = new Date();
      }
      
      await request.save();
      await request.populate('userId', 'name email');
      
      req.app.get('io').emit('maintenanceUpdate', request);
      
      res.json(request);
    } else {
      res.status(404).json({ message: 'Maintenance request not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMaintenanceRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .sort({ timestamp: -1 })
      .populate('userId', 'name email');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
