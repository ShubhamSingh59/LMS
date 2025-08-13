import React from 'react';
import './LeaveList.css';

function LeaveList({ leaves, leaveBalance }) {
  if (!leaves || leaves.length === 0) {
    return <p className="no-leaves">No leaves found</p>;
  }

  return (
    <div className="leave-list">
      <h2>My Leaves</h2>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.reason}</td>
              <td className={`status-${leave.status.toLowerCase()}`}>
                {leave.status}
              </td>
              <td>{leave.leaveDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="leave-balance">
        Remaining Leave Balance: <strong>{leaveBalance}</strong>
      </div>
    </div>
  );
}

export default LeaveList;
