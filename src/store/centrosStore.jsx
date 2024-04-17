import { create } from "zustand";
import {
  DeleteCentros,
  EditCentros,
  InsertCentros,
  ShowCentros
} from "../supabase/index";

// store para mostrar los centros funcionamiento especifico en el store de equipos

export const useCentrosStore = create((set, get) => ({
  centrosData: [],

  showCentros: async () => {
    const response = await ShowCentros();
    set({ centrosData: response });
    return response;
  },

  dataCentros: [],
  item: [],
  parametros: {},
  mostrarCentros: async (p) => {
    const response = await ShowCentros(p);
    set({ parametros: response });
    set({ dataCentros: response });
    set({ item: response[0] });
    return response;
  },

  insertarCentros: async (p) => {
    await InsertCentros(p);
    const { mostrarCentros } = get();
    const { parametros } = get();
    set(mostrarCentros(parametros));
  },

  borrarCentros: async (p) => {
    await DeleteCentros(p);
    const { mostrarCentros } = get();
    const { parametros } = get();
    set(mostrarCentros(parametros));
  },

  editarCentros: async (p) => {
    await EditCentros(p);
    const { mostrarCentros } = get();
    const { parametros } = get();
    set(mostrarCentros(parametros));
  },
}));
