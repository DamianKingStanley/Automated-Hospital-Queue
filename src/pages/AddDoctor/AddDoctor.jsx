import React, { useState } from "react";
import axios from "axios";
import "./AddDoctor.css";
import Navbar from "../../component/Navbar/Navbar";
import Navibar from "../../component/Navibar/Navibar";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const specialties = [
    "General Practitioner",
    "Cardiology",
    "Dermatology",
    "Gynecology/Obstetrics (OB-GYN)",
    "Orthopedics",
    "Psychiatry",
    "Neurology",
    "Gastroenterology",
    "Pulmonology",
    "Endocrinology",
    "Urology",
    "Oncology",
    "Ophthalmology",
    "Otolaryngology (ENT)",
    "Rheumatology",
    "Nephrology",
    "Infectious Disease",
    "Emergency Medicine",
    "Surgery (General Surgery)",
    "Pediatrics",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "https://hospital-queue.onrender.com/doctor/register",
        {
          name,
          specialty,
          wardNumber,
        }
      );
      console.log("Doctor created successfully:", response.data);
      setSuccess("Doctor added successfully!");
      setName("");
      setSpecialty("");
      setWardNumber("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Navibar />
      <div className="AddDoctorPage">
        <div className="AddDoctor">
          <form onSubmit={handleSubmit}>
            <h2>Add Doctor</h2>
            {loading && <div className="loader"></div>}
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Doctor's Name"
                required
              />
            </div>
            <div>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
              >
                <option value="">Select Specialty</option>
                {specialties.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                value={wardNumber}
                onChange={(e) => setWardNumber(e.target.value)}
                placeholder="Enter Doctor's Ward Number"
                required
              />
            </div>
            <button type="submit">Add Doctor</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
