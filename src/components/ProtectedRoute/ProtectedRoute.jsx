import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  //   if logged in, return the /profile component
  return children;
};

export default ProtectedRoute;
