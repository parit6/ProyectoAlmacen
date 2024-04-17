import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { create } from "zustand";
import { EditUser } from "../index";
import {
  DeleteUser,
  InsertUser,
  ShowAllUsers,
  ShowUsers,
} from "../supabase/index";

// store para el manejo de los usuarios

export const useUserStore = create((set, get) => ({
  /*
  en esta funcion se llama a un cliente de supabase que pueda acceder a las funciones de administracion de supabase llamado supabaseadmin, se crea un usuario con los datos que se le pasan en el parametro p, se inserta el usuario en la base de datos de supabase y se inserta en la base de datos de la aplicacion, se cierra la sesion del usuario y se retorna el usuario insertado
  */
  insertAdminUser: async (p) => {
    const supabaseAdmin = createClient(
      import.meta.env.VITE_APP_SUPABASE_URL,
      import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: p.correo,
      password: p.password,
      user_metadata: { nombre: p.nombre },
      email_confirm: true,
    });
    if (error) {
      Swal.fire({
        icon: "error",
        title: " Error",
        text: "error al crear el usuario " + error.message,
      });
      return;
    }
    const dataUser = await InsertUser({
      idauth: data.user.id,
      fechaRegistro: new Date(),
      rol_id: p.rol_id,
      correo: data.user.email,
      password: data.user.password,
      nombre: p.nombre,
    });
    supabaseAdmin.auth.signOut();

    return dataUser;
  },

  // se crea una variable userData que es un arreglo vacio que recibira los datos de los usuarios, se llama de forma asincrona la consulta de la base de datos y se setea la respuesta en las variables
  userData: [],
  item: [],
  parametros: {},
  showAllUsers: async () => {
    const response = await ShowAllUsers();
    set({ userData: response });
    set({ parametros: response });
    set({ item: response[0] });
    return response;
  },

  // para la edicion del usuario se crea el cliente administrador y se llama a la funcion para acttualizar usuarios con su id, el id ya llega con los parametros a la funcion, y se le pasan los datos a actualizar 
  editUser: async (p) => {
    const supabaseAdmin = createClient(
      import.meta.env.VITE_APP_SUPABASE_URL,
      import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { error } = await supabaseAdmin.auth.admin.updateUserById(p.idauth, {
      email: p.correo,
      password: p.password,
      user_metadata: { nombre: p.nombre },
    });
    if (error) {
      Swal.fire({
        icon: "error",
        title: " Error",
        text: "error al editar el usuario en supabase " + error.message,
      });
    }
    // se crea una variable pWithoutPassword que es un objeto que recibe todos los datos de p menos la contraseña, se llama a la funcion de editar usuario y se le pasa el objeto pWithoutPassword, se llama a la funcion de mostrar todos los usuarios y se le pasa el parametro de la busqueda de usuarios
    const pWithoutPassword = { ...p };
    delete pWithoutPassword.password;
    await EditUser(pWithoutPassword);
    const { showAllUsers } = get();
    const { parametros } = get();
    set(showAllUsers(parametros));
    supabaseAdmin.auth.signOut();
  },
// se crea una variable idUser que es un numero que se inicializa en 0 y activeUser que es un arreglo vacio, se llama de forma asincrona la funcion de mostrar usuarios y se setea la respuesta en las variables, esta funcion es para llamar al usuario activo en la aplicacion

  idUser: 0,
  activeUser: [],
  showUsers: async () => {
    const response = await ShowUsers();
    set({ idUser: response.id, activeUser: response });
    return response;
  },

  // para borrar usuarios se llama a la funcion deleteUser de supabase con el id del usuario a borrar, una vez termina se llama a la funcion que borra el usuario de la base de datos y se cierra la sesion administrador
  deleteUser: async (p) => {
    const supabaseAdmin = createClient(
      import.meta.env.VITE_APP_SUPABASE_URL,
      import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    const { error } = await supabaseAdmin.auth.admin.deleteUser(p.idauth);
    if (error) {
      Swal.fire({
        icon: "error",
        title: " Error",
        text: "error al eliminar el usuario " + error.message,
      });
      return;
    }

    await DeleteUser(p);
    const { showAllUsers } = get();
    const { parametros } = get();
    set(showAllUsers(parametros));
    supabaseAdmin.auth.signOut();
  },
}));
