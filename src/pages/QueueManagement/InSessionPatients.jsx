import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./InSessionPatients.css";

const socket = io("https://hospital-queue.onrender.com");

const InSessionPatients = () => {
  const [inSessionPatients, setInSessionPatients] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const countdownDuration = 30 * 60 * 1000;

  useEffect(() => {
    const fetchInSessionPatients = async () => {
      try {
        const response = await axios.get(
          "https://hospital-queue.onrender.com/session"
        );
        setInSessionPatients(response.data);
      } catch (error) {
        console.error("Error fetching in-session patients:", error);
      }
    };

    fetchInSessionPatients();

    socket.on("sessionUpdated", (updatedInSession) => {
      setInSessionPatients(updatedInSession);
    });

    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(timer);
      socket.off("sessionUpdated");
    };
  }, []);

  const calculateCountdown = (appointmentStartTime) => {
    if (!appointmentStartTime) return "00:00";

    const startTime = new Date(appointmentStartTime).getTime();
    const elapsedTime = currentTime - startTime;
    const remainingTime = countdownDuration - elapsedTime;

    if (remainingTime <= 0) {
      return "00:00";
    }

    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  // const fetchInSessionPatients = async () => {
  //   try {
  //     const response = await axios.get("https://hospital-queue.onrender.com/session");
  //     setInSessionPatients(response.data);
  //   } catch (error) {
  //     console.error("Error fetching in-session patients:", error);
  //   }
  // };

  // fetchInSessionPatients();

  return (
    <div className="InSessionPatientsPage">
      <h2>Patients in Session</h2>
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            {/* <th>Name</th> */}
            <th>Status</th>
            <th>Doctor</th>
            <th>Specialty</th>
            <th>Ward</th>
            <th>Session Time</th>
          </tr>
        </thead>
        <tbody>
          {inSessionPatients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.patientId}</td>
              {/* <td>{patient.name}</td> */}
              <td>{patient.status}</td>
              {patient.doctorAssigned && (
                <>
                  <td>{patient.doctorAssigned.name}</td>
                  <td>{patient.doctorAssigned.specialty}</td>
                  <td>{patient.doctorAssigned.wardNumber}</td>
                </>
              )}
              <td>
                {patient.status === "in-session"
                  ? calculateCountdown(patient.appointmentStartTime)
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InSessionPatients;
