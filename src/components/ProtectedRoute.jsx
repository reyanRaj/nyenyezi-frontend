import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }, props) => {
  const { user, loading } = useAuth();

  if (loading) return;

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};
