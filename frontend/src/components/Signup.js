import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../signup.css';  // Import the CSS file

// Define the base URL for the API
const API_URL = 'http://localhost:7001/api';

export default function Signup() {
  // Initialize form data state
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  // Initialize form errors state
  const [formErrors, setFormErrors] = useState({ name: '', email: '', password: '' });  
  // Hook for navigation
  const navigate = useNavigate();  

  const handleChange = (e) => {
    // Update form data state when input values change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = { name: '', email: '', password: '' };
    let isValid = true;
    // Validate name length
    if (formData.name.trim().length < 5) {
      errors.name = 'Name must be at least 5 characters';
      isValid = false;
    }
    // Validate email presence
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    }
    // Validate password presence
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }
    // Set form errors state
    setFormErrors(errors);
    // Return validation status
    return isValid;
  };

  const handleSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Validate form
    if (validateForm()) {
      try {
        // Send POST request to signup API
        const response = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Send form data as JSON
          body: JSON.stringify(formData),
        });

        // Check if the status code is 201
        if (response.status === 201) {
          // Parse response JSON
          const data = await response.json();
          if (data.message === 'Signup data successfully') {
            // Handle successful signup
            window.alert('Signup successful');
            console.log('Signup successful', data);
            // Navigate to login page
            navigate('/login');
          } else {
            // Handle unexpected successful signup response
            window.alert('Signup successful but received unexpected response');
            console.log('Signup unexpected response:', data);
          }
        } else if (response.status === 400) {
          // Handle email already exists error
          window.alert('Email already exists');
        } else {
          // Handle other failure cases
          const data = await response.json();
          window.alert('Signup failed');
          console.log('Signup failed:', data);
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <form id="signup-form" method="post" className="signup-form" onSubmit={handleSubmit}>
          <h2 id="title" className="mb-4 text-center">Sign up</h2>

          <div className="mb-3">
            <input
              id="namefield"
              type="text"
              className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
              placeholder="Username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="username"
            />
            <small className="text-danger" id="name-validation">{formErrors.name}</small>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <small className="text-danger" id="uname-validation">{formErrors.email}</small>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <small className="text-danger" id="pass-validation">{formErrors.password}</small>
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
            <button type="submit" id="signup-btn" className="btn btn-primary">
              Sign up
            </button>
            
            <Link to="/login" className="custom-link-class" aria-label="Already have an account?">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
