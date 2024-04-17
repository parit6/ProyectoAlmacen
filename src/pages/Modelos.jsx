import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/molecules/index";
import { ModelosTemplate } from "../components/templates/index";
import { useMarcasStore, useModelosStore, useTiposStore } from "../store/index";

// Page para mostrar los modelos, funcionamiento especifico en la page de bitacora

export function Modelos() {
  const { mostrarModelos, dataModelos } = useModelosStore();
  const { dataMarcas, showMarcas } = useMarcasStore();
  const { showTipos } = useTiposStore();

  useQuery({
    queryKey: ["data de marcas"],
    queryFn: () => showMarcas(),
  });

  useQuery({
    queryKey: ["data de tipos"],
    queryFn: () => showTipos(),
  });

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar Modelos"],
    queryFn: () => mostrarModelos(),
    enabled: !!dataMarcas?.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <div>Error al cargar los datos</div>;
  }

  return <ModelosTemplate data={dataModelos} />; // Pasa los datos de las marcas y los tipos a ModelosTemplate
}
