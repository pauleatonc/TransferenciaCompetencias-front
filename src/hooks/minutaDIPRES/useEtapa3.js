import { useCallback, useState } from "react";
import { apiTransferenciaCompentencia } from "../../services/transferenciaCompetencia";

export const useEtapa3 = () => {
  const [loadingPatch, setLoadingPatch] = useState(false);
  const [errorPatch, setErrorPatch] = useState(null);
  const [archivoSubido, setArchivoSubido] = useState(false);

  const patchCompetenciaOmitida = useCallback(async (competenciaId, omitidaValue) => {
    setLoadingPatch(true);
    try {
      const data = {
        omitida: omitidaValue,
      };
      const response = await apiTransferenciaCompentencia.patch(`/etapa3/${competenciaId}/`, data);
      console.log("PATCH response:", response.data);
    } catch (error) {
      console.error("Error en el PATCH:", error);
      setErrorPatch(error);
    } finally {
      setLoadingPatch(false);
    }
  }, []);

  const patchArchivoMinuta = useCallback(async (competenciaId, file) => {
    setLoadingPatch(true);
    try {
      const formData = new FormData();
      formData.append('archivo_minuta_etapa3', file);
      const response = await apiTransferenciaCompentencia.patch(`/etapa3/${competenciaId}/`, formData);

      console.log("Archivo subido:", response.data);
      setArchivoSubido(true);
      await apiTransferenciaCompentencia.patch(`/etapa3/${competenciaId}/`, { estado: "Finalizada" });

    } catch (error) {
      console.error("Error al subir el archivo:", error);
      setErrorPatch(error);
    } finally {
      setLoadingPatch(false); 
    }
  }, []);

  return { patchCompetenciaOmitida, patchArchivoMinuta, archivoSubido, loadingPatch, errorPatch };
};