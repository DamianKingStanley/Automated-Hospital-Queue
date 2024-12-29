import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://hospital-queue.onrender.com"); // Replace with your server URL

const GeneralNotification = ({ eventName, displayMessage }) => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on(eventName, (data) => {
      setNotification(data.message);
    });

    // Cleanup
    return () => {
      socket.off(eventName);
    };
  }, [eventName]);

  return (
    <div className="notification">
      {notification && <p>{displayMessage(notification)}</p>}
    </div>
  );
};

export default GeneralNotification;
