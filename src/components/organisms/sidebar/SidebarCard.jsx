import styled from "styled-components";
import { useAuthStore } from "../../../store/index";
import { v } from "../../../styles/index";
import { Btnsave } from "../../molecules/index";

// componente para desplegar el boton de cerrar sesion en el correo del usuario logeado
export function SidebarCard() {
  const { signOut } = useAuthStore();

  return (
    <Container>
      <span className="icon">{<v.iconoayuda color="" />}</span>
      <div className="cardContent">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <h3>Cerrar sesión</h3>
        <div className="contentBtn">
          <Btnsave
            titulo="Cerrar Sesion"
            bgcolor="#a53a48"
            funcion={signOut}
          />
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
  position: relative;

  .icon {
    position: absolute;
    font-size: 3rem;
    border-radius: 50%;
    right: 50%;
    transform: translate(50%);
    z-index: 100;
    color: ${(props) => props.theme.text};
    z-index: 20;
  }
  .cardContent {
    position: relative;
    padding: 1rem;
    background: ${(props) => props.theme.sidebarCardbg};
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.text};

    .circle1,
    .circle2 {
      position: absolute;
      background: ${(props) => props.theme.colorToggle};
      border-radius: 50%;
      opacity: 0.7;
    }
    .circle1 {
      height: 100px;
      width: 100px;
      top: -50px;
      left: -50px;
    }
    .circle2 {
      height: 130px;
      width: 130px;
      bottom: -80px;
      right: -70px;
    }
    h3 {
      font-size: 1.1rem;
      margin-top: 1rem;
      padding: 1rem 0;
      font-weight: 800;
      color: ${(props) => props.theme.text};
    }
    .contentBtn {
      position: relative;
      margin-left: -8px;
    }
  }
`;
