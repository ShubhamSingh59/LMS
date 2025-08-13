import { Router } from 'express';
const router = Router();
import { getAllLeaves, createLeave, updateLeaveStatus, getMyLeaves, getPendingLeaves} from '../controllers/leaveController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

// Get leaves for the logged-in user
router.get('/me', authenticateToken, getMyLeaves);

// Get all leaves
router.get('/', getAllLeaves);

// Create new leave
router.post('/', createLeave);

router.get('/pending', getPendingLeaves); 

//// Update leave status
router.patch('/:id/status', updateLeaveStatus);

export default router;