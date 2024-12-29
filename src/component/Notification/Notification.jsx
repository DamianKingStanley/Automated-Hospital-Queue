import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Notification.css";

const socket = io("https://hospital-queue.onrender.com");

const Notification = () => {
  const [notification, setNotification] = useState("");
  useEffect(() => {
    socket.on("notifyPatient", (data) => {
      setNotification(data.message);
      setTimeout(() => setNotification(""), 15000); // Clear notification after 5 seconds
    });

    socket.on("notifyStaff", (data) => {
      setNotification(data.message);
      setTimeout(() => setNotification(""), 15000); // Clear notification after 5 seconds
    });

    return () => {
      socket.off("notifyPatient");
      socket.off("notifyStaff");
    };
  }, []);

  // useEffect(() => {
  //   socket.on("notifyPatient", (data) => {
  //     setNotifications((prev) => [...prev, data.message]);
  //   });

  //   socket.on("notifyStaff", (data) => {
  //     setNotifications((prev) => [...prev, data.message]);
  //   });

  //   return () => {
  //     socket.off("notifyPatient");
  //     socket.off("notifyStaff");
  //   };
  // }, []);

  return (
    <div className="notification-container">
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default Notification;
