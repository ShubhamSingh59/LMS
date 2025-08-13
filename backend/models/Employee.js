import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    joiningDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    leaveBalance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20
    }
  }, {
    timestamps: true,
    tableName: 'employees',
    hooks: {
      beforeCreate: async (employee) => {
        if (employee.password) {
          const salt = await bcrypt.genSalt(10);
          employee.password = await bcrypt.hash(employee.password, salt);
        }
      },
      beforeUpdate: async (employee) => {
        if (employee.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          employee.password = await bcrypt.hash(employee.password, salt);
        }
      }
    }
  });

  Employee.associate = (models) => {
    Employee.hasMany(models.Leave, {
      foreignKey: 'employeeId',
      as: 'leaves'
    });
  };

  return Employee;
};
