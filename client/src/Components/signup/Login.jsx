import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Swal from 'sweetalert2';

import '../signup/Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailStep, setIsEmailStep] = useState(true); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (isEmailStep) {
            setIsEmailStep(false);
        } else {
            try {
                const response = await axios.post("http://localhost:3000/user/login", {
                    email,
                    password
                });

                if (response.status === 200) {
                    const { token, user } = response.data;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem('userAvatar', response.data.user.avatar);

                    navigate("/home");
                    window.location.reload();
                    setError("");
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.data.message === "Invalid credentials") {
                    setError("Incorrect password. Please try again.");
                } else {
                    setError("An error occurred during login. Please try again later.");
                }
            }
        }
    };

    const handleSocialLogin = (platform) => {
        Swal.fire({
            icon: 'info',
            title: 'Stay Tuned!',
            text: `${platform} login will be available soon. We're working on it!`,
            background: 'rgba(255, 255, 255, 0.12)', 
            color: 'white',
            confirmButtonText: 'Got it!',
            customClass: {
                title: 'swal-title',
                content: 'swal-content',
                confirmButton: 'custom-button',
            }
        });
    };
    

    return (
        <div className="login-container">
            <div className="login-image-container">
                <img
                    src="https://res.cloudinary.com/dc9siq9ry/image/upload/v1732056264/hnmnjb0lmjvlvzgygkku.webp"
                    alt="Login illustration"
                    className="login-image"
                />
                <h4 className="Logingretting" style={{"marginRight":"160px"}}>Explore the world of meta fashion </h4>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
                <h3 className="loginMessage" style={{"marginBottom":"0px" ,"position":"relative" , "right":"20px"}}>Login</h3>
                <div className="login-link">
                    <p>
                        New User?{' '}
                        <a className="login-link-text" style={{"cursor":"pointer"}} onClick={() => navigate("/user/signup")}>
                            Create an account
                        </a>
                    </p>
                </div>

                {isEmailStep ? (
                    <div>
                        <input
                            type="email"
                            className="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            autoComplete='off'
                        />
                    </div>
                ) : (
                    <div className="password-container">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            autoComplete='off'
                        />
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}

                <button type="submit" className="login-button">
                    {isEmailStep ? 'Continue' : 'Login'}
                </button>

                <div className="or-container">
                    <p style={{"marginBottom" : "-2px"}}>Or</p>
                </div>

                <div className="social-buttons">
                    <button
                        className="social-button google-button"
                        onClick={() => handleSocialLogin('Google')}
                    >
                        <FaGoogle style={{ marginRight: '10px', fontSize: '24px' }} /> Continue with Google
                    </button>
                    <button
                        className="social-button facebook-button"
                        onClick={() => handleSocialLogin('Facebook')}
                    >
                        <FaFacebook style={{ marginRight: '10px', fontSize: '24px' }} /> Continue with Facebook
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
