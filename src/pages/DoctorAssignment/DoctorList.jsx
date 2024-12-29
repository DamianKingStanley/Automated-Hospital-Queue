import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorList.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(""); // State for error message

  // Fetch doctors from the API on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://hospital-queue.onrender.com/get-doctors"
        );
        setDoctors(response.data);
      } catch (error) {
        setError("Error fetching doctors. Please try again later.");
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="DoctorListPage">
      <h2>Doctor List</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="table-container">
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Ward Number</th>
              <th>Availability</th>
              <th>Current Patients</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>
                  <td>{doctor.wardNumber}</td>
                  <td>{doctor.isAvailable ? "Available" : "Not Available"}</td>
                  <td>{(doctor.currentPatients || []).length}</td>{" "}
                  {/* Use default value */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No doctors available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorList;
