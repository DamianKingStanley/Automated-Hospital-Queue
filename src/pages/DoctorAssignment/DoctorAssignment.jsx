import React, { useState } from "react";
import axios from "axios";
import "./DoctorAssignment.css";
import DoctorList from "./DoctorList";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

const DoctorAssignment = () => {
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message
  const [loading, setLoading] = useState(false); // State for loader

  const handleAssign = async () => {
    setLoading(true); // Show loader

    try {
      const response = await axios.post(
        `https://hospital-queue.onrender.com/assign-doctor/${patientId}`
      );
      console.log("Doctor Assigned:", response.data);
      setSuccess("Doctor successfully assigned!");
      setError("");
    } catch (error) {
      // Correctly extract and display error message from backend response
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred.";
      setError(errorMessage);
      setSuccess("");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div>
      <Navbar />
      <Navibar />
      <div className="DoctorAssignmentPage">
        {loading && <div className="loader"></div>}
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <div className="DoctorAssignment">
          <h2>Assign Doctor to Patient</h2>
          <input
            type="text"
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
          <button onClick={handleAssign}>Assign Doctor</button>
        </div>
        <DoctorList />
      </div>
    </div>
  );
};

export default DoctorAssignment;
