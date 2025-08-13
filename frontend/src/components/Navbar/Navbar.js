import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ role, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setRole(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <Link to="/">Home</Link>

        {role === null && <Link to="/login">Login</Link>}

        {role === 'HR' && (
          <>
            <Link to="/employees">Employees</Link>
            <Link to="/leaves">Leaves</Link>
            <Link to="/add-employee">Add Employee</Link>
          </>
        )}

        {role === 'EMPLOYEE' && (
          <>
            <Link to="/apply-leave">Apply Leave</Link>
            <Link to="/my-leaves">My Leaves</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}
      </div>

      {(role === 'HR' || role === 'EMPLOYEE') && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
