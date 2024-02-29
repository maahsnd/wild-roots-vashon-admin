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

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
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
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
