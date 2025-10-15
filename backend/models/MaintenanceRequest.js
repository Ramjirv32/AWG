import mongoose from 'mongoose';

const maintenanceRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['routine', 'repair', 'emergency', 'inspection'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  description: {
    type: String,
    required: true
  },
  systemDiagnostics: {
    type: mongoose.Schema.Types.Mixed
  },
  scheduledDate: {
    type: Date
  },
  completedDate: {
    type: Date
  },
  technicianNotes: {
    type: String
  },
  deviceId: {
    type: String,
    default: 'AWG-001'
  }
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

export default MaintenanceRequest;
