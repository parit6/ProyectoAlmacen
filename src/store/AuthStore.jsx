import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

// store de autentificacion para el inicio y cierre de sesion, llama a la funcion de supabase para el inicio y cierre de sesion tomando los datos del correo y la contraseña

export const useAuthStore = create(() => ({
  signInWithEmail: async (p) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.correo,
      password: p.password,
    });
    if (error) {
      throw new Error("A ocurrido un error durante el registro" + error);
    }
    return data.user;
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(
        "A ocurrido un error durante el cierre de la sesion" + error
      );
    }
  },
}));
