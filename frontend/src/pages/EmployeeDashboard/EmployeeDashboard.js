import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeDetails from '../../components/EmployeeDetails/EmployeeDetails';

const EmployeeDashboard = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');

        // If id is provided (HR view), fetch by ID; otherwise fetch current user
        const endpoint = id
          ? `http://localhost:5000/api/employees/${id}`
          : `http://localhost:5000/api/employees/me`;

        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to fetch employee data');

        const data = await res.json();
        setEmployee(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return <EmployeeDetails employee={employee} />;
};

export default EmployeeDashboard;
