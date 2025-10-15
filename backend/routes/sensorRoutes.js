import express from 'express';
import {
  getCurrentData,
  getHistoricalData,
  addSensorData,
  getProductionStats
} from '../controllers/sensorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/current', protect, getCurrentData);
router.get('/historical', protect, getHistoricalData);
router.get('/stats', protect, getProductionStats);
router.post('/', addSensorData); // For IoT devices to post data

export default router;
