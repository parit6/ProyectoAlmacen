import { create } from "zustand";
import {
  DeleteDepartamentos,
  DeleteDepartamentoyCentros,
  EditDepartamentos,
  EditDepartamentosyCentros,
  InsertDepartamentos,
  InsertDepartamentosyCentros,
  ShowDepartamentos,
  ShowDepartamentosyCentros,
} from "../supabase/index";

// store para mostrar los departamentos funcionamiento especifico en el store de equipos

export const useDepartamentosStore = create((set, get) => ({
  departamentosData: [],

  showDepartamentos: async () => {
    const response = await ShowDepartamentos();
    set({ departamentosData: response });
    return response;
  },

  dataDepartamentos: [],
  item: [],
  parametros: {},
  mostrarDepartamentos: async (p) => {
    const response = await ShowDepartamentos(p);
    set({ parametros: response });
    set({ dataDepartamentos: response });
    set({ item: response[0] });
    return response;
  },

  insertarDepartamentos: async (p) => {
    await InsertDepartamentos(p);
    const { mostrarDepartamentos } = get();
    const { parametros } = get();
    set(mostrarDepartamentos(parametros));
  },

  deleteDepartamentos: async (p) => {
    await DeleteDepartamentos(p);
    const { mostrarDepartamentos } = get();
    const { parametros } = get();
    set(mostrarDepartamentos(parametros));
  },

  editarDepartamentos: async (p) => {
    await EditDepartamentos(p);
    const { mostrarDepartamentos } = get();
    const { parametros } = get();
    set(mostrarDepartamentos(parametros));
  },

  dataDepartamentosyCentros: [],

  mostrarDepartamentosyCentros: async () => {
    const response = await ShowDepartamentosyCentros();
    set({ parametros: response });
    set({ dataDepartamentosyCentros: response });
    set({ item: response[0] });
    return response;
  },

  insertarDepartamentosyCentros: async (p) => {
    await InsertDepartamentosyCentros(p);
    const { mostrarDepartamentosyCentros } = get();
    const { parametros } = get();
    set(mostrarDepartamentosyCentros(parametros));
  },

  borrarDepartamentosyCentros: async (p) => {
    await DeleteDepartamentoyCentros(p);
    const { mostrarDepartamentosyCentros } = get();
    const { parametros } = get();
    set(mostrarDepartamentosyCentros(parametros));
  },

  editarDepartamentosyCentros: async (p) => {
    await EditDepartamentosyCentros(p);
    const { mostrarDepartamentosyCentros } = get();
    const { parametros } = get();
    set(mostrarDepartamentosyCentros(parametros));
  },
}));
