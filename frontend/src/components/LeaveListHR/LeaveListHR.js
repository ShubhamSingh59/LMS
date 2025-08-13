import React from 'react';
import './LeaveListHR.css';

function LeaveListHR({ leaves, onStatusChange }) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

  if (leaves.length === 0) {
    return <p>No pending leave requests.</p>;
  }

  return (
    <div className="leave-list-hr">
      <h2>Pending Leave Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Remaining Balance</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave.id}>
              <td>{leave.employee.name}</td>
              <td>{leave.employee.department}</td>
              <td>{leave.employee.leaveBalance}</td>
              <td>{formatDate(leave.startDate)}</td>
              <td>{formatDate(leave.endDate)}</td>
              <td>{leave.reason}</td>
              <td className={`status-${leave.status.toLowerCase()}`}>{leave.status}</td>
              <td>
                {leave.status === 'PENDING' && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() => onStatusChange(leave.id, 'APPROVED')}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => onStatusChange(leave.id, 'REJECTED')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveListHR;
