import React, { createContext, useContext, useState } from 'react';

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

    const logout = () => {
        setToken(null);
        setRefreshToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
