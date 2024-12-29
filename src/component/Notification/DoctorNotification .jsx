import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://hospital-queue.onrender.com"); // Replace with your server URL

const DoctorNotification = () => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on("notifyDoctor", (data) => {
      setNotification(data.message);
    });

    // Cleanup
    return () => {
      socket.off("notifyDoctor");
    };
  }, []);

  return (
    <div className="notification">{notification && <p>{notification}</p>}</div>
  );
};

export default DoctorNotification;
