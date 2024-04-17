import Swal from "sweetalert2";
import { supabase } from "./index";

// consultas para la base de datos funcinamiento especifico en equiposCrud
export const ShowEstados = async () => {
  const { error, data } = await supabase
    .from("estados")
    .select(`id,nombre`)
    .order("nombre", { ascending: true });
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show tipos",
    text: "error al traer los estados " + error.message,
  });
};
