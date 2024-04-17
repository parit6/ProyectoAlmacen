import Swal from "sweetalert2";
import { supabase } from "./index";


// consultas para la base de datos funcinamiento especifico en equiposCrud
export const ShowModelos = async () => {
  const { data, error } = await supabase
    .from("modelos")
    .select("*,marcas(nombre),tipos(nombre)")
    .order("nombre", { ascending: true });
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show modelos",
    text: "error en el show modelos crud " + error.message,
  });
};

export const CountModelos = async () => {
  const { data, error } = await supabase
    .from("modelos")
    .select(`modelos(count)`);

  if (data) {
    return data;
  }

  Swal.fire({
    icon: "error",
    title: " Error count modelos",
    text: "error en el count modelos crud " + error.message,
  });
};

export const InsertModelos = async (p) => {
  const { error } = await supabase
    .from("modelos")
    .insert([{ nombre: p.nombre, marca_id: p.marca_id, tipo_id: p.tipo_id }])
    .select();

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error insert modelos",
      text: "error en el insert modelos crud " + error.message,
    });
  }
};

export const EditModelos = async (p) => {
  const { error } = await supabase
    .from("modelos")
    .update({ nombre: p.nombre, marca_id: p.marca_id, tipo_id: p.tipo_id })
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error edit modelos",
      text: "error en el edit modelos crud" + error.message,
    });
  }
};

export const DeleteModelos = async (p) => {
  const { error } = await supabase.from("modelos").delete().eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error delete modelos",
      text: "error en el delete modelos crud " + error.message,
    });
  }
};

export const SearchModelos = async (p) => {
  const { error, data } = await supabase
    .from("modelos")
    .select("*")
    .ilike("nombre", "%" + p.nombre + "%");
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error search marcas",
      text: "error en el search modelos crud" + error.message,
    });
  }

  return data;
};

export const ShowModelosByMarca = async (p) => {
  const { data, error } = await supabase
    .from("modelos")
    .select("nombre")
    .eq("marca_id", p);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show modelos by marca",
    text: "error en el show modelos by marca crud " + error.message,
  });
};
