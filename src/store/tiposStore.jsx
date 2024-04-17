import { create } from "zustand";
import { ShowTipos, ShowTiposById } from "../supabase/index";

// store para mostrar los tipos funcionamiento especifico en el store de equipos
export const useTiposStore = create((set) => ({
  tiposData: [],

  showTipos: async () => {
    const response = await ShowTipos();
    set({ tiposData: response });
    return response;
  },

  showTiposById: async (id) => {
    const response = await ShowTiposById(id);
    set({ tiposData: response });
    return response;
  },
}));
