import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
const AuthContext = createContext(undefined);

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));
    const [user,setUser] = useState()
   
     
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/me');          
                setUser(response.data);
                console.log(user);
                
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        fetchUserData();
    }, []);
    useEffect(() => {
        if (token) {
            localStorage.setItem('accessToken', token);
        } else {
            localStorage.removeItem('accessToken');
        }

        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        } else {
            localStorage.removeItem('refreshToken');
        }
    }, [token, refreshToken]);

   
    const login = (accessToken, refreshToken) => {
        
        
        setToken(accessToken);
        setRefreshToken(refreshToken);
    };

  
    const logout = () => {
        setToken(null);
        setRefreshToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    return (
        <AuthContext.Provider value={{ token, setToken, refreshToken, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};
