import Swal from "sweetalert2";
import { supabase } from "./index";

// consultas para la base de datos funcinamiento especifico en equiposCrud

export const ShowTipos = async () => {
  const { error, data } = await supabase
    .from("tipos")
    .select(`*`)
    .order("nombre", { ascending: true });
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show tipos",
    text: "error en el show tipos crud " + error.message,
  });
};

export const ShowTiposById = async (id) => {
  const { error, data } = await supabase.from("tipos").select(`*`).eq("id", id);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show tipos",
    text: "error en el show tipos crud " + error.message,
  });
};
