import React, { useState, useEffect } from "react";
import LeaveForm from "../../components/LeaveForm/LeaveForm";
import { useNavigate } from "react-router-dom";

function ApplyLeavePage() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employees/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setEmployee(data);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchEmployee();
  }, [navigate]);

  const handleLeaveSubmit = async (formData) => {
    if (!employee) return;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const joining = new Date(employee.joiningDate);

  
    if (start < joining) {
      alert("You cannot apply for leave before your joining date.");
      return;
    }

 
    if (start > end) {
      alert("Start date must be before or equal to end date.");
      return;
    }

    
    const daysRequested =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
    if (daysRequested > employee.leaveBalance) {
      alert(
        `You only have ${employee.leaveBalance} days of leave left. Cannot apply for ${daysRequested} days.`
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/leaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Leave request submitted successfully!");
        navigate("/");
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to submit leave request.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error while submitting leave request.");
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="apply-leave-page">
      <LeaveForm employee={employee} onSubmit={handleLeaveSubmit} />
    </div>
  );
}

export default ApplyLeavePage;
