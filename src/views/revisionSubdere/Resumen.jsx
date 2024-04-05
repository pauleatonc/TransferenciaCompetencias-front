import { useEffect, useState } from "react";
import { useNavigate, useParams} from 'react-router-dom'; 
import { Avance } from "../../components/tables/Avance";
import { useResumenGore } from "../../hooks/fomularioGore/useResumenGore";

const ResumenFinal = () => {
  const navigate = useNavigate();
  const [ pasos, setPasos ] = useState([]);
  const { id } = useParams();
  const { resumen, loading, error, actualizarFormularioEnviado } = useResumenGore(id);

  useEffect(() =>
  {
    if (resumen)
    {
      const pasosArray = Object.keys(resumen)
        .filter(key => key.startsWith('paso'))
        .map(key => resumen[ key ]);
      setPasos(pasosArray);
    }
  }, [ resumen ]);

  const handleBackButtonClick = () =>
  {
    navigate(-1); // Navega a la página anterior
  };

  const handleEnviarClick = async () =>
  {
    try
    {
      await actualizarFormularioEnviado();
      navigate(`/home/success_formulario_gore/${id}`);
    } catch (error)
    {
      console.error("Error al enviar el formulario:", error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid">
      <div className="text-center">
        <span className="text-sans-h1">Resumen Formulario </span>
      </div>
      <div className="mb-5 me-5">
        {pasos.map((paso) => (
          <div className="container" key={paso.numero_paso}>
            <div className="row align-items-center">
              <div className="col-4 ps-5">
                <span><strong>Paso {paso.numero_paso}:</strong> {paso.nombre_paso}</span>
              </div>
              <div className="col-5 d-flex align-items-center">
                <Avance avance={paso.avance} />
              </div>
              <div className="col d-flex justify-content-center">
                {paso.completado ?
                  <img src="/check.svg" alt="Check" /> :
                  <img src="/warning.svg" alt="Warning" />}
              </div>
              <div className="col-2">
                {paso.completado ? (
                  <div className="d-flex justify-content-center">
                    <span className="text-sans-p-blue text-center">Listo</span>
                  </div>
                ) : (
                  <button
                    className="btn-secundario-s my-2"
                    onClick={() => navigate(`/home/formulario_gore/${id}/paso_${paso.numero_paso}`)}
                  >
                    Completar paso
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!resumen?.formulario_completo && (
        <div className="mb-5 mx-5 px-2">
          <span className="text-serif-h2">
            Aún no puedes enviar el formulario
          </span>
          <p className="text-sans-h6">
            Para enviar el formulario debes completar todos los campos obligatorios de cada paso.
          </p>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="px-5 mx-5 pt-3 pb-4 d-flex justify-content-between">
        <button className="btn-secundario-s" onClick={handleBackButtonClick}>
          <i className="material-symbols-rounded me-2">arrow_back_ios</i>
          Atrás
        </button>

        <button className="btn-primario-s" disabled={!resumen?.formulario_completo} onClick={handleEnviarClick}>
          <u>Enviar el formulario</u>
        </button>
      </div>
    </div>
  );
}

export default ResumenFinal