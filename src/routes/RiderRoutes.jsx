import useRole from "../hooks/useRole";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const RiderRoutes = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const { role, isLoading } = useRole();
  if (loading || isLoading) {
    return <span>Loading</span>;
  }
  if (role !== "rider") {
    return <div>Acces is Forbideen</div>;
  }
  return children;
};

export default RiderRoutes;
