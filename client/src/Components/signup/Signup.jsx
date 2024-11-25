import React, { useState } from 'react';
import '../signup/Signup.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];
    const passwordChecking = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (password.length < 8) {
      errors.push('Password should be 8 characters or more.');
    }
    if (!passwordChecking.test(password)) {
      errors.push('Password must have uppercase, lowercase, and a symbol.');
    }
    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  };

  const handleAddUser = async () => {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      Swal.fire({
        icon: 'error',
        title: '<span class="swal-title-error">Weak Password</span>',
        text: passwordValidation.errors.join(' '),
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        confirmButtonText: 'Got it!',
        customClass: {
          title: 'swal-title-error',
          content: 'swal-content',
          confirmButton: 'login-custom-button',
        }
      });
      return;
    }
  
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        birthMonth,
        birthDay,
        birthYear,
      };
  
      const response = await axios.post(
        'http://localhost:3000/user/signup',
        userData,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      Swal.fire({
        icon: 'success',
        title: '<span class="swal-title-success">Account Created</span>',
        text: 'You have successfully signed up. Please log in.',
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        confirmButtonText: 'Got it!',
        customClass: {
          title: 'swal-title-success',
          content: 'swal-content',
          confirmButton: 'succes-custom-button',
        }
      });
  
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.errors) {
          Swal.fire({
            icon: 'error',
            title: '<span class="swal-title-error">Validation Error</span>',
            text: errorData.errors.join(', '),
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            confirmButtonText: 'Got it!',
            customClass: {
              title: 'swal-title-error',
              content: 'swal-content',
              confirmButton: 'login-custom-button',
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '<span class="swal-title-error">Signup Failed</span>',
            text: errorData.message || 'An error occurred during signup. Please try again later.',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            confirmButtonText: 'Got it!',
            customClass: {
              title: 'swal-title-error',
              content: 'swal-content',
              confirmButton: 'login-custom-button',
            }
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: '<span class="swal-title-error">Signup Failed</span>',
          text: 'An error occurred during signup. Please try again later.',
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          confirmButtonText: 'Got it!',
          customClass: {
            title: 'swal-title-error',
            content: 'swal-content',
            confirmButton: 'login-custom-button',
          }
        });
      }
    }
  };
  
  return (
    <div className="signup-container">
      <div className="signup-image-container">
        <img
          src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732056264/hnmnjb0lmjvlvzgygkku.webp"
          alt="Illustration of a person with crossed arms"
          className="signup-image"
        />
        <h4 className="gretting">Begin your meta fashion journey here </h4>
      </div>

      <form className="signup-form">
        <h3 className="signupMessage" style={{"marginBottom":"0"}}>Sign Up</h3>
        <div className="signup-link">
          <p>
            Already a Member?{' '}
            <a className="login-link-text" style={{"cursor":"pointer"}} onClick={() => navigate('/')}>
              Login
            </a>
          </p>
        </div>

        <div>
          <input
            type="email"
            className="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            autoComplete="off"
          />
        </div>

        <div className="name-container">
          <div className="name-input">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              autoComplete="off"
            />
          </div>
          <div className="name-input">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="password-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off"
          />
          <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="passwordSwitch"
          />
        </div>

        <div className="personal-info">
          <p>Date of Birth</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <select
              required
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
            >
              <option value="" disabled selected>
                Month
              </option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <input
              type="number"
              placeholder="Day"
              required
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
            />

            <input
              type="number"
              placeholder="Year"
              required
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            />
          </div>
        </div>

        <button className="signup-button" type="button" onClick={handleAddUser}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;