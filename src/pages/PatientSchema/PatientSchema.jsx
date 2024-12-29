import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientSchema.css";

const PatientSchema = () => {
  const [patients, setPatients] = useState({});
  const [error, setError] = useState(""); // State for error message

  // Fetch patients from the API on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "https://hospital-queue.onrender.com/patients"
        );
        setPatients(response.data);
      } catch (error) {
        setError("Error fetching patients. Please try again later.");
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="PatientSchemaPage">
      <h2>Patient List</h2>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Display error message */}
      <div className="table-container">
        {Object.keys(patients).length === 0 ? (
          <p>No patients available.</p>
        ) : (
          Object.keys(patients).map((date) => (
            <div key={date} className="date-group">
              <h3>{new Date(date).toDateString()}</h3> {/* Display the date */}
              <table className="patient-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Patient ID</th>
                    <th>Reason for Visit</th>
                    <th>Doctor Assigned</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patients[date].map((patient) => (
                    <tr key={patient._id}>
                      <td>{patient.name}</td>
                      <td>{patient.patientId}</td>
                      <td>{patient.reasonForVisit}</td>
                      <td>
                        {patient.doctorAssigned
                          ? patient.doctorAssigned.name
                          : "None"}
                      </td>
                      <td>{patient.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientSchema;
