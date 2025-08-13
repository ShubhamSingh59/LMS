// backend/models/index.js
import models from '../models/index.js';

const { Employee, Leave } = models;


export { Employee, Leave };
import { Op } from 'sequelize';

export async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getEmployee(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createEmployee(req, res) {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getLeaveBalance(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const approvedLeaves = await employee.getLeaves({
      where: { status: 'APPROVED' }
    });

    const totalTaken = approvedLeaves.reduce((sum, leave) => sum + leave.leaveDays, 0);
    const remaining = employee.leaveBalance - totalTaken;

    res.json({
      totalAvailable: employee.leaveBalance,
      totalTaken,
      remaining
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getMe = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "department", "joiningDate", "leaveBalance"]
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};