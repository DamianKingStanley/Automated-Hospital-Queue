import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorInterface.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

const DoctorInterface = () => {
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

  const handleAvailabilityChange = async (doctorId, isAvailable) => {
    try {
      await axios.patch(
        `https://hospital-queue.onrender.com/update-doctor/${doctorId}`,
        {
          isAvailable,
        }
      );
      // Update the local state to reflect the change
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === doctorId ? { ...doctor, isAvailable } : doctor
        )
      );
    } catch (error) {
      setError("Error updating doctor availability. Please try again later.");
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Navibar />
      <div className="DoctorInterfacePage">
        <h2>Doctor Interface</h2>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Display error message */}
        <div className="table-container">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                {/* <th>Ward Number</th> */}
                <th>Availability</th>
                <th>Actions</th>

                {/* <th>Current Patients</th> */}
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialty}</td>
                    {/* <td>{doctor.wardNumber}</td> */}
                    <td>
                      {doctor.isAvailable ? "Available" : "Not Available"}
                    </td>
                    {/* <td>{doctor.currentPatients.length}</td> */}
                    <td>
                      <button
                        className="set-available"
                        onClick={() =>
                          handleAvailabilityChange(doctor._id, true)
                        }
                        disabled={doctor.isAvailable}
                      >
                        Set Available
                      </button>
                      <button
                        className="set-not-available"
                        onClick={() =>
                          handleAvailabilityChange(doctor._id, false)
                        }
                        disabled={!doctor.isAvailable}
                      >
                        Set Not Available
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No doctors available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorInterface;
