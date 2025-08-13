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
