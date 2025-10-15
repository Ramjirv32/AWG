import express from 'express';
import {
  getErrors,
  addError,
  resolveError,
  getErrorStats
} from '../controllers/errorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getErrors)
  .post(addError); // For system to post errors

router.get('/stats', protect, getErrorStats);
router.put('/:id/resolve', protect, resolveError);

export default router;
