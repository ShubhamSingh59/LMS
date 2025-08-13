// src/pages/EmployeesPage/EmployeesPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import './EmployeesPage.css';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/employees', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddEmployee = () => {
    navigate('/add-employee'); // Navigate to Add Employee form page
  };

  return (
    <div className="employees-container">
      <h2>Employees</h2>
      <EmployeeList employees={employees} />

      {/* Add Employee Button */}
      <div className="add-employee-container">
        <button className="add-employee-btn" onClick={handleAddEmployee}>
          ➕ Add Employee
        </button>
      </div>
    </div>
  );
};

export default EmployeesPage;
