import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user.isLogin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
