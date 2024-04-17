import Swal from "sweetalert2";
import { supabase } from "./index";

// crud de pruebas, ignorar si no lo borre

export const ShowTest = async () => {
  const { error, data } = await supabase
    .from("departamentos")
    .select(`id, nombre`);
  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error show test",
    text: "error en el test crud " + error.message,
  });
};

export const CountTest = async () => {
  const { data, error } = await supabase
    .from("centros")
    .select(` departamentos_en_centros(count)`);

  if (data) {
    return data;
  }
  Swal.fire({
    icon: "error",
    title: " Error count test",
    text: "error en el test count " + error.message,
  });
};

export const InsertTest = async (p) => {
  const { error } = await supabase
    .from("departamentos")
    .insert([{ nombre: p.nombre }])
    .select();

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error insert test",
      text: "error en el test insert " + error.message,
    });
  }
};

export const InsertWithIDTest = async (p) => {
  const { error } = await supabase
    .from("modelos")
    .insert([{ nombre: p.nombre, marca_id: p.marca_id, tipo_id: p.tipo_id }])
    .select();

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error insert test",
      text: "error en el test insert " + error.message,
    });
  }
};

export const DeleteTest = async (p) => {
  const { error } = await supabase
    .from("departamentos")
    .delete()
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error delete test",
      text: "error en el test delete " + error.message,
    });
  }
};

export const EditTest = async (p) => {
  const { error } = await supabase
    .from("departamentos")
    .update(p)
    .eq("id", p.id);
  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error edit test",
      text: "error en el test edit " + error.message,
    });
  }
};

export const SearchTest = async (p) => {
  const { data, error } = await supabase
    .from("departamentos")
    .select()
    .ilike("nombre", "%" + p.nombre + "%");

  if (error) {
    Swal.fire({
      icon: "error",
      title: " Error search test",
      text: "error en el test search " + error.message,
    });
  }

  return data;
};
