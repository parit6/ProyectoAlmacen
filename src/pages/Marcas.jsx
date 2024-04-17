import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules/index";
import { MarcasTemplate } from "../components/templates/index";
import { useMarcasStore } from "../store";
import Swal from "sweetalert2";

// Page para mostrar las marcas, funcionamiento especifico en la page de bitacora
export function Marcas() {
  const { mostrarMarcas, dataMarcas, searchMarcas, marcasData, buscador } =
    useMarcasStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Marcassss", { id: marcasData?.id }],
    queryFn: () => mostrarMarcas({ id: marcasData?.id }),
  });

  useQuery({
    queryKey: ["buscar marcas", { nombre: buscador }],
    queryFn: () => searchMarcas({ nombre: buscador }) || [],
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return Swal.fire({
      icon: "error",
      title: " Error",
      text: "Error al cargar los datos " + error,
    });
  }

  return <MarcasTemplate data={dataMarcas} />;
}
