import { useMemo } from "react";
import { InputRetraso } from "../forms";

/* funcion de filtro para las columnas de las tablas usa la libreria tanstack tables*/
export function Filter({ column }) {
  const sortedUniqueValues = useMemo(
    // usa una funcion de la libreria para obtener valores unicos de la columna y los ordena
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column]
  );

  return (
    <>
      <datalist id={column.id + "list"}>
        {
        // mapeo de los valores unicos de la columna para mostrarlos en el filtro
        sortedUniqueValues.slice(0, 5000).map((value, index) => (
          <option
            value={value}
            key={index}
          />
        ))}
      </datalist>
      <InputRetraso
      // input para la funcion de filtrado, toma el valor de la columna y lo compara con los valores unicos, cuando no tiene valores unicos muestra un mensaje con la cantidad de valores unicos y los muestra en el placeholder
        type="text"
        value={column.getFilterValue() ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`buscador (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}
