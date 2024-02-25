import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext'; // Import useAuth hook
import Home from './components/home/Home';
import Menu from './components/menu/Menu';
import Login from './components/login/Login';
import { ProtectedLayout } from './components/ProtectedLayout';
import { PublicLayout } from './components/PublicLayout';

export default function App() {
  const { user } = useAuth(); // Get user from AuthContext

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <PublicLayout />}
      >
        <Route index element={<Login />} />
      </Route>

      <Route
        path="/"
        element={user ? <ProtectedLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Route>
    </Routes>
  );
}
