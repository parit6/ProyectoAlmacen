import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../index";

// Crea un nuevo contexto de React para la autenticación del usuario
const AuthContext = createContext();

/**
 * Este componente es un proveedor de contexto que envuelve a los componentes hijos
 * y les proporciona acceso al estado de autenticación del usuario.
 */
export const AuthContextProvider = ({ children }) => {
  // Inicializa el estado del usuario a null
  const [user, setUser] = useState([null]);

  // Este efecto se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Establece un escuchador para los cambios en el estado de autenticación de Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Si el usuario no está autenticado, establece el estado del usuario a null
        if (session?.user == null) {
          setUser(null);
        } else {
          // Si el usuario está autenticado, establece el estado del usuario al usuario de la sesión
          setUser(session?.user);
        }
      }
    );

    // Devuelve una función de limpieza que se ejecuta cuando el componente se desmonta
    // Esta función cancela la suscripción al escuchador de cambios en el estado de autenticación
    return () => {
      authListener.subscription;
    };
  }, []);

  // Proporciona el estado del usuario a los componentes hijos a través del contexto de autenticación
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// Esta función de ayuda permite a los componentes acceder al contexto de autenticación
export const UserAuth = () => {
  return useContext(AuthContext);
};