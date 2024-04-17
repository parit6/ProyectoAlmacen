import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoIosUndo,
} from "react-icons/io";
import styled from "styled-components";

// componente para la paginacion de las tablas recibe las tablas, la pagina actual, el maximo de paginas y la funcion para ir al inicio, usa funciones de tanstack tables
export function Paginacion({ table, pagina, maximo, irinicio }) {
  return (
    <Container>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => irinicio()}
      >
        <span className="iconos">
          <IoIosUndo />
        </span>
      </button>
      {/* boton para ir a la pagina anterior */}
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        <span className="iconos">
          <IoIosArrowRoundBack />
        </span>
      </button>
      {/* muestra la pagina actual y el maximo de paginas */}
      <span>{pagina}</span>
      <p> de {maximo}</p>
      <button
        // boton para ir a la pagina siguiente
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        <span className="iconos">
          <IoIosArrowRoundForward />
        </span>
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  button {
    background-color: #3aa597;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    transition: 0.5s;
    &:hover {
      box-shadow: 0px 10px 15px -3px ${(props) => props.$colorCategoria};
    }

    .iconos {
      color: #fff;
    }
  }

  button[disabled] {
    background: #646464;
    cursor: no-drop;
    box-shadow: none;
  }
`;
