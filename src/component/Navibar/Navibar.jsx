import React, { useState, useEffect, useRef } from "react";
import "./Navibar.css";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaHandshake,
  FaSignOutAlt,
  FaUserCircle,
  FaPeopleCarry,
  FaStreetView,
  FaUpload,
  FaHospitalUser,
  FaUserNurse,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navibar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavbarToggle = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    toggleMenu();
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("HospitalUserInfo");
      return token !== null && token !== undefined;
    };

    setIsLoggedIn(checkLoginStatus());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("HospitalUserInfo");
    window.location.href = "/";
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem("HospitalUserInfo");

    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
    }
  }, []);

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`} ref={navbarRef}>
      <div className="navbar-brand">
        <Link to="/" smooth={true} duration={500}>
          <h3>DICKSON PETER HOSPITAL</h3>
        </Link>
      </div>

      <button className="navbar-toggle" onClick={handleNavbarToggle}>
        {isOpen ? (
          <FaTimes className="navbar-toggle-icon" />
        ) : (
          <FaBars className="navbar-toggle-icon" />
        )}
      </button>

      <ul className={`navbar-nav ${isOpen ? "open" : ""}`}>
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={toggleMenu}
            to="/"
            smooth={true}
            duration={500}
          >
            <FaHome /> Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={toggleMenu}
            to="/patient-register"
            smooth={true}
            duration={500}
          >
            <FaHandshake /> Register Patient
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={toggleMenu}
            to="/doctor-assignment"
            smooth={true}
            duration={500}
          >
            <FaPeopleCarry /> Assign Patient
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={toggleMenu}
            to="/queue-management"
            smooth={true}
            duration={500}
          >
            <FaStreetView /> View Queue
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={toggleMenu}
            to="/update-patients"
            smooth={true}
            duration={500}
          >
            <FaUpload /> Update Queue
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={toggleMenu}
            to="/add-doctor"
            smooth={true}
            duration={500}
          >
            <FaHospitalUser /> Add Doctors
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={toggleMenu}
            to="/update-doctors"
            smooth={true}
            duration={500}
          >
            <FaUserNurse /> Doctors
          </Link>
        </li>
        <div>
          {isLoggedIn && (
            <div className="user-info">
              <span className="username">
                <FaUserCircle /> {user?.result?.fullname}
              </span>
              <ul className="user-options">
                <li onClick={handleLogout}>
                  <FaSignOutAlt /> Sign Out
                </li>
              </ul>
            </div>
          )}
          {!isLoggedIn && (
            <div>
              <button id="LoginBtn">
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navibar;
