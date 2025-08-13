import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

import EmployeeModel from './Employee.js';
import LeaveModel from './Leave.js';

const Employee = EmployeeModel(sequelize, DataTypes);
const Leave = LeaveModel(sequelize, DataTypes);

// Run associations
Employee.associate({ Leave });
Leave.associate({ Employee });

export default {
  Employee,
  Leave,
  sequelize,
  Sequelize
};
