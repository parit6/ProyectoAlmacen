import { create } from "zustand";
import {
  CountMarcas,
  InsertMarcas,
  ShowMarcas,
  DeleteMarcas,
  EditMarcas,
  SearchMarcas,
} from "../supabase/index";

//  store para mostrar las marcas funcionamiento especifico en el store de equipos

export const useMarcasStore = create((set, get) => ({
  marcasData: [],
  marcasCount: [],

  showMarcas: async () => {
    const response = await ShowMarcas();
    set({ marcasData: response });
    return response;
  },

  countMarcas: async (p) => {
    const response = await CountMarcas(p);
    set({ marcasCount: response });
    return response;
  },

  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },

  dataMarcas: [],
  item: [],
  parametros: {},
  mostrarMarcas: async (p) => {
    const response = await ShowMarcas(p);
    set({ parametros: response });
    set({ dataMarcas: response });
    set({ item: response[0] });
    return response;
  },

  selectMarcas: (p) => {
    set({ item: p });
  },

  insertarMarcas: async (p) => {
    await InsertMarcas(p);
    const { mostrarMarcas } = get();
    const { parametros } = get();
    set(mostrarMarcas(parametros));
  },

  borrarMarcas: async (p) => {
    await DeleteMarcas(p);
    const { mostrarMarcas } = get();
    const { parametros } = get();
    set(mostrarMarcas(parametros));
  },

  editMarcas: async (p) => {
    await EditMarcas(p);
    const { mostrarMarcas } = get();
    const { parametros } = get();
    set(mostrarMarcas(parametros));
  },

  searchMarcas: async (p) => {
    const response = await SearchMarcas(p);
    set({ dataMarcas: response });
  },
}));
