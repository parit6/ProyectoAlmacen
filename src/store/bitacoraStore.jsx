import { create } from "zustand";
import {
  DeleteBitacoras,
  EditBitacoras,
  InsertBitacora,
  ShowBitacora,
} from "../supabase/index";

//store para mostrar la bitacora funcionamiento especifico en el store de equipos

export const useBitacoraStore = create((set) => ({
  bitacoraData: [],

  showBitacora: async () => {
    const response = await ShowBitacora();
    set({ bitacoraData: response });
    return response;
  },

  insertarBitacora: async (p) => {
    await InsertBitacora(p);
  },

  borrarBitacora: async (p) => {
    await DeleteBitacoras(p);
  },

  editarBitacora: async (p) => {
    await EditBitacoras(p);
  },
}));
