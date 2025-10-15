import mongoose from 'mongoose';

const waterConsumptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0 // ml
  },
  type: {
    type: String,
    enum: ['drinking', 'cooking', 'cleaning', 'other'],
    default: 'drinking'
  },
  deviceId: {
    type: String,
    default: 'AWG-001'
  }
});

waterConsumptionSchema.index({ userId: 1, timestamp: -1 });

const WaterConsumption = mongoose.model('WaterConsumption', waterConsumptionSchema);

export default WaterConsumption;
