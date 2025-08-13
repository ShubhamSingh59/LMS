import models from '../models/index.js';

const { Employee, Leave } = models;


export { Employee, Leave };
import { Op } from 'sequelize';

export async function getAllLeaves(req, res) {
  try {
    const leaves = await Leave.findAll({
      include: [{
        model: Employee,
        as: 'employee',
        attributes: ['id', 'name', 'email', 'department']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createLeave(req, res) {
  try {
    const employee = await Employee.findByPk(req.body.employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Validate dates
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    
    if (startDate < new Date(employee.joiningDate)) {
      return res.status(400).json({ error: 'Cannot take leave before joining date' });
    }

    if (endDate < startDate) {
      return res.status(400).json({ error: 'End date cannot be before start date' });
    }

    // Calculate leave days
    const leaveDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // Check leave balance
    const approvedLeaves = await employee.getLeaves({
      where: { status: 'APPROVED' }
    });
    const totalTaken = approvedLeaves.reduce((sum, leave) => sum + leave.leaveDays, 0);
    const remaining = employee.leaveBalance - totalTaken;

    if (leaveDays > remaining) {
      return res.status(400).json({ error: 'Insufficient leave balance' });
    }

    // Check for overlapping leaves
    const overlappingLeave = await Leave.findOne({
      where: {
        employeeId: req.body.employeeId,
        [Op.or]: [
          {
            startDate: { [Op.between]: [req.body.startDate, req.body.endDate] }
          },
          {
            endDate: { [Op.between]: [req.body.startDate, req.body.endDate] }
          }
        ]
      }
    });

    if (overlappingLeave) {
      return res.status(400).json({ error: 'Overlapping with existing leave' });
    }

    // Create leave
    const leave = await Leave.create({
      ...req.body,
      leaveDays,
      status: 'PENDING'
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMyLeaves(req, res) {
  try {
    const employeeId = req.user.id;

    const employee = await Employee.findByPk(employeeId, {
      attributes: ['id', 'name', 'leaveBalance', 'joiningDate']
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const leaves = await Leave.findAll({
      where: { employeeId },
      attributes: ['startDate', 'endDate', 'status', 'reason', 'leaveDays'],
      order: [['startDate', 'DESC']]
    });

    res.json({
      employee: {
        name: employee.name,
        leaveBalance: employee.leaveBalance
      },
      leaves
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPendingLeaves(req, res) {
  try {
    const leaves = await Leave.findAll({
      where: { status: 'PENDING' },
      include: [{
        model: Employee,
        as: 'employee',
        attributes: ['id', 'name', 'department', 'leaveBalance']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function updateLeaveStatus(req, res) {
  try {
    const leave = await Leave.findByPk(req.params.id, {
      include: [{
        model: Employee,
        as: 'employee'
      }]
    });

    if (!leave) {
      return res.status(404).json({ error: 'Leave not found' });
    }

    const originalStatus = leave.status;
    const newStatus = req.body.status;

    // Update leave status
    leave.status = newStatus;
    await leave.save();

    // Update leave balance if status changed to/from APPROVED
    if (originalStatus !== 'APPROVED' && newStatus === 'APPROVED') {
      leave.employee.leaveBalance -= leave.leaveDays;
      await leave.employee.save();
    } else if (originalStatus === 'APPROVED' && newStatus !== 'APPROVED') {
      leave.employee.leaveBalance += leave.leaveDays;
      await leave.employee.save();
    }

    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}