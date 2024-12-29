import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Notification from "../../component/Notification/Notification";
import InSessionPatient from "./InSessionPatients.jsx";
import "./QueueManagement.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

const socket = io("https://hospital-queue.onrender.com");

const QueueManagement = () => {
  const [queue, setQueue] = useState([]);
  const [notification, setNotification] = useState(""); // State for notifications

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get(
          "https://hospital-queue.onrender.com/queue"
        );
        setQueue(response.data);
      } catch (error) {
        console.error("Error fetching queue:", error);
      }
    };

    fetchQueue();

    socket.on("queueUpdated", (updatedQueue) => {
      setQueue(updatedQueue);
    });

    socket.on("notifyPatient", (message) => {
      setNotification(message);
    });

    socket.on("notifyStaff", (message) => {
      setNotification(message);
    });

    return () => {
      socket.off("queueUpdated");
      socket.off("notifyPatient");
      socket.off("notifyStaff");
    };
  }, []);

  const handleNotificationClose = () => {
    setNotification("");
  };

  // const fetchQueue = async () => {
  //   try {
  //     const response = await axios.get("https://hospital-queue.onrender.com/queue");
  //     setQueue(response.data);
  //   } catch (error) {
  //     console.error("Error fetching queue:", error);
  //   }
  // };

  // fetchQueue();

  return (
    <div>
      <Navbar />
      <Navibar />
      <div className="QueueManagementPage">
        <h2>Patient Queue</h2>
        <Notification
          message={notification}
          onClose={handleNotificationClose}
        />
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              {/* <th>Name</th> */}
              <th>Status</th>
              <th>Doctor</th>
              <th>Specialty</th>
              <th>Ward</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((patient, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <InSessionPatient />
        </div>
      </div>
    </div>
  );
};

export default QueueManagement;
