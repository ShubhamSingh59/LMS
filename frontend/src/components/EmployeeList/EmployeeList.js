//import React from 'react';
//import './EmployeeList.css';

//function EmployeeList({ employees }) {
//  if (employees.length === 0) {
//    return <p>No employees found</p>;
//  }

//  return (
//    <div className="employee-list">
//      <h2>Employee List</h2>
//      <table>
//        <thead>
//          <tr>
//            <th>Name</th>
//            <th>Email</th>
//            <th>Department</th>
//            <th>Leave Balance</th>
//          </tr>
//        </thead>
//        <tbody>
//          {employees.map(employee => (
//            <tr key={employee.id}>
//              <td>{employee.name}</td>
//              <td>{employee.email}</td>
//              <td>{employee.department}</td>
//              <td>{employee.leaveBalance} days</td>
//            </tr>
//          ))}
//        </tbody>
//      </table>
//    </div>
//  );
//}

//export default EmployeeList;

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
