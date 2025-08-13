import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import employeeRoutes from './routes/employees.js';
import leaveRoutes from './routes/leaves.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.js';
import models from './models/index.js';

const { sequelize } = models;

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/employees', employeeRoutes);
app.use("/api/employees", employeeRoutes);

// Error handling
app.use(errorHandler);

// Database connection and server start
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synced successfully');
    app.listen(5000, () => {
      console.log('🚀 Server is running on port 5000');
    });
  })
  .catch(err => {
    console.error('❌ Error syncing database:', err);
  });
export default app;
