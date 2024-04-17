import Swal from "sweetalert2";
import { supabase } from "./index";

// consultas para la base de datos funcinamiento especifico en equiposCrud
export const ShowBitacora = async () => {
  const { error, data } = await supabase
    .from("bitacoras")
    .select(
      "*,tipos(nombre),modelos(nombre,marcas(nombre)),estados(nombre),centros(nombre),departamentos(nombre)"
    );
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show tipos",
    text: "error al obtener bitacoras " + error.message,
  });
};

export const InsertBitacora = async (p) => {
  const { error } = await supabase.from("bitacoras").insert({
    ...p,
  });

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error insert bitacora",
      text: "error al insertar bitacora " + error.message,
    });
  }
};

export const EditBitacoras = async (p) => {
  const { error } = await supabase
    .from("bitacoras")
    .update({
      accion: p.accion,
      correo: p.correo,
      numserie: p.numserie,
      motivo: p.motivo,
      marca_id: p.marca_id,
      modelo_id: p.modelo_id,
      tipo_id: p.tipo_id,
      estado_id: p.estado_id,
      centro_id: p.centro_id,
      departamento_id: p.departamento_id,
    })
    .match({ id: p.id });

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error edit equipos",
      text: "error al editar equipos " + error.message,
    });
  }
};

export const DeleteBitacoras = async (p) => {
  const { error } = await supabase.from("bitacoras").delete().eq("id", p.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error delete bitacoras",
      text: "error al eliminar bitacoras " + error.message,
    });
  }
};
