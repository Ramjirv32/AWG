import mongoose from 'mongoose';

const errorLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  severity: {
    type: String,
    enum: ['critical', 'warning', 'info'],
    required: true
  },
  errorCode: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  resolved: {
    type: Boolean,
    default: false
  },
  resolvedAt: {
    type: Date
  },
  deviceId: {
    type: String,
    default: 'AWG-001'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
});

errorLogSchema.index({ timestamp: -1, severity: 1 });

const ErrorLog = mongoose.model('ErrorLog', errorLogSchema);

export default ErrorLog;
