import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { SpinnerLoader } from "../components/molecules";
import { DepartamentosTemplate } from "../components/templates/index";
import { useDepartamentosStore } from "../store";

//page para mostrar los departamentos, funcionamiento especifico en la page de bitacora
export function Departamentos() {
  const { showDepartamentos, departamentosData } = useDepartamentosStore();

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Departamentos"],
    queryFn: () => showDepartamentos(),
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
  return <DepartamentosTemplate data={departamentosData} />;
}
