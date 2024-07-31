// src/components/SignUpForm.js
import React, { useState } from 'react';
import { Link ,Navigate} from 'react-router-dom';
import './SignUpForm.css'; // Import the CSS file
import axios from 'axios';
const SignUpForm = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    user_firstname: '',
    user_lastname: '',
    user_email: '',
    user_password: '',
    user_phone: '',
    user_zipcode: '',
    user_city: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /\S+@\S+\.\S+/;
    const phonePattern = /^\d{10}$/;
    const zipcodePattern = /^\d{5}$/;

    if (!formData.user_firstname.trim()) newErrors.user_firstname = 'First name is required';
    if (!formData.user_lastname.trim()) newErrors.user_lastname = 'Last name is required';
    if (!formData.user_email.trim() || !emailPattern.test(formData.user_email)) newErrors.user_email = 'Valid email is required';
    if (!formData.user_password.trim() || formData.user_password.length < 6) newErrors.user_password = 'Password must be at least 6 characters long';
    if (!formData.user_phone.trim() || !phonePattern.test(formData.user_phone)) newErrors.user_phone = 'Phone number must be 10 digits';
    if (!formData.user_zipcode.trim() || !zipcodePattern.test(formData.user_zipcode)) newErrors.user_zipcode = 'Zipcode must be 5 digits';
    if (!formData.user_city.trim()) newErrors.user_city = 'City is required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const requestData = {
      ...formData,
      user_lastname: formData.user_lastname,
    };

    try {
      const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration ', formData);
      if(response.status && response.msg==="Registered Successfully"){
        setIsSignedUp(true); // Set sign-up status to true
      }
      console.log('response',response);
      // Assuming successful sign-up
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  if (isSignedUp) {
    // Redirect after a short delay to show the success message
    setTimeout(() => <Navigate to="/login" />, 2000);
  }
  return (
    <div className="grid-container">
      <div className="form-container">
        <h1 className="signup-header">Sign Up</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <label>
            First Name:
            <input
              type="text"
              name="user_firstname"
              value={formData.user_firstname}
              onChange={handleChange}
              className="form-input"
            />
            {errors.user_firstname && <span className="error-message">{errors.user_firstname}</span>}
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="user_lastname"
              value={formData.user_lastname}
              onChange={handleChange}
              className="form-input"
            />
            {errors.user_lastname && <span className="error-message">{errors.user_lastname}</span>}
          </label>
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
          <label>
            Phone:
            <input
              type="tel"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              className="form-input"
            />
            {errors.user_phone && <span className="error-message">{errors.user_phone}</span>}
          </label>
          <label>
            Zipcode:
            <input
              type="text"
              name="user_zipcode"
              value={formData.user_zipcode}
              onChange={handleChange}
              className="form-input"
            />
            {errors.user_zipcode && <span className="error-message">{errors.user_zipcode}</span>}
          </label>
          <label>
            City:
            <input
              type="text"
              name="user_city"
              value={formData.user_city}
              onChange={handleChange}
              className="form-input"
            />
            {errors.user_city && <span className="error-message">{errors.user_city}</span>}
          </label>
          <button type="submit" className="submit-button">Sign Up</button>
          <p className="link-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
      <div className="image-container">
        {/* This will display the background image */}
      </div>
    </div>
  );
};

export default SignUpForm;
