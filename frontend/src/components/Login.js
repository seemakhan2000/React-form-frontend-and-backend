
import '../login.css';
// Importing necessary hooks from React
import React, { useState, useEffect, useCallback } from 'react';
// Importing Link and useNavigate from react-router-dom for navigation
import { Link, useNavigate } from 'react-router-dom';
// Defining the API URL
const API_URL = 'http://localhost:7001/api';

export default function Login() {
  //// useState hook to manage form data
  const [formData, setFormData] = useState({ email: '', password: '' });
  // useNavigate hook for navigation
  const navigate = useNavigate();

  const loginSubmission = useCallback(async (event) => {
    event.preventDefault();
    const email = formData.email.trim();
    // Prepares login data
    const password = formData.password;

    const loginData = {
      email: email,
      password: password,
    };

    try {
      // Sends a POST request to the login API
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      //If a token is returned
      if (data.token) {
        console.log("Token:", data.token);
        window.alert("Login successful");
        // Navigates to the form page
        navigate('/form');
      } else {
        window.alert("Login failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert("User not found");
      } else {
        console.error("Server side error: ", error);
      }
    }
  }, [formData, navigate]);

  useEffect(() => {
    // Selects the login button
    const loginBtn = document.querySelector("#login-btn");

    if (loginBtn) {
      // Adds a click event listener to the login button
      loginBtn.addEventListener("click", loginSubmission);
    }

    return () => {
      if (loginBtn) {
        //Removes the event listener when the component unmounts
        loginBtn.removeEventListener("click", loginSubmission);
      }
    };
  }, [loginSubmission]);

  const handleChange = (e) => {
    // Updates form data state when input values change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='login-form'>
      <div className="row justify-content-center ">
        <div className="col-md-6 col-lg-4">
          <form id="login-form" method="post" className="login-form" onSubmit={loginSubmission}>
            <h2 id="title" className="mb-4 text ">Login</h2>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <small className="text-danger" id="uname-validation"></small>
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <small className="text-danger" id="pass-validation"></small>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked
                name="remember"
                id="remember"
              />
              <label className="form-check-label" htmlFor="remember">Remember me</label>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" id="login-btn" className="btn btn-secondary">
                Log in
              </button>
              
              <Link to="/signup"  className='anchar' aria-label="Already have an account?">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
