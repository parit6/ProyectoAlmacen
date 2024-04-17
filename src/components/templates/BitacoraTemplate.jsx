import { useState } from "react";
import styled from "styled-components";

import { Header, InputRetraso, TableBitacoras } from "../organisms/index";
import { ContentFiltro, Title } from "../atoms";

// Template de la bitacora, se encarga de mostrar la tabla de bitacoras y gestionar la informacion que se le envia a la tabla su uso especifico se mostrara en la tabla equipos
export function BitacoraTemplate({ data: bitacoraData }) {
  const [state, setState] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Bitacora</Title>
        </ContentFiltro>
      </section>
      <section className="area2">
        <InputRetraso
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Buscador"
        />
      </section>
      <section className="main">
        <TableBitacoras
          data={bitacoraData}
          globalFilter={globalFilter}
        />
      </section>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto;

  .header {
    grid-area: header;
    // background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }

  .area1 {
    grid-area: area1;
    //background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    align-items: center;
  }

  .area2 {
    grid-area: area2;
    //background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .main {
    grid-area: main;
    // background-color: rgba(179, 46, 241, 0.14);
  }
`;
