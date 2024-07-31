// src/components/LogInForm.js
import React, { useState } from 'react';
import './SignUpForm.css'; // Import the CSS file
import { Link ,Navigate,useNavigate} from 'react-router-dom';
import axios from 'axios';



const LogInForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /\S+@\S+\.\S+/;

    if (!formData.user_email.trim() || !emailPattern.test(formData.user_email)) newErrors.user_email = 'Valid email is required';
    if (!formData.user_password.trim() || formData.user_password.length < 6) newErrors.user_password = 'Password must be at least 6 characters long';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggedIn(true); // Set login status to true

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', formData);
      // Assuming successful login
      localStorage.setItem('user', JSON.stringify(response.data));
  navigate('/dashboard')
      //setSuccessMessage('Login successful! Redirecting to Dashboard...');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setErrors({ apiError: 'An error occurred during login. Please try again.' });
    }
  };

  if (isLoggedIn) {
    // Redirect after a short delay to show the success message
  <Navigate to="/dashboard" />
  }


  return (
    <div className="grid-container">
      <div className="form-container">
        <h1 className="signup-header">Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            Email:
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              className="form-input"
            />
            {errors.user_email && <span className="error-message">{errors.user_email}</span>}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="user_password"
              value={formData.user_password}
              onChange={handleChange}
              className="form-input"
            />
            {errors.user_password && <span className="error-message">{errors.user_password}</span>}
          </label>
         
       
          <button type="submit" className="submit-button">Login</button>
          <p className="link-text">
            Dont have an account? <Link to="/signup">Register here</Link>
          </p>
        </form>
      </div>
      <div className="image-container">
        {/* This will display the background image */}
      </div>
    </div>
  );
};

export default LogInForm;
