import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        // Load the token and userId from localStorage if available
        const savedToken = localStorage.getItem('token');
        const savedUserId = localStorage.getItem('userId');

        if (savedToken && savedUserId) {
            setToken(savedToken);
            setUserId(savedUserId);
        }
        setLoading(false); // Set loading to false once data is loaded
    }, []);

    const login = (userId, token) => {
        setUserId(userId);
        setToken(token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUserId(null);
        setToken(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ userId, token, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};