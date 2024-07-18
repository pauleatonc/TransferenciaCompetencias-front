import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCompetencia } from "../../hooks/competencias/useCompetencias";
import { SubirArchivo } from "../../components/commons/subirArchivo";
import CustomTextarea from "../../components/forms/custom_textarea";
import { useEtapa5 } from "../../hooks/minutaDIPRES/useEtapa5";
import { SuccessOSminutaDIPRES } from "../../components/success/OSminutaDipres";
import { EncabezadoFormularios } from "../../components/layout/EncabezadoFormularios";

const ObservacionesSubdereGore = () =>
{
  const { id } = useParams();
  const { competenciaDetails } = useCompetencia(id);
  const { patchComentarioMinuta, loadingPatch } = useEtapa5();
  const [ observacionMinutaDipres, setObservacionMinutaDipres ] = useState("");
  const [ isSubmitSuccessful, setIsSubmitSuccessful ] = useState(false);
  const navigate = useNavigate();
  const observacionesEnviadas = competenciaDetails?.etapa5?.observacion_minuta_gore_enviada;
  const idEtapa = competenciaDetails?.etapa5?.id
  const adicionalGore = competenciaDetails?.etapa4?.formularios_gore[ 0 ]


  console.log(observacionesEnviadas)

  useEffect(() =>
  {
    // Verificar si las observaciones ya han sido enviadas
    if (competenciaDetails?.etapa5?.observacion_minuta_gore_enviada)
    {
      // Establecer las observaciones existentes como estado inicial
      setObservacionMinutaDipres(competenciaDetails?.etapa5?.comentario_minuta_etapa5);
    }
  }, [ competenciaDetails ]);

  const handleBackButtonClick = () =>
  {
    navigate(-1);
  };


  const handleCerrarEtapa = async () =>
  {
    await patchComentarioMinuta(idEtapa, observacionMinutaDipres);
    setIsSubmitSuccessful(true);
  }

  const handleVerFormulario = (formularioId) =>
  {
    navigate(`/home/formulario_gore/${formularioId}/paso_1`);
  };

  return (
    <div className="container col-10 col-xxl-11">
      <div className="py-3 d-flex">
        <div className="align-self-center">
          <button className="btn-secundario-s" onClick={handleBackButtonClick}>
            <i className="material-symbols-rounded me-2">arrow_back_ios</i>
            <p className="mb-0 text-decoration-underline">Volver</p>
          </button>
        </div>
        <nav className="container mx-5" aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style d-flex my-2">
            <li className="breadcrumb-item align-self-center"><Link to="/home">Inicio</Link></li>
            <li className="breadcrumb-item align-self-center"><Link to={`/home/estado_competencia/${id}`}>Estado de la Competencia: {competenciaDetails?.nombre} </Link></li>
            <li className="breadcrumb-item align-self-center text-sans-p-lightgrey" aria-current="page">Observaciones SUBDERE</li>
          </ol>
        </nav>
      </div>

      <div className="border-bottom pb-3">
        <h1 className="text-sans-Title ">Observaciones SUBDERE</h1>
        <h2 className="text-sans-h1 mt-2 mb-0">Formularios GORE y Minuta DIPRES</h2>
        <EncabezadoFormularios id={id} />
      </div>

      {!isSubmitSuccessful ? (
        <>
          {/* FORMULARIOS GORE */}
          <div className="border-bottom pb-3">
            <h2 className="text-sans-25 mt-4 mb-4">Formularios GORE</h2>
            {competenciaDetails?.etapa4?.formularios_gore ? (
              Array.isArray(competenciaDetails.etapa4.formularios_gore) ? (
                competenciaDetails.etapa4.formularios_gore.map((formulario, index) => (
                  <tr
                    className={`d-flex justify-content-between p-3 align-items-center ${index % 2 === 0 ? 'neutral-line' : 'white-line'}`}
                    key={formulario.id}
                  >
                    <td>{formulario.nombre.replace('Completar formulario GORE - ', '')}</td>
                    <td className="">
                      <button className="btn-secundario-s text-decoration-underline" onClick={() => handleVerFormulario(formulario.id)}>
                        Subir Observaciones
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                competenciaDetails.etapa4.formularios_gore.detalle_formularios_gore.map((formulario, index) => (
                  <tr
                    className={`d-flex justify-content-between p-3 align-items-center ${index % 2 === 0 ? 'neutral-line' : 'white-line'}`}
                    key={formulario.id}
                  >
                    <td>{formulario.nombre.replace('Completar formulario GORE - ', '')}</td>
                    <td className="">
                      <button className="btn-secundario-s text-decoration-underline" onClick={() => handleVerFormulario(formulario.id)}>
                        {formulario.accion}
                      </button>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <p>No hay formularios disponibles.</p>
            )}
          </div>

          {/* MINUTA DIPRES */}
          <div className="mt-4 border-bottom">
            <h2 className="text-sans-25 mt-4 mb-4">Minuta DIPRES</h2>
            <SubirArchivo
              readOnly={true}
              archivoDescargaUrl={competenciaDetails?.etapa5?.archivo_minuta_etapa5}
              tituloDocumento="Minuta DIPRES"
            />

            <div className="my-4">
              <CustomTextarea
                label="Observaciones (Opcional)"
                placeholder="Escribe tus observaciones de este paso del formulario"
                rows={6}
                maxLength={500}
                value={observacionMinutaDipres}
                onChange={(e) => setObservacionMinutaDipres(e.target.value)}
                readOnly={observacionesEnviadas}
                loading={loadingPatch}
              />
            </div>
          </div>

          {/* DOCUMENTOS ANTECEDENTES ADICIONALES GORE:
        aqui el usuario SUBDERE envia sus AA sobre cada Region de la competencia
        pendiente conecciones PATCH con el backend*/}
          <div className="my-4">
            <p className="text-sans-h4 mt-5">Antecedentes Adicionales de sector</p>
            {adicionalGore && (
              <div key={adicionalGore.region_id}>
                <p>{adicionalGore.nombre.replace('Completar formulario GORE - ', '')}</p>
                <div>
                  <div className="d-flex justify-content-between py-3 fw-bold">
                    <div className="d-flex mb-2">
                      <div className="ms-4">#</div>
                      <div className="ms-5">Documento</div>
                    </div>
                    <div className="me-5">Acción</div>
                  </div>
                </div>
                <SubirArchivo
                  readOnly={true}
                  tituloDocumento={adicionalGore.antecedente_adicional_gore}
                  archivoDescargaUrl={adicionalGore.antecedente_adicional_gore}
                />
                <div className="my-4">
                  <CustomTextarea
                    label="Descripción del archivo adjunto (Opcional)"
                    placeholder="Describe el archivo adjunto"
                    value={adicionalGore.descripcion_antecedente}
                    readOnly={true}
                  />
                </div>
              </div>
            )}
          </div>

          {!observacionesEnviadas && (
            <div className="mb-4">
              {!observacionesEnviadas ? (
                <>
                  <h2 className="text-sans-h2">Debes revisar todos los formularios y escribir observaciones para DIPRES antes de terminar la etapa</h2>
                  <p className="text-sans-p">Para poder terminar la etapa debes revisar todos los formularios y dejar observaciones donde consideres necesario.</p>
                </>
              ) : (
                <>
                  <h2 className="text-sans-h2">Esta todo listo para que termines la etapa</h2>
                  <p className="text-sans-p">Ya revisaste todos los formularios. </p>
                </>
              )}
            </div>
          )}
            <div className="d-flex justify-content-end my-5">
              <button className="btn-primario-s" disabled={observacionesEnviadas} onClick={handleCerrarEtapa}>
                <p className="mb-0 text-decoration-underline">Cerrar etapa</p>
                <i className="material-symbols-rounded ms-2">arrow_forward_ios</i>
              </button>
            </div>
        </>
      ) : (
        <SuccessOSminutaDIPRES
          idCompetencia={competenciaDetails?.id}
          mensaje="Dependiendo de la decisión que hayas tomado sobre la siguiente etapa, el usuario correspondiente será notificado para comenzar con la etapa que le corresponda."
        />
      )}

    </div>
  )
};

export default ObservacionesSubdereGore;