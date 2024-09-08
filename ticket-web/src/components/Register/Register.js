import React, { useState } from 'react';
// import { useAuth } from '../../providers/AuthProvider'; 
import { NavLink, useNavigate } from 'react-router-dom';
import {api} from '../../api'
const Register = () => {
    // const { setToken } = useAuth(); 
    const [formData, setFormData] = useState({
        username: "",
        password: "",  
        email: "",
        confPassword: "", 
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confPassword) {
            alert("Passwords do not match");
            return;
        }
       
        try {
            const response = await api.post("http://localhost:5000/api/users", formData)
            console.log(response);
            
            if (response.status === 201) {
                const data = response.data 
                console.log(data);
                
               
              
                localStorage.setItem('refreshToken', data.refreshToken); 
                localStorage.setItem('accessToken', data.accessToken)
               
               navigate('/')
               

            } else {
                alert("Failed to register account.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while registering the account.");
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>

<div className="w-fit max-h-fit bg-gradient-to-r from-red-500 to-pink-800 flex items-center justify-center">
        <div className="flex flex-row justify-center items-center p-4">
            <form className="flex flex-col justify-center items-center w-[400px] p-8 rounder-l bg-white opacity-85" onSubmit={handleSubmit}>
                <h2 className='text-[24px] pb-6 '>Create a new account</h2>

            
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

                
                <div className="input-container">
                    
                    <input
                        type="password"
                        id="confPassword"
                        name="confPassword"
                        placeholder="Confirm Password"
                        value={formData.confPassword}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <label htmlFor="confPassword" className="input-label">
                        Confirm Password
                        </label>
                        <span className='input-highlight'></span>
                </div>

                <div className="input-container">
                   
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                    />
                <label htmlFor="email" className="input-label">Email</label>
                <span className='input-highlight'></span>
                </div>

                <button type="submit">Register</button>
                <p className='m-2 text-md'>If you already have an account click <NavLink to={'/login'} className='text-blue-700'>here!</NavLink></p>
            </form>
        </div>
        </div>
        </div>
    );
};

export default Register;
