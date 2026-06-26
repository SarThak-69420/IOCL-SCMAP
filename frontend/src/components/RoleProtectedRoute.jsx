import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ allowedRoles, children }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleProtectedRoute;