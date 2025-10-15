import express from 'express';
import {
  addConsumption,
  getUserConsumption,
  getConsumptionStats,
  getDailyHydration
} from '../controllers/consumptionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getUserConsumption)
  .post(protect, addConsumption);

router.get('/stats', protect, getConsumptionStats);
router.get('/hydration/daily', protect, getDailyHydration);

export default router;
