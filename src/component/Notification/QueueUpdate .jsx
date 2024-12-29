import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://hospital-queue.onrender.com"); // Replace with your server URL

const QueueUpdate = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    socket.on("queueUpdated", (updatedQueue) => {
      setQueue(updatedQueue);
    });

    // Cleanup
    return () => {
      socket.off("queueUpdated");
    };
  }, []);

  return (
    <div className="queue">
      <h3>Current Queue</h3>
      <ul>
        {queue.map((patient) => (
          <li key={patient._id}>
            {patient.name} - Status: {patient.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueUpdate;
