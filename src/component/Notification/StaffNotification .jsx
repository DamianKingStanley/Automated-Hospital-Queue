import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://hospital-queue.onrender.com"); // Replace with your server URL

const StaffNotification = () => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on("notifyStaff", (data) => {
      setNotification(data.message);
    });

    // Cleanup
    return () => {
      socket.off("notifyStaff");
    };
  }, []);

  return (
    <div className="notification">{notification && <p>{notification}</p>}</div>
  );
};

export default StaffNotification;
