import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://hospital-queue.onrender.com"); // Replace with your server URL

const PatientNotification = () => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on("notifyPatient", (data) => {
      setNotification(data.message);
    });

    // Cleanup
    return () => {
      socket.off("notifyPatient");
    };
  }, []);

  return (
    <div className="notification">{notification && <p>{notification}</p>}</div>
  );
};

export default PatientNotification;
