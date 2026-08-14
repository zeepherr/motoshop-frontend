import { Navigate, Outlet } from "react-router";
import { getRoleHome } from "../constants/role";
import useAuthStore from "../stores/auth.store";

const RoleRoute = ({ allowRoles }) => {
  const user = useAuthStore((state) => state.user);
  if (!user || !allowRoles.includes(user.role)) {
    return <Navigate to={getRoleHome(user?.role)} replace />;
  }
  return <Outlet />;
};

export default RoleRoute;
