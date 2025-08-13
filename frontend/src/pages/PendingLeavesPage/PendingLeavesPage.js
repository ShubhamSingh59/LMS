import React, { useEffect, useState } from 'react';
import LeaveListHR from '../../components/LeaveListHR/LeaveListHR';

const PendingLeavesPage = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = () => {
    fetch("http://localhost:5000/api/leaves/pending", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => setLeaves(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusChange = (leaveId, newStatus) => {
    fetch(`http://localhost:5000/api/leaves/${leaveId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(() => fetchLeaves())
      .catch(err => console.error(err));
  };

  return <LeaveListHR leaves={leaves} onStatusChange={handleStatusChange} />;
};

export default PendingLeavesPage;
