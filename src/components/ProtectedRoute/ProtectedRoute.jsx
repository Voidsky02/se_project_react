import { Navigate } from "react-router-dom";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  //   if logged in, return the /profile component
  return children;
};

export default ProtectedRoute;
