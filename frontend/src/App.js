//import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import EmployeesPage from './pages/EmployeesPage/EmployeesPage';
//import LeavesPage from './pages/LeavesPage/LeavesPage';
//import './App.css';
//import LoginPage from './pages/LoginPage/LoginPage';

//function App() {
//  const [employees, setEmployees] = React.useState([
//    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', joiningDate: '2023-01-01', leaveBalance: 20 },
//    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'HR', joiningDate: '2023-02-15', leaveBalance: 20 }
//  ]);

//  const [leaves, setLeaves] = React.useState([
//    { id: 1, employeeId: 1, startDate: '2023-06-01', endDate: '2023-06-05', reason: 'Vacation', status: 'APPROVED', leaveDays: 5 },
//    { id: 2, employeeId: 1, startDate: '2023-08-10', endDate: '2023-08-12', reason: 'Sick leave', status: 'APPROVED', leaveDays: 3 },
//    { id: 3, employeeId: 2, startDate: '2023-07-15', endDate: '2023-07-20', reason: 'Family event', status: 'PENDING', leaveDays: 6 }
//  ]);

//  const handleAddEmployee = (newEmployee) => {
//    setEmployees([...employees, { ...newEmployee, id: employees.length + 1, leaveBalance: 20 }]);
//  };

//  const handleSubmitLeave = (newLeave) => {
//    setLeaves([...leaves, { ...newLeave, id: leaves.length + 1, status: 'PENDING', leaveDays: calculateLeaveDays(newLeave.startDate, newLeave.endDate) }]);
//  };

//  const handleStatusChange = (id, status) => {
//    setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status } : leave));
//  };

//  const calculateLeaveDays = (startDate, endDate) => {
//    const start = new Date(startDate);
//    const end = new Date(endDate);
//    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
//  };

//  return (
//    <Router>
//      <div className="app">
//        <header className="app-header">
//          <h1>Leave Management System</h1>
//          <nav className="main-nav">
//            <Link to="/">Home</Link>
//            <Link to="/employees">Employees</Link>
//            <Link to="/leaves">Leaves</Link>
//          </nav>
//        </header>

//        <main className="app-content">
//          <Routes>
//            <Route path="/" element={
//              <div className="home-page">
//                <h2>Welcome to Leave Management System</h2>
//                <p>Select a section from the navigation menu above</p>
//              </div>
//            } />
//            <Route path = '/login'element = {<LoginPage/>}/>
            
//          </Routes>
//        </main>
//      </div>
//    </Router>
//  );
//}

//export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage/LoginPage';
import EmployeesPage from './pages/EmployeesPage/EmployeesPage';
import EmployeeDashboard from './pages/EmployeeDashboard/EmployeeDashboard';
import AddEmployeePage from './pages/AddEmployeePage/AddEmployeePage';
import ApplyLeavePage from './pages/ApplyLeavePage/ApplyLeavePage';
import MyLeavesPage from './pages/MyLeavesPage/MyLeavesPage';
import PendingLeavesPage from './pages/PendingLeavesPage/PendingLeavesPage';


function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || null);

  return (
    <Router>
      <Navbar role={role} setRole={setRole} />
      <main>
        <Routes>
          <Route path="/" element={<h2>Welcome to Leave Management System</h2>} />
          <Route path="/login" element={<LoginPage setRole={setRole} />} />
          {/* HR-only routes */}
        {role === 'HR' && (
          <>
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/employees/:id" element={<EmployeeDashboard />} />
            <Route path="/add-employee" element={<AddEmployeePage/>} />
            <Route path="/leaves" element={<PendingLeavesPage/>} />
          </>
        )}

        {/* You can also add EMPLOYEE-only routes here */}
        {role === 'EMPLOYEE' && (
          <>
            <Route path="/apply-leave" element={<ApplyLeavePage/>} />
            <Route path="/my-leaves" element={<MyLeavesPage/>} />
            <Route path="/dashboard" element={<EmployeeDashboard />} />
          </>
        )}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
