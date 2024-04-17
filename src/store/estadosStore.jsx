import { create } from "zustand";
import { ShowEstados } from "../supabase";

// store para mostrar los estados funcionamiento especifico en el store de equipos

export const useEstadoStore = create((set) => ({
  estadosData: [],

  showEstados: async () => {
    const response = await ShowEstados();
    set({ estadosData: response });
    return response;
  },
}));
