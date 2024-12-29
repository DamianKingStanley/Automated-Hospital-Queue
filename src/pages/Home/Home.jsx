import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/hospitalLogo.png";
import "./Home.css";
import { useAuth } from "../../component/AuthContext";
import Logout from "../../component/Logout/Logout";
// import slide1 from "../../assets/slide1.jpg";
// import slide2 from "../../assets/slide2.png";
// import slide3 from "../../assets/slide4.jpg";

const Home = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [backgroundIndex, setBackgroundIndex] = useState(0);

  // const backgroundImages = [slide1, slide2, slide3];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setBackgroundIndex(
  //       (prevIndex) => (prevIndex + 1) % backgroundImages.length
  //     );
  //   }, 3000); // Change image every 5 seconds
  //   return () => clearInterval(interval); // Cleanup on component unmount
  // }, [backgroundImages.length]);

  const handleEnterClick = () => {
    if (!user || !token) {
      navigate("/login");
    } else {
      if (user.role === "patient") {
        navigate("/");
      } else if (user.role === "staff") {
        setShowDialog(true);
      }
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleSearchClick = () => {
    navigate("/patient-register");
  };

  const handleCreateClick = () => {
    navigate("/doctor-assignment");
  };
  const handleCheckActivities = () => {
    navigate("/queue-management");
  };
  const handleAllClick = () => {
    navigate("/add-doctor");
  };
  const handleStatusClick = () => {
    navigate("/update-patients");
  };
  const handleDrClick = () => {
    navigate("/update-doctors");
  };
  const handleAllPatientsClick = () => {
    navigate("/all-patients");
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className="HomeBody"
      // style={{ backgroundImage: `url(${backgroundImages[backgroundIndex]})` }}
    >
      <section className="HomeSection">
        <h1>Hospital Queue Management System</h1>
        <div>
          <img id="logoimage" src={logo} alt="logo" />
        </div>
        <div>
          <button id="enterBtn" onClick={handleEnterClick}>
            Proceed
          </button>
        </div>
      </section>

      {user?.role === "staff" && (
        <>
          <button className="floatingButton" onClick={toggleSidebar}>
            ☰
          </button>
          <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            <h2>Admin</h2>
            <button onClick={handleCheckActivities}>Queue Management</button>
            <button onClick={handleAllClick}>Register Doctors</button>
            <button onClick={handleStatusClick}>Update Patients Status</button>
            <button onClick={handleDrClick}>Doctor Interface</button>
            <button onClick={handleAllPatientsClick}>Patients Schema</button>
            <div>
              <Logout />
            </div>
          </div>
        </>
      )}

      {showDialog && (
        <div className="dialogOverlay">
          <div className="dialogBox">
            <h2>Staff Options</h2>
            <button id="dialogBtn" onClick={handleSearchClick}>
              Register Patients
            </button>
            <button id="dialogBtn" onClick={handleCreateClick}>
              Assign Doctors
            </button>
            <button id="dialogBtnCancel" onClick={handleDialogClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
