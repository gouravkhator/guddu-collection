import React, { useState, useEffect } from 'react';
import app from './firebase_api';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider
            value={{ currentUser: currentUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}