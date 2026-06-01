import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useRole from "../hooks/useRole";

const AdminRoute = () => {
  const { loading } = useContext(AuthContext);
  const { role, isLoading } = useRole();
  if (loading || isLoading) {
    return <span>Loading</span>;
  }
  if (role !== "admin") {
    return <div>Acces is Forbideen</div>;
  }
};

export default AdminRoute;
