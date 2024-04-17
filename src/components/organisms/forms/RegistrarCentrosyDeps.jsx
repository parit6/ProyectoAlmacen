import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  useCentrosStore,
  useDepartamentosStore,
  useUserStore,
} from "../../../store/index";
import { v } from "../../../styles/variables";
import { Btnsave } from "../../molecules/index";
import { InputText } from "./index";
import { RiLockPasswordLine } from "react-icons/ri";

// Este componente es para registrar un nuevo centro en un departamento mediante su tabla union
// Detalle de funcionamiento en Registrar Equipos.jsx
export function RegistrarCentrosyDeps({ onClose, dataSelect, accion }) {
  const {
    showDepartamentos,
    editarDepartamentosyCentros,
    insertarDepartamentosyCentros,
    departamentosData,
  } = useDepartamentosStore();
  const { showCentros, centrosData } = useCentrosStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useQuery({
    queryKey: ["mostrar departamentos"],
    queryFn: () => showDepartamentos(),
  });

  useQuery({
    queryKey: ["mostrar centros"],
    queryFn: () => showCentros(),
  });

  const { activeUser } = useUserStore();

  async function insertar(data) {
    // Verificar si el usuario tiene permiso para insertar un centros en el centro especificado
    if (activeUser.rol_id !== 1) {
      return Swal.fire({
        icon: "error",
        title: " Error",
        text: "No tienes permiso para insertar un centros",
      });
    }

    // Recibe la informacion del formulario y la asigna a una variable p para pasarla a la funcion de insertar o editar
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        departamento_id: data.departamento_id,
        centro_id: data.centro_id,
      };
      await editarDepartamentosyCentros(p);
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Centros editado con exito",
      });
      onClose();
    } else {
      const p = {
        departamento_id: data.departamento_id,
        centro_id: data.centro_id,
      };
      await insertarDepartamentosyCentros(p);
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Centros agregado con exito",
      });
      onClose();
    }
  }
  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (accion === "Editar") {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar departamentos"
                : "Registrar nuevo departamentos"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <div className="formulario">
          <form
            className="formulario"
            onSubmit={handleSubmit(insertar)}
          >
            <section>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("departamento_id", {
                      required: true,
                      // toma la informacion de los departamentos e itera  con un map para mostrarlos en el select
                    })}
                    defaultValue={dataSelect.departamento_id}
                  >
                    <option value="">-- Seleccione un departamento --</option>
                    {departamentosData.map((departamentos, index) => (
                      <option
                        key={index}
                        value={departamentos.id}
                      >
                        {departamentos.nombre}
                      </option>
                    ))}
                  </select>
                  <label className="form__label">Departamentos</label>
                  {errors.option?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<RiLockPasswordLine color="#3AA597" />}>
                  <select
                    className="form__field"
                    {...register("centro_id", {
                      required: true,
                    })}
                  >
                    <option value="">-- Seleccione un centro --</option>
                    {centrosData.map((centros, index) => (
                      <option
                        key={index}
                        value={centros.id}
                      >
                        {centros.nombre}
                      </option>
                    ))}
                  </select>
                  <label className="form__label">Centros</label>
                  {errors.option?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <div className="btnguardarContent">
                <Btnsave
                  icono={<v.iconoguardar />}
                  titulo="Guardar"
                  bgcolor="#3AA597"
                />
              </div>
            </section>
          </form>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;
