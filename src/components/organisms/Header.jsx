import styled from "styled-components";
import { UserAuth } from "../../index";
import { useAuthStore } from "../../store/index";
import { DesplegableUser } from "../../utils/staticData";
import { ListaMenuDesplegable } from "./index";

// componente para el header que muestra el correo del usuario logeado y la opcion para cerrar sesion

export function Header({ stateConfig }) {
  const { signOut } = useAuthStore();
  const { user } = UserAuth();
  const funcionXtipo = async (p) => {
    if (p.tipo === "cerrarsesion") {
      await signOut();
    }
  };
  return (
    <Container>
      <Datauser onClick={stateConfig.setState}>
        <div className="imgContainer">
          <img src="https://i.ibb.co/kGYgRZ8/programador.png" />
        </div>
        <span className="nombre">{user.email}</span>
        {stateConfig.state && (
          <ListaMenuDesplegable
            data={DesplegableUser}
            top="62px"
            funcion={(p) => funcionXtipo(p)}
          />
        )}
      </Datauser>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: end;
`;

const Datauser = styled.div`
  z-index: 10;
  position: relative;
  top: 0;
  right: 0;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50px;
  margin: 15px;
  cursor: pointer;
  .imgContainer {
    height: 40px;
    width: 40px;
    min-height: 40px;
    min-width: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  .nombre {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: normal;
  }
`;
