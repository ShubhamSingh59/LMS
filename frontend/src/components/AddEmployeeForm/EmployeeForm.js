// src/components/EmployeeForm/EmployeeForm.js
import React, { useState } from 'react';
import './EmployeeForm.css';

function EmployeeForm({ onEmployeeAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Engineering',
    joiningDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.department || !formData.joiningDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Employee added successfully");
        setFormData({ name: '', email: '', password: '', department: 'Engineering', joiningDate: '' });
        if (onEmployeeAdded) onEmployeeAdded();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add employee");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Add Employee</h2>

      <div className="form-group">
        <label>Name</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input 
          type="password" 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Department</label>
        <select
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        >
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div className="form-group">
        <label>Joining Date</label>
        <input 
          type="date" 
          value={formData.joiningDate}
          onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
        />
      </div>

      <button type="submit">Add Employee</button>
    </form>
  );
}

export default EmployeeForm;
