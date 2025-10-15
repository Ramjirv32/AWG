import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  waterLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100 // percentage
  },
  phLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 14
  },
  waterProduction: {
    type: Number,
    required: true,
    min: 0 // liters
  },
  temperature: {
    type: Number,
    required: true // Celsius
  },
  humidity: {
    type: Number,
    required: true,
    min: 0,
    max: 100 // percentage
  },
  systemStatus: {
    type: String,
    enum: ['operational', 'warning', 'error', 'maintenance'],
    default: 'operational'
  },
  powerConsumption: {
    type: Number,
    min: 0 // kWh
  },
  deviceId: {
    type: String,
    default: 'AWG-001'
  }
});

// Create index for efficient time-based queries
sensorDataSchema.index({ timestamp: -1 });

const SensorData = mongoose.model('SensorData', sensorDataSchema);

export default SensorData;
