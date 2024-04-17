import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { SpinnerLoader } from "../components/molecules";
import { ProtectedRoutes, UserAuth } from "../index";
import {
  Bitacora,
  Centros,
  Centrosydepartamentos,
  Configuracion,
  Departamentos,
  Equipos,
  Home,
  Login,
  Marcas,
  MenuInventario,
  MenuMarcas,
  Modelos,
  Monitores,
  Usuarios,
} from "../pages/index";
import { useUserStore } from "../store";

// Componente para el enrutamiento de las páginas de la aplicación.
// Primero verifica si hay un usuario logeado, en caso de no haberlo redirige al login de la aplicación.
export function MyRoutes() {
  // Obtiene el estado del usuario a través del contexto de autenticación
  const { user } = UserAuth();

  // Obtiene la función showUsers del store de usuarios
  const { showUsers } = useUserStore();

  // Realiza una consulta para obtener los usuarios. Muestra un spinner mientras la consulta está cargando.
  const { isLoading } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: showUsers,
  });

  // Si la consulta está cargando, muestra un spinner
  if (isLoading) {
    return <SpinnerLoader />;
  }

  // Define las rutas de la aplicación y trae un componente diferente dependiendo de la ruta tambien trae el componente de ProtectedRoutes que verifica si el usuario está logeado o no para redirigirlo al login
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        element={
          <ProtectedRoutes
            user={user}
            redirectTo="/login"
          />
        }
      >
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/configurar"
          element={<Configuracion />}
        />
        <Route
          path="/bitacora"
          element={<Bitacora />}
        />
        <Route
          path="/configurar/usuarios"
          element={<Usuarios />}
        />
        <Route
          path="/configurar/centros"
          element={<Centros />}
        />
        <Route
          path="/configurar/departamentos"
          element={<Departamentos />}
        />
        <Route
          path="/configurar/centrosydepartamentos"
          element={<Centrosydepartamentos />}
        />
        <Route
          path="/configurar/menuMarcas"
          element={<MenuMarcas />}
        />
        <Route
          path="/configurar/menuMarcas/marcas"
          element={<Marcas />}
        />
        <Route
          path="/configurar/menuMarcas/modelos"
          element={<Modelos />}
        />
        <Route
          path="/configurar/menuInventario"
          element={<MenuInventario />}
        />
        <Route
          path="/configurar/menuInventario/equipos"
          element={<Equipos />}
        />
        <Route
          path="/configurar/menuInventario/monitores"
          element={<Monitores />}
        />
      </Route>
    </Routes>
  );
}
