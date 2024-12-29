import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./PatientManagement.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

const socket = io("https://hospital-queue.onrender.com");

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "https://hospital-queue.onrender.com/patients"
        );
        const keys = Object.keys(response.data);
        if (keys.length > 0) {
          const patientsArray = response.data[keys[0]]; // Access the first key's array
          if (Array.isArray(patientsArray)) {
            setPatients(patientsArray);
          } else {
            console.error("Expected an array but got:", patientsArray);
            setPatients([]);
          }
        } else {
          console.error("No data found");
          setPatients([]);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();

    socket.on("queueUpdated", (updatedQueue) => {
      setPatients(updatedQueue);
    });

    return () => {
      socket.off("queueUpdated");
    };
  }, []);

  const updateStatus = async (patientId, status) => {
    setLoading(true); // Start loading
    try {
      let url = "";
      switch (status) {
        case "waiting":
          url = `https://hospital-queue.onrender.com/wait/${patientId}`;
          break;
        case "in-session":
          url = `https://hospital-queue.onrender.com/start-session/${patientId}`;
          break;
        case "done":
          url = `https://hospital-queue.onrender.com/complete-session/${patientId}`;
          break;
        default:
          console.error("Unsupported status:", status);
          setLoading(false); // Stop loading
          return;
      }

      const response = await axios.post(url, { status });
      // console.log("Status update response:", response.data);
      await fetchPatients();
    } catch (error) {
      console.error("Error updating patient status:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "https://hospital-queue.onrender.com/patients"
      );
      const keys = Object.keys(response.data);
      if (keys.length > 0) {
        const patientsArray = response.data[keys[0]]; // Access the first key's array
        if (Array.isArray(patientsArray)) {
          setPatients(patientsArray);
        } else {
          console.error("Expected an array but got:", patientsArray);
          setPatients([]);
        }
      } else {
        console.error("No data found");
        setPatients([]);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Navibar />
      <div className="PatientManagementPage">
        <h2>Patient Management</h2>
        {loading && <p className="loader"></p>} {/* Loader */}
        <ul>
          {patients.map((patient, index) => (
            <li key={index}>
              {patient.patientId} - {patient?.name} ({patient?.status})<br />
              <strong>Doctor:</strong> {patient?.doctorAssigned?.name},{" "}
              <strong>Ward:</strong> {patient?.doctorAssigned?.wardNumber}
              <br />
              <button
                onClick={() => updateStatus(patient.patientId, "waiting")}
                disabled={patient.status === "waiting" || loading} // Disable if already waiting
              >
                Set as Waiting
              </button>
              <button
                onClick={() => updateStatus(patient.patientId, "in-session")}
                disabled={patient.status === "in-session" || loading} // Disable if already in-session
              >
                Set as In-Session
              </button>
              <button
                onClick={() => updateStatus(patient.patientId, "done")}
                disabled={patient.status === "done" || loading} // Disable if already done
              >
                Set as Done
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientManagement;
