import React, { useState, useEffect, useContext } from 'react';
import app, { auth } from './firebase_api';
import firebase from 'firebase';

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //by default it is loading to fetch user details from token

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    async function googleSignIn() {
        await app.auth().signInWithRedirect(googleProvider);
        return firebase.auth().getRedirectResult(); //get the user from result on using this googleSignIn
    }

    useEffect(() => {
        const unsubscribe = app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            //set user before so that user is set before any operation is performed
            setLoading(false); //now it should stop loading as it got the user
        });

        return unsubscribe; //this will unsubscribe from this authentication when we unmount
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        googleSignIn
    }

    return (
        <AuthContext.Provider
            value={value}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}