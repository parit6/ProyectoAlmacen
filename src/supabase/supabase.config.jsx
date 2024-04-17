import { createClient } from "@supabase/supabase-js";

//configuuracion del cliente de supabase, recive la url y la llave anonima del proyecto como variables de entorno

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);
