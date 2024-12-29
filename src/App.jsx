import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./component/AuthContext";
// import PrivateRoute from "./component/PrivateRoute";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import SignIn from "./pages/SignIn/SignIn";
import PatientRegistration from "./pages/PatientRegistration/PatientRegistration";
import DoctorAssignment from "./pages/DoctorAssignment/DoctorAssignment";
import QueueManagement from "./pages/QueueManagement/QueueManagement";
// import SearchRecord from "./pages/SearchRecord/SearchRecord";
import AddDoctor from "./pages/AddDoctor/AddDoctor";
import PatientManagement from "./pages/PatientManagement/PatientManagement";
import DoctorInterface from "./pages/DoctorInterface/DoctorInterface";
import PatientSchema from "./pages/PatientSchema/PatientSchema";
import NotificationsPage from "./component/Notification/NotificationsPage ";

const AppContent = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<SignIn />} />
          <Route path="/patient-register" element={<PatientRegistration />} />
          <Route path="/doctor-assignment" element={<DoctorAssignment />} />
          <Route path="/queue-management" element={<QueueManagement />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/update-patients" element={<PatientManagement />} />
          <Route path="/update-doctors" element={<DoctorInterface />} />
          <Route path="/all-patients" element={<PatientSchema />} />
          <Route path="/all-notification" element={<NotificationsPage />} />

          {/* <Route
            path="/search"
            element={
              <PrivateRoute
                element={SearchRecord}
                roles={["admin", "officer"]}
              />
            }
          /> */}
          {/* <Route
            path="/advance-search"
            element={
              <PrivateRoute
                element={AdvancedSearch}
                roles={["admin", "officer"]}
              />
            }
          />
          <Route
            path="/all-records"
            element={<PrivateRoute element={AllRecords} roles={["admin"]} />}
          />
          <Route
            path="/records/:id"
            element={
              <PrivateRoute
                element={RecordDetail}
                roles={["admin", "officer"]}
              />
            }
          />
          <Route
            path="/create"
            element={<PrivateRoute element={RecordForm} role={["admin"]} />}
          />
          <Route
            path="/update/:id"
            element={<PrivateRoute element={UpdateRecord} roles={["admin"]} />}
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const App = () => <AppContent />;

export default App;
