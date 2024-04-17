import styled from "styled-components";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

// Este componente es un input personalizado que implementa un retraso (debounce) en el manejo del evento onChange.
export function InputRetraso({
  value: initialValue, // Valor inicial del input
  onChange, // Función a ejecutar cuando el valor del input cambia
  debounce = 2000, // Tiempo de retraso en milisegundos antes de ejecutar la función onChange
  ...props // Otros props que se pasen al componente
}) {
  // Estado local para almacenar el valor actual del input
  const [value, setValue] = useState(initialValue);

  // Efecto para actualizar el valor del estado local cuando cambie el valor inicial
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Efecto para manejar el retraso (debounce) en el evento onChange
  useEffect(() => {
    // Crear un timeout que se ejecutará después del tiempo especificado en 'debounce'
    const timeout = setTimeout(() => {
      onChange(value); // Ejecutar la función onChange con el valor actual
    }, debounce);

    // Limpiar el timeout cuando el componente se desmonte o cuando el valor, debounce o onChange cambien
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  // Renderizar el componente
  return (
    <Container>
      <article className="content">
        <CiSearch className="icono" />
        <input
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </article>
    </Container>
  );
}

const Container = styled.div`
  //background-color: ${(props) => props.theme.bg};
  width: 200px;
  border-radius: 10px;
  height: 40px;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.text};
  border: 1px solid #414244;

  .content {
    padding: 15px;
    gap: 10px;
    display: flex;
    align-items: center;

    .icono {
      font-size: 18px;
    }

    input {
      font-size: 15px;
      width: 100%;
      outline: none;
      background: none;
      border: 0;
      color: ${(props) => props.theme.text};
    }
  }
`;
