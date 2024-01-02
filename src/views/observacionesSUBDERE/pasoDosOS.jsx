import { useContext, useEffect } from 'react';
import { FormularioContext } from '../../context/FormSectorial';
import { Avance } from "../../components/tables/Avance";
import { ButtonsNavigate } from "../../components/layout/ButtonsNavigate";
import { Subpaso_dosPuntoUno } from "../../components/formSectorial/paso2/p2.1";
import { Subpaso_dosPuntoDos } from "../../components/formSectorial/paso2/p2.2";
import { Subpaso_dosPuntoTres } from "../../components/formSectorial/paso2/p2.3";
import { Subpaso_dosPuntoCuatro } from "../../components/formSectorial/paso2/p2.4";
import { Subpaso_dosPuntoCinco } from "../../components/formSectorial/paso2/p2.5";
import { MonoStepers } from "../../components/stepers/MonoStepers";

const PasoDosOS = () =>
{
  const { pasoData, loadingPaso, errorPaso, updateStepNumber ,data} = useContext(FormularioContext);
  const stepNumber = 2;

  useEffect(() =>
  {
    updateStepNumber(stepNumber);
  }, [ updateStepNumber, stepNumber ]);

  if (loadingPaso) return <div>Cargando...</div>;
  if (errorPaso) return <div>Error: {errorPaso.message || "Error desconocido"}</div>;
  if (!pasoData) return <div>No hay datos disponibles para el Paso 2</div>;

  // Asegúrate de acceder al primer elemento del array 'paso2'
  const paso2 = pasoData.paso2 && pasoData.paso2.length > 0 ? pasoData.paso2[ 0 ] : null;

  if (!paso2) return <div>No hay información de paso2 disponible</div>;

  const dataOrganismosIntervinientes = pasoData.p_2_1_organismos_intervinientes;
  const dataUnidadesIntervinientes = pasoData.p_2_2_unidades_intervinientes;
  const dataEtapasEjercicioCompetencia = pasoData.p_2_3_etapas_ejercicio_competencia;
  const dataPlataformasYSoftwares = pasoData.p_2_4_plataformas_y_softwares;
  const dataFlujogramaCompetencia = pasoData.p_2_5_flujograma_competencia;

  return (
    <>
      <div className="col-1">
        <MonoStepers stepNumber={paso2.numero_paso} />
      </div>
      <div className="col-11">
        <div className="container vh-100">
          <div className="d-flex">
            <h3 className="mt-3">{paso2.nombre_paso}</h3>
            <Avance avance={paso2.avance} />
          </div>
          <span className="text-sans-h6-primary">Texto de apoyo</span>

          <div className="container-fluid me-5 pe-5 my-5">
            <Subpaso_dosPuntoUno data={dataOrganismosIntervinientes} />
          </div>
          <div className="container-fluid me-5 pe-5 my-5">
            <Subpaso_dosPuntoDos data={dataUnidadesIntervinientes} />
          </div>
          <div className="container-fluid me-5 pe-5 my-5">
            <Subpaso_dosPuntoTres data={dataEtapasEjercicioCompetencia} />
          </div>
          <div className="container-fluid me-5 pe-5 my-5">
            <Subpaso_dosPuntoCuatro data={dataPlataformasYSoftwares} />
          </div>
          <div className="container-fluid me-5 pe-5 my-5">
            <Subpaso_dosPuntoCinco data={dataFlujogramaCompetencia} />
          </div>

          {/*Botones navegacion  */}
          <div className="container me-5 pe-5">
            <ButtonsNavigate step={paso2.numero_paso} id={data.id} />
          </div>
        </div>
      </div>
    </>
  )
};

export default PasoDosOS;