import { Navigate, Outlet } from "react-router-dom";

// componente para proteger rutas, recibe el usuario y la ruta a la que se redirigira
export const ProtectedRoutes = ({ user, redirectTo, children }) => {
  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};
