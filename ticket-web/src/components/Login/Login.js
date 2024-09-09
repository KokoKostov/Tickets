import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider'; // Uncomment if you have AuthProvider
import { api } from '../../api';

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",  
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", formData);

            const { refreshToken, accessToken } = response.data;
          
            login(refreshToken, accessToken )
            navigate('/');
            
        } catch (error) {
            console.error("Error:", error);
            
          
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An error occurred while logging in. Please try again.");
            }
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className="w-fit max-h-fit bg-gradient-to-r from-red-500 to-pink-800 flex items-center justify-center">
                <div className="flex flex-row justify-center items-center p-4">
                    <form className="flex flex-col justify-center items-center w-[400px] p-8 rounded-lg bg-white opacity-85" onSubmit={handleSubmit}>
                        <h2 className='text-[24px] pb-6'>Login to Your Account</h2>
                        
                     
                        {errorMessage && (
                            <p className='text-red-500 mb-4'>{errorMessage}</p>
                        )}
                        
                        <div className="input-container">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <label htmlFor="username" className="input-label">
                                Username
                            </label>
                            <span className='input-highlight'></span>
                        </div>

                        <div className="input-container">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                            />
                            <label htmlFor="password" className="input-label">
                                Password
                            </label>
                            <span className='input-highlight'></span>
                        </div>

                        <button className='bg-blue-500 text-white py-2 px-4 rounded' type="submit">Login</button>

                        <p className='m-2 text-md'>
                            Don't have an account? Click <NavLink to={'/register'} className='text-blue-700'>here!</NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
