import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Import the AuthContext
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';

const Login = () => {
  const { signIn } = useAuth(); // Access the signIn function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State variable for error message

  const handleSignIn = async () => {
    try {
      const auth = getAuth();
      // Set persistence to session
      await setPersistence(auth, browserSessionPersistence);
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Call the signIn function to set the user's authentication status
      signIn();
    } catch (error) {
      // Handle sign-in error
      console.error('Sign-in error:', error.message);
      setError(error.message); // Set error message in state
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
      {/* Display error message if exists */}
    </div>
  );
};

export default Login;
