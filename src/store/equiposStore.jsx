import { create } from "zustand";
import {
  CountCelularesBodegaPar,
  CountCelularesComunes,
  CountCelularesGhp,
  CountCelularesImx,
  CountCelularesLm,
  CountCelularesMB,
  CountEquiposBodega,
  CountEquiposComunes,
  CountEquiposGhp,
  CountEquiposImx,
  CountEquiposLm,
  CountEquiposMB,
  CountMonitoresBodega,
  CountMonitoresComunes,
  CountMonitoresGhp,
  CountMonitoresImx,
  CountMonitoresLm,
  CountMonitoresMb,
  DeleteEquipos,
  EditEquipos,
  InsertEquipos,
  ShowEquipos,
  ShowEquiposComunes,
  ShowMonitores,
} from "../supabase/index";

export const useEquiposStore = create((set, get) => ({
  // Estado para almacenar los datos de los equipos
  equiposData: [],
  equiposCount: [],

  // Función para obtener los datos de los equipos
  showEquipos: async () => {
    const response = await ShowEquipos(); // Llamada a la función ShowEquipos
    set({ equiposData: response }); // Almacenar los datos obtenidos en el estado
    return response; // Devolver los datos obtenidos
  },

  // Estado para almacenar los datos de los equipos, el item seleccionado y los parámetros
  dataEquipos: [],
  item: [],
  parametros: {},

  // Función para mostrar los equipos
  mostrarEquipos: async (p) => {
    const response = await ShowEquipos(p); // Llamada a la función ShowEquipos con parámetro p
    set({ parametros: response }); // Almacenar los datos obtenidos en el estado
    set({ dataEquipos: response }); // Almacenar los datos obtenidos en el estado
    set({ item: response[0] }); // Almacenar el primer elemento de los datos obtenidos en el estado
    return response; // Devolver los datos obtenidos
  },

  // Función para seleccionar un equipo
  selectEquipos: (p) => {
    set({ item: p }); // Almacenar el parámetro p en el estado
  },

  // Función para insertar un equipo
  insertarEquipos: async (p) => {
    await InsertEquipos(p); // Llamada a la función InsertEquipos con parámetro p
    const { mostrarEquipos } = get(); // Obtener la función mostrarEquipos del estado
    const { parametros } = get(); // Obtener los parámetros del estado
    set(mostrarEquipos(parametros)); // Actualizar el estado con los nuevos datos de los equipos
  },

  // Función para borrar un equipo
  borrarEquipos: async (p) => {
    await DeleteEquipos(p); // Llamada a la función DeleteEquipos con parámetro p
    const { mostrarEquipos } = get(); // Obtener la función mostrarEquipos del estado
    const { parametros } = get(); // Obtener los parámetros del estado
    set(mostrarEquipos(parametros)); // Actualizar el estado con los nuevos datos de los equipos
  },

  // Función para editar un equipo
  editEquipos: async (p) => {
    await EditEquipos(p); // Llamada a la función EditEquipos con parámetro p
    const { mostrarEquipos } = get(); // Obtener la función mostrarEquipos del estado
    const { parametros } = get(); // Obtener los parámetros del estado
    set(mostrarEquipos(parametros)); // Actualizar el estado con los nuevos datos de los equipos
  },

  // Estado para almacenar los datos de los equipos sin monitor
  dataSinMonitor: [],

  // Función para obtener los datos de los equipos sin monitor
  showEquiposComunes: async () => {
    const response = await ShowEquiposComunes(); // Llamada a la función ShowEquiposComunes
    set({ dataSinMonitor: response }); // Almacenar los datos obtenidos en el estado
    return response; // Devolver los datos obtenidos
  },

  // Estado para almacenar los datos de los monitores
  dataMonitores: [],

  // Función para obtener los datos de los monitores
  showMonitores: async () => {
    const response = await ShowMonitores(); // Llamada a la función ShowMonitores
    set({ dataMonitores: response }); // Almacenar los datos obtenidos en el estado
    return response; // Devolver los datos obtenidos
  },

  // Estado para almacenar el conteo de equipos comunes
  countComunesData: [],

  // Función para obtener el conteo de equipos comunes
  countComunes: async () => {
    const response = await CountEquiposComunes(); // Llamada a la función CountEquiposComunes
    set({ countComunesData: response }); // Almacenar los datos obtenidos en el estado
    return response; // Devolver los datos obtenidos
  },
  countmbData: [],

  countMB: async () => {
    const response = await CountEquiposMB();
    set({ countmbData: response });
    return response;
  },

  countlmData: [],

  countLm: async () => {
    const response = await CountEquiposLm();
    set({ countlmData: response });
    return response;
  },

  countimxData: [],
  countImx: async () => {
    const response = await CountEquiposImx();
    set({ countimxData: response });
    return response;
  },

  countghpData: [],
  countGhp: async () => {
    const response = await CountEquiposGhp();
    set({ countghpData: response });
    return response;
  },

  countbodegaComunesData: [],

  countBodegaComunes: async () => {
    const response = await CountEquiposBodega();
    set({ countbodegaComunesData: response });
    return response;
  },

  countMonitorLmData: [],

  countMonitorLm: async () => {
    const response = await CountMonitoresLm();
    set({ countMonitorLmData: response });
    return response;
  },

  countMonitorGhpData: [],
  countMonitorGhp: async () => {
    const response = await CountMonitoresGhp();
    set({ countMonitorGhpData: response });
    return response;
  },

  countMonitorClubData: [],
  countMonitorClub: async () => {
    const response = await CountMonitoresImx();
    set({ countMonitorClubData: response });
    return response;
  },

  countMonitorBodegaData: [],
  countMonitorBodega: async () => {
    const response = await CountMonitoresBodega();
    set({ countMonitorBodegaData: response });
    return response;
  },

  countMonitorMbData: [],
  countMonitorMb: async () => {
    const response = await CountMonitoresMb();
    set({ countMonitorMbData: response });
    return response;
  },

  countMonitorComunesData: [],
  countMonitorComunes: async () => {
    const response = await CountMonitoresComunes();
    set({ countMonitorComunesData: response });
    return response;
  },

  countCelularesParData: [],
  countCelularesPar: async () => {
    const response = await CountCelularesComunes();
    set({ countCelularesParData: response });
    return response;
  },

  countCelularesMbData: [],
  countCelularesMb: async () => {
    const response = await CountCelularesMB();
    set({ countCelularesMbData: response });
    return response;
  },

  countCelularesParBodegaData: [],
  countCelularesParBodega: async () => {
    const response = await CountCelularesBodegaPar();
    set({ countCelularesParBodegaData: response });
    return response;
  },

  countCelularesImxData: [],
  countCelularesImx: async () => {
    const response = await CountCelularesImx();
    set({ countCelularesImxData: response });
    return response;
  },

  countCelularesGhpData: [],
  countCelularesGrandes: async () => {
    const response = await CountCelularesGhp();
    set({ countCelularesGhpData: response });
    return response;
  },

  countCelularesLmData: [],
  countCelularesLm: async () => {
    const response = await CountCelularesLm();
    set({ countCelularesLmData: response });
    return response;
  },
}));
