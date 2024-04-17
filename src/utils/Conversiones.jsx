// funcion para convertir la primera letra de una palabra en mayuscula

export function Capitalize(input) {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
