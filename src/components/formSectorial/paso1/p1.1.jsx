import { useContext, useState, useEffect } from 'react';
import CustomTextarea from "../../forms/custom_textarea";
import CustomInput from "../../forms/custom_input";
import { DocumentsAditionals } from '../../commons/documents';
import { FormularioContext } from "../../../context/FormSectorial";
export const Subpaso_uno = ({ pasoData, marcojuridico }) =>
{
  const { handleUpdatePaso, } = useContext(FormularioContext);
  const [ formaJuridica, setFormaJuridica ] = useState(pasoData?.forma_juridica_organismo);
  const [ selectedFiles, setSelectedFiles ] = useState([]);

  const handleFilesChange = (newFiles) =>
  {
    setSelectedFiles(newFiles);
  };

  useEffect(() =>
  {
    setFormaJuridica(pasoData?.forma_juridica_organismo);
  }, [ pasoData ]);


  const handleInputChange = (e) =>
  {
    setFormaJuridica(e.target.value);
  };

  const handleBlur = async () =>
  {
    console.log('handleBlur activado');
    try
    {
      const datosPaso = { ...pasoData, forma_juridica_organismo: formaJuridica };
      const archivos = {...marcojuridico};

      selectedFiles.forEach((fileData, index) =>
      {
        if (!fileData.isTooLarge)
        {
          archivos[ `marcojuridico[documento_${index}]` ] = fileData.file;
        }
      });
        console.log('Intentando enviar datos');
        await handleUpdatePaso(pasoData?.id, 1, datosPaso, archivos);
        console.log('handleUpdatePaso llamado');
    } catch (error)
    {
      alert("Error al guardar los datos: " + error.message);
    }
  };


  if (!pasoData)
  {
    return <div>Cargando datos...</div>;
  }


  return (
    <>
      <div className="pe-5 me-5 mt-4">
        <span className="my-4 text-sans-h4">1.1 Ficha de descripción organizacional</span>
        <div className="my-4">
          <CustomInput
            label="Denominación del organismo"
            placeholder="Escriba la denominación del organismo"
            id={pasoData?.denominacion_organismo}
            value={pasoData?.denominacion_organismo}
            disabled={true}
          />
        </div>
        <div className="my-4">
          <CustomTextarea
            label="Forma jurídica del organismo (Obligatorio)"
            placeholder="Debes llenar este campo para poder enviar el formulario."
            name="forma_juridica_organismo"
            value={formaJuridica}
            maxLength={500}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <div className="d-flex mb-3 mt-0 text-sans-h6-primary">
            <i className="material-symbols-rounded me-2">info</i>
            <h6 className="mt-0">Corresponde a su naturaleza jurídica: centralizado o descentralizado, concentrado o desconcentrado.</h6>
          </div>
        </div>
        <div className="container-fluid pb-3">
          <DocumentsAditionals onFilesChanged={handleFilesChange} />
        </div>
        <div className="my-4">
          <CustomTextarea
            label="Forma jurídica del organismo (Obligatorio)"
            placeholder="Debes llenar este campo para poder enviar el formulario."
            name="forma_juridica_organismo"
            value={pasoData.forma_juridica_organismo}
            maxLength={500}
          />

        </div>
        <div className="my-4">
          <CustomTextarea
            label="Misión Institucional (Obligatorio)"
            placeholder="Misión que defina el propósito de ser del organismo"
            name="mision_institucional"
            value={pasoData.mision_institucional}
            maxLength={500}
          />
        </div>
        <div className="my-4">
          <CustomTextarea
            label="Información adicional (Opcional)"
            placeholder="Escribe información adicional de ser necesario"
            id={pasoData.informacion_adicional_marco_juridico}
            maxLength={500}
          />
          <div className="d-flex mb-3 mt-1 text-sans-h6-primary">
            <i className="material-symbols-rounded me-2">info</i>
            <h6 className="mt-1">Llenar en caso de existir información que no sea posible clasificar en alguna de las categorías anteriores y que responda a particularidades propias del organismos.</h6>
          </div>
        </div>
      </div>
    </>
  )
}
