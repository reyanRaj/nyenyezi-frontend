import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminProtectedRoute = ({ children }, props) => {
  const { user, loading } = useAuth();

  if (loading) return;

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  console.log(user);
  user.roles.forEach((role) => {
    console.log(role);
    if (role.name === "admin") {
      console.log("matched");
      return children;
    } else {
      return <Navigate to="/" />;
    }
  });

  return children;
};
