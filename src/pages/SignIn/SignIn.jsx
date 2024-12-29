import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import logo from "../../assets/hospitalLogo.png";

const SignIn = () => {
  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [role, setRole] = useState("");
  const [secretKey, setSecretKey] = useState(""); // For secret key
  const [showPassword, setShowPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [loading, setLoading] = useState(false); // For loading state

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const submitForm = async () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setLoading(true);
    setRegisterMessage(""); // Clear previous messages

    try {
      const response = await fetch(
        "https://hospital-queue.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            email,
            role,
            password,
            secretKey: role === "staff" ? secretKey : undefined,
          }),
        }
      );

      if (response.ok) {
        setRegisterMessage("Registered successfully");
        navigate("/login");
      } else {
        const errorResponseData = await response.json();
        setRegisterMessage(
          errorResponseData.message || "Registration failed. Try again later."
        );
      }
    } catch (error) {
      setRegisterMessage("Registration failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SignInbody">
      <div className="Hospitallogodiv">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <section className="register">
        {registerMessage && (
          <div
            className={
              registerMessage.includes("success")
                ? "success-message"
                : "error-message"
            }
          >
            {registerMessage}
          </div>
        )}
        {loading && <div className="loader"></div>}
        <div id="registerform">
          <input
            type="text"
            name="fullname"
            placeholder="Enter your full name"
            required
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {!passwordMatch && <p>Passwords do not match. Please try again.</p>}
          <div className="pswd-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
            />
            <span
              className="pswd-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="pswd-container">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleConfirmPasswordChange}
            />
            <span
              className="pswd-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <label>
            Role: <br />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="staff">Staff</option>
              <option value=""></option>
            </select>
          </label>
          {role === "staff" && (
            <div>
              <input
                type="text"
                name="secretKey"
                id="secretKey"
                placeholder="Enter staff secret key"
                required
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          )}
          <button onClick={submitForm} id="submitbtn" disabled={loading}>
            Register
          </button>
          <p>
            Already have an account? <Link to="/logIn">Log in</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
