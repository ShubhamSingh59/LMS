import React, { useState } from "react";
import "./LeaveForm.css";

function LeaveForm({ employee, onSubmit }) {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      employeeId: employee.id,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason
    });
    setFormData({ startDate: "", endDate: "", reason: "" });
  };

  return (
    <form className="leave-form" onSubmit={handleSubmit}>
      <h2>Apply for Leave</h2>

      <div className="form-group">
        <label>Employee</label>
        <input
          type="text"
          value={`${employee.name} (${employee.department})`}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Reason</label>
        <textarea
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />
      </div>

      <button type="submit">Submit Leave Request</button>
    </form>
  );
}

export default LeaveForm;
