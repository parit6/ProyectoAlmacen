import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  useMarcasStore,
  useModelosStore,
  useTiposStore,
} from "../../../store/index";
import { v } from "../../../styles/variables";
import { Btnsave } from "../../molecules/index";
import { InputText } from "../../organisms/index";

// Componente para registrar un nuevo modelo
// Detalle de funcionamiento en Registrar Equipos.jsx
export function RegistrarModelos({ onClose, dataSelect, accion }) {
  const { insertarModelos, editModelos } = useModelosStore();
  const { mostrarMarcas, dataMarcas } = useMarcasStore();
  const { showTipos, tiposData } = useTiposStore();

  useQuery({
    queryKey: ["data de marcas"],
    queryFn: () => mostrarMarcas(),
  });
  useQuery({
    queryKey: ["data de marcas"],
    queryFn: () => showTipos(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        nombre: data.nombre,
        marca_id: data.marca_id,
        tipo_id: data.tipo_id,
      };
      await editModelos(p);
      onClose();
    } else {
      const p = {
        nombre: data.nombre,
        marca_id: data.marca_id,
        tipo_id: data.tipo_id,
      };
      await insertarModelos(p);
      onClose();
    }
  }
  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (accion === "Editar") {
    }
  });
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar" ? "Editar dato" : "Registrar nuevo dato"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form
          className="formulario"
          onSubmit={handleSubmit(insertar)}
        >
          <section>
            <article>
              <InputText icono={<v.iconomarca />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.nombre}
                  type="text"
                  placeholder=""
                  {...register("nombre", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombre:</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconomarca />}>
                <select
                  className="form__field"
                  {...register("marca_id", {
                    required: true,
                  })}
                >
                  <option value="">-- Seleccione una Marca--</option>
                  {dataMarcas.map((marca) => (
                    <option
                      key={marca.id}
                      value={marca.id}
                    >
                      {marca.nombre}
                    </option>
                  ))}
                </select>
                <label className="form__label">Marca:</label>
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconomarca />}>
                <select
                  className="form__field"
                  {...register("tipo_id", {
                    required: true,
                  })}
                >
                  <option value="">-- Seleccione un Tipo --</option>
                  {tiposData.map((tipo) => (
                    <option
                      key={tipo.id}
                      value={tipo.id}
                    >
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
                <label className="form__label">Tipo:</label>
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
