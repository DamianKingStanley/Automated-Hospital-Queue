import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import {
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

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("HospitalUserInfo");
      return token !== null && token !== undefined;
    };

    setIsLoggedIn(checkLoginStatus());
  }, []);

  const login = () => {
    window.location.href = "/login";
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem("HospitalUserInfo");

    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
    }
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("studentData"));
        if (!userData || !userData.result.id) {
          console.error("User ID is undefined");
          return;
        }

        const userId = userData.result.id;

        const response = await fetch(
          `https://hospital-queue.onrender.com/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser({
            ...data,
            profilePicture: data.profilePicture,
          });
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    getUserProfile();
  }, []);

  return (
    <div>
      <section className="navbarsection">
        <div className="nav-lists">
          <Link to="/" smooth={true} duration={500}>
            <h3>DICKSON PETER HOSPITAL</h3>
          </Link>
          <ul>
            <li>
              <Link to="/patient-register" smooth={true} duration={500}>
                <FaHandshake /> Register Patient
              </Link>
            </li>
            <li>
              <Link to="/doctor-assignment" smooth={true} duration={500}>
                <FaPeopleCarry /> Assign Patient
              </Link>
            </li>
            <li>
              <Link to="/queue-management" smooth={true} duration={500}>
                <FaStreetView /> View Queue
              </Link>
            </li>
            <li>
              <Link to="/update-patients" smooth={true} duration={500}>
                <FaUpload /> Update Queue
              </Link>
            </li>
            <li>
              <Link to="/add-doctor" smooth={true} duration={500}>
                <FaHospitalUser /> Add Doctors
              </Link>
            </li>

            <li>
              <Link to="/update-doctors" smooth={true} duration={500}>
                <FaUserNurse /> Doctors
              </Link>
            </li>
          </ul>
        </div>
        <div className="searchdiv">
          <div className="SLU">
            {isLoggedIn && (
              <div className="dropdown">
                <div className="userImage">
                  {user?.profilePicture ? (
                    <img
                      src={user?.profilePicture}
                      alt="Profile"
                      className="profilePictureNav"
                    />
                  ) : (
                    <FaUserCircle className="profileIconNav" />
                  )}
                </div>
              </div>
            )}

            {!isLoggedIn && (
              <button id="loginBtn" onClick={login}>
                LOGIN
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
