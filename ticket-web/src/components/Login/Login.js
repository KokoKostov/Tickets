import React, { useState } from 'react';
// import { useAuth } from '../../providers/AuthProvider'; 
import { NavLink, useNavigate } from 'react-router-dom';
import {api} from '../../api'

const Login = () => {
     
    const [formData, setFormData] = useState({
        username: "",
        password: "",  
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await api.post("/login", formData) 

            const {refreshToken,accessToken}= response.data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            navigate('/')
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while login in the account.");
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

              

                <button className='' type="submit">Login</button>

                <p className='m-2 text-md'>If you dont have an account click <NavLink to={'/register'} className='text-blue-700'>here!</NavLink></p>
            </form>
            
        </div>
      
        </div>
        </div>
    );
};

export default Login;
