import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null); // Add username state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUserId = localStorage.getItem('userId');
        const savedUsername = localStorage.getItem('username'); // Load username

        if (savedToken && savedUserId) {
            setToken(savedToken);
            setUserId(savedUserId);
            setUsername(savedUsername); // Set username
        }
        setLoading(false);
    }, []);

    const login = (userId, token, username) => {
        setUserId(userId);
        setToken(token);
        setUsername(username); // Set username
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username); // Store username
    };

    const logout = () => {
        setUserId(null);
        setToken(null);
        setUsername(null); // Clear username
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Remove username
    };

    return (
        <UserContext.Provider value={{ userId, token, username, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};
