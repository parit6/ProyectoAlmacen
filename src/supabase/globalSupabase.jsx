import { supabase } from "../index";

// funcion para obtener el id del usuario autenticado llama la informacion de la sesion de supabase y asigna el id del usuario a una variable
export const GetIdAuthSupabase = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session != null) {
    const { user } = session;
    const idAuthSupabase = user.id;
    return idAuthSupabase;
  }
};
