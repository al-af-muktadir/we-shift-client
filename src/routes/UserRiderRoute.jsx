import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const UserRiderRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading } = useRole();
  console.log(role, "inroute");
  if (loading || isLoading) return <span>Loading</span>;

  if (!user) {
    return <Navigate to="/login" state="/rider" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default UserRiderRoute;
