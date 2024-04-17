import { json2csv } from "json-2-csv";
import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useUserStore } from "../../store";
import { v } from "../../styles/variables";
import { ContentFiltro, Title } from "../atoms/index";
import { BtnAdd, BtnCsv } from "../molecules/index";
import {
  Header,
  InputRetraso,
  RegistrarEquipos,
  TableEquipos,
} from "../organisms/index";

// template para los equipos, se encarga de mostrar la tabla de equipos y de abrir el formulario de registro de equipos

export function EquiposTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setdataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setopenRegistro] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const { activeUser } = useUserStore();

  // funcion para abrir el formulario de registro de equipos solamente el usuario administrador puede agregar equipos
  const nuevoRegistro = () => {
    if (activeUser.roles.nombre !== "Administrador") {
      return Swal.fire({
        icon: "error",
        title: " Error",
        text: "Solo un administrador puede agregar Modelos",
      });
    }
    setopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  };

  //esta funcion se encarga de exportar la tabla de equipos a un archivo csv,para eso toma el json de la consulta y lo transforma a csv
  const exportarTabla = () => {
    // Convertir los datos a CSV
    const dataCsv = json2csv(data);

    // Crear un objeto Blob con los datos
    const blob = new Blob([dataCsv], { type: "text/csv;charset=utf-8;" });

    // Crear un enlace de descarga y hacer clic en él
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Equipos.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Cleanup
  };

  return (
    <Container>
      {
        openRegistro && (
          <RegistrarEquipos
            equipos={data}
            dataSelect={dataSelect}
            accion={accion}
            onClose={() => setopenRegistro(!openRegistro)}
          />
        )
        // los template estan divididos en areas para facilitar el diseño y la organizacion de los componentes
      }

      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Equipos</Title>
          <BtnAdd
            bgColor={"#be1d1d"}
            textColor={"#000"}
            icono={<v.agregar />}
            funcion={nuevoRegistro}
          />
          <BtnCsv
            icono={<v.iconoreportes />}
            funcion={exportarTabla}
            textColor={"#000"}
          />
        </ContentFiltro>
      </section>
      <section className="area2">
        <InputRetraso
          // componente para el fitro global de la tabla, se le manda el valor del filtro y la funcion para cambiarlo
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Buscador"
        />{" "}
      </section>
      <section className="main">
        <TableEquipos
          // componente de la tabla de equipos, se le manda la data de los equipos, el estado del formulario de registro, la data seleccionada, la accion y el filtro global
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
