import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models/index.js';
const { Employee } = models;


dotenv.config();

const hrEmails = process.env.HR_EMAILS.split(',');
const hrPasswords = process.env.HR_PASSWORDS.split(',');

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if HR
    const hrIndex = hrEmails.indexOf(email);
    if (hrIndex !== -1 && password === hrPasswords[hrIndex]) {
      const token = jwt.sign({ email, role: 'HR' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, role: 'HR' });
    }

    // Check normal employee from DB
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: employee.id, role: 'EMPLOYEE' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, role: 'EMPLOYEE' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
