import React, { createContext, useContext, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase Authentication methods
import { auth } from '../firebase-config'; // Import Firebase auth instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle sign-in
  const signIn = () => {
    setUser(true);
  };

  // Function to handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user using Firebase Authentication
      setUser(null); // Update user state after successful sign-out
    } catch (error) {
      console.error('Sign-out error:', error.message);
      // Handle sign-out error if needed
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
