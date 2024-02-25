import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const PublicLayout = () => {
  const { user } = useAuth(); // Get the user object from the AuthContext

  // If the user is authenticated, redirect to the home page
  // Otherwise, render the public content
  return user ? <Navigate to="/" /> : <Outlet />;
};
