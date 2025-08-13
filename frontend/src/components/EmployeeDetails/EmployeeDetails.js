import React from 'react';
import './EmployeeDetails.css';

const EmployeeDetails = ({ employee }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

  return (
    <div className="employee-details">
      <h2>{employee.name} - {employee.department}</h2>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Joining Date:</strong> {formatDate(employee.joiningDate)}</p>
      <p><strong>Leave Balance:</strong> {employee.leaveBalance}</p>
      <p><strong>Created At:</strong> {formatDate(employee.createdAt)}</p>
    </div>
  );
};

export default EmployeeDetails;

