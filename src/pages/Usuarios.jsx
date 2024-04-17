import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { SpinnerLoader } from "../components/molecules/index";
import { UsuariosTemplate } from "../components/templates/index";
import { useUserStore } from "../store";

// Page para mostrar los usuarios, funcionamiento especifico en la page de bitacora
export function Usuarios() {
  const { showAllUsers, userData } = useUserStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar usuario table"],
    queryFn: () => showAllUsers(),
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

  return <UsuariosTemplate data={userData} />;
}
