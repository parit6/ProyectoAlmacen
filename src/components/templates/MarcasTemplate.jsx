import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useUserStore } from "../../store/index";
import { v } from "../../styles/variables";
import { ContentFiltro, Title } from "../atoms/index";
import { BtnAdd } from "../molecules/index";
import {
  Header,
  InputRetraso,
  RegistrarMarca,
  TableMarcas,
} from "../organisms/index";

// componente de la template de marcas, detalle de su funcionamiento en la template de equipos
export function MarcasTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const { activeUser } = useUserStore();

  const [openRegistro, setopenRegistro] = useState(false);
  const nuevoRegistro = () => {
    if (activeUser.roles.nombre !== "Administrador") {
      return Swal.fire({
        icon: "error",
        title: " Error",
        text: "Solo un administrador puede agregar usuarios",
      });
    }
    setopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  };

  return (
    <Container>
      {openRegistro && (
        <RegistrarMarca
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => setopenRegistro(!openRegistro)}
          dataUser={activeUser}
        />
      )}

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Marcas</Title>
          <BtnAdd
            bgColor="#be1d1d"
            textColor="#000"
            icono={<v.agregar />}
            funcion={nuevoRegistro}
          />
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
        <TableMarcas
          data={data}
          setopenRegistro={setopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
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
