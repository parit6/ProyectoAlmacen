import styled from "styled-components";
import { AccionTabla } from "../atoms/index";
import { v } from "../../styles/index";

// componente de las acciones de la tabla (editar y eliminar) 
export function TableActions({ editFunct, deleteFunct }) {
  return (
    <Container>
      <AccionTabla
        funcion={editFunct}
        color="#aac50d"
        icono={<v.iconeditarTabla />}
        fontsize="20px"
      />
      <AccionTabla
        funcion={deleteFunct}
        color="#a11107"
        icono={<v.iconeliminarTabla />}
        fontsize="20px"
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  @media (max-width: 48em) {
    justify-content: end;
  }
`;
