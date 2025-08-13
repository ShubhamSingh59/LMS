import React, { useEffect, useState } from 'react';
import LeaveList from '../../components/LeaveList/LeaveList';

function MyLeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(0);

  useEffect(() => {
    const fetchMyLeaves = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/leaves/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch leaves');
        }

        const data = await res.json();
        setLeaves(data.leaves);
        setLeaveBalance(data.employee.leaveBalance);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyLeaves();
  }, []);

  return (
    <div className="page-container">
      <LeaveList leaves={leaves} leaveBalance={leaveBalance} />
    </div>
  );
}

export default MyLeavesPage;
