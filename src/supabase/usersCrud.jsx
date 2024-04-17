import Swal from "sweetalert2";
import { supabase } from "../supabase/index";
import { GetIdAuthSupabase } from "./index";

// consultas para la tabla de usuarios en la base de datos funcionamiento especifico en equiposCrud
export const InsertUser = async (p) => {
  const { data, error } = await supabase
    .from("usuarios")
    .insert(p)
    .select()
    .maybeSingle();
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error",
      text: "error al insertar el usuario " + error.message,
    });
  }
  if (data) {
    return data;
  }
};

// funcion para mostrar el usuario activo de la base de datos, recupera el id de autenticacion de supabase y lo usa como filtro para mostrar el usuario deseado
export const ShowUsers = async () => {
  const idAuthSupabase = await GetIdAuthSupabase();
  const { error, data } = await supabase
    .from("usuarios")
    .select("*,roles(nombre)")
    .eq("idauth", idAuthSupabase)
    .maybeSingle();
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error",
    text: "error al mostrar los usuarios " + error.message,
  });
};

export const ShowAllUsers = async () => {
  const { error, data } = await supabase
    .from("usuarios")
    .select("*,roles(nombre)");
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error",
    text: "error al mostrar los usuarios " + error.message,
  });
};

export const DeleteUser = async (p) => {
  const { error: error2 } = await supabase
    .from("usuarios")
    .delete()
    .eq("idauth", p.idauth);
  if (error2) {
    Swal.fire({
      icon: "error",
      title: " Error",
      text: "error al eliminar el usuario " + error2.message,
    });
  }
};

export const EditUser = async (p) => {
  const { error } = await supabase
    .from("usuarios")
    .update(p)
    .eq("idauth", p.idauth);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error",
      text: "error al editar el usuario " + error.message,
    });
  }
};
