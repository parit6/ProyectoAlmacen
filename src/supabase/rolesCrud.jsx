import Swal from "sweetalert2";
import { supabase } from "./index";


// consultas para la base de datos funcinamiento especifico en equiposCrud
export const ShowRoles = async () => {
  const { error, data } = await supabase.from("roles").select(`id, nombre`);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show roles",
    text: "error en el roles crud " + error.message,
  });
};
