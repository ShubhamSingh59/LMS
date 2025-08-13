import { Router } from 'express';
import {
  getAllEmployees,
  getEmployee,
  createEmployee,
  getLeaveBalance,
  getMe
} from '../controllers/employeeController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', authenticateToken, getMe);

// Get all employees
router.get('/', getAllEmployees);

// Get single employee
router.get('/:id', getEmployee);

// Create new employee
router.post('/', createEmployee);

// Get leave balance
router.get('/:id/balance', getLeaveBalance);

export default router;
