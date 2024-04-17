import { useQuery } from "@tanstack/react-query";
import { MonitoresTemplate } from "../components/templates/index";
import { useEquiposStore } from "../store/index";
import { SpinnerLoader } from "../components/molecules";
import Swal from "sweetalert2";

// Page para mostrar los monitores, funcionamiento especifico en la page de bitacora

export function Monitores() {
  const { showMonitores, dataMonitores } = useEquiposStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Monitores"],
    queryFn: () => showMonitores(),
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

  return <MonitoresTemplate data={dataMonitores} />;
}
