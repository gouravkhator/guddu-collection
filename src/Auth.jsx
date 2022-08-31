import React, { useState, useEffect, useContext } from "react";
import app, { auth } from "./firebase_api";
import firebase from "firebase";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const [currentUser, setCurrentUser] = useState(null);

  // by default it is set to loading: true, so that we can fetch user details from token
  const [loading, setLoading] = useState(true);

  async function signup(email, password, displayName) {
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      if (user) {
        await user.user.updateProfile({
          displayName,
        });
      }
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          throw new Error("Email already exists. Please login to continue.");

        case "auth/weak-password":
          throw new Error("The password is too weak..");

        default:
          throw new Error("Failed to create account.. Please try again later.");
      }
    }
  }

  async function login(email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async function logout() {
    return await auth.signOut();
  }

  async function deleteAccount() {
    return await currentUser.delete();
  }

  async function resetPassword(email) {
    return await auth.sendPasswordResetEmail(email);
  }

  async function googleSignIn() {
    await app.auth().signInWithPopup(googleProvider);

    // get the user from result on using this googleSignIn
    return await firebase.auth().getRedirectResult();
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log("Google signin unsuccessful");
    }
  };

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);

      // set user before so that user is set before any operation is performed
      setLoading(false); // now it should stop loading, as we set the user successfully
    });

    return unsubscribe; // this will unsubscribe from this authentication when we unmount
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    deleteAccount,
    resetPassword,
    googleSignIn,
    handleGoogleSignIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
