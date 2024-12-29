import React, { useState } from "react";
import "./Logout.css";

const Logout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("HospitalUserInfo");

  const handleLogout = () => {
    localStorage.removeItem("HospitalUserInfo");
    localStorage.clear();
    window.location.href = "/";
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="LogoutComponent">
      <button onClick={openModal}>Logout</button>
      {isModalOpen && (
        <div className="Logout-modal-overlay">
          <div className="logout-modal">
            <h4>You sure you want to log out?</h4>
            <div className="modal-buttons">
              <button onClick={handleLogout}>Yes, log out</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
