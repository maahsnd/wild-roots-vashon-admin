import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Nav from './nav/Nav';

export const ProtectedLayout = () => {
  const { user } = useAuth(); // Get the user object from the AuthContext

  if (!user) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the protected content
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
