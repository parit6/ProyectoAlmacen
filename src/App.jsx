import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { MenuHambur, Sidebar } from "./components/organisms/index";
import { AuthContextProvider, MyRoutes } from "./index";
import { Login } from "./pages/index";
import { Dark, Device, Light } from "./styles/index";

export const ThemeContext = createContext(null);

// Este es el componente principal de la aplicación.
function App() {
  // Se define el estado 'themeUse' para controlar el tema de la aplicación (claro u oscuro).
  const [themeUse, setTheme] = useState("light");
  // Se define la variable 'theme' basada en el estado 'themeUse'.
  const theme = themeUse === "light" ? "light" : "dark";
  // Se utiliza useMemo para evitar cálculos innecesarios en cada renderizado.
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  // Se define el estilo del tema basado en el valor de 'theme'.
  const themeStyle = theme === "light" ? Light : Dark;
  // Se define el estado 'sidebarOpen' para controlar la apertura y cierre de la barra lateral.
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Se obtiene la ruta actual.
  const { pathname } = useLocation();

  // Se renderiza el componente.
  return (
    // Se proporciona el contexto del tema a los componentes hijos.
    <ThemeContext.Provider value={value}>
      {/* // Se aplica el tema a los componentes hijos.*/}
      <ThemeProvider theme={themeStyle}>
        {/*  // Se proporciona el contexto de autenticación a los componentes hijos.*/}
        <AuthContextProvider>
          {/*Si la ruta actual es '/login', se renderiza el componente 'Login'.
          // De lo contrario, se renderiza el layout principal de la aplicación.*/}
          {pathname == "/login" ? (
            <Login />
          ) : (
            <Container className={sidebarOpen ? "active" : ""}>
              {/*Se renderiza la barra lateral.*/}
              <section className="ContentSidebar">
                <Sidebar
                  state={sidebarOpen}
                  setState={setSidebarOpen}
                />
              </section>
              {/*Se renderiza el botón del menú hamburguesa.*/}
              <section className="ContentMenuambur">
                <MenuHambur />
              </section>
              {/* Se renderizan las rutas de la aplicación.*/}
              <section className="ContentRoutes">
                <MyRoutes />
              </section>
            </Container>
          )}
          {/* // Se renderizan las herramientas de desarrollo de React Query.*/}
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${(props) => props.theme.bgtotal};
  .ContentSidebar {
    display: none;
  }
  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }

  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuambur {
      display: none;
    }
    .ContentRoutes {
      grid-column: 1;
      width: 100%;
      @media ${Device.tablet} {
        grid-column: 2;
        width: 100%;
      }
    }
  }
`;

export default App;
