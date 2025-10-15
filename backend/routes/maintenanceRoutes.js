import express from 'express';
import {
  createMaintenanceRequest,
  getMaintenanceRequests,
  updateMaintenanceRequest,
  getAllMaintenanceRequests
} from '../controllers/maintenanceController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getMaintenanceRequests)
  .post(protect, createMaintenanceRequest);

router.get('/all', protect, admin, getAllMaintenanceRequests);
router.put('/:id', protect, updateMaintenanceRequest);

export default router;
