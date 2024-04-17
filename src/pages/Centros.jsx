import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { SpinnerLoader } from "../components/molecules";
import { CentrosTemplate } from "../components/templates/index";
import { useCentrosStore } from "../store";

// page para el componente de centros, funcionamiento especifico en la page de bitacora
export function Centros() {
  const { showCentros, centrosData } = useCentrosStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Centros"],
    queryFn: () => showCentros(),
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
  return <CentrosTemplate data={centrosData} />;
}
