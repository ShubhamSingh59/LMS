import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = ({ employees }) => {
  return (
    <div className="employee-list">
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            <Link to={`/employees/${emp.id}`}>
              {emp.name} - {emp.department}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
