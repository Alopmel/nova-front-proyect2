import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function ProtectedRoute() {
  const { user, isAdmin, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, verifica si es administrador.
  if (isAdmin) {
    return (
      <>
        <Outlet /> {/* Deja un Outlet para las rutas anidadas */}
      </>
    );
  }

  // Si no es administrador, muestra la página de perfil.
  return <Outlet />; // Redirige a la página de perfil
}

export default ProtectedRoute;
