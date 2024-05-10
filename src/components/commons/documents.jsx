import { useState, useEffect } from 'react';

export const DocumentsAditionals = ({ onFilesChanged, marcoJuridicoData, handleDelete, readOnly }) =>
{
  const [ files, setFiles ] = useState([]);
  const maxFiles = 5; // Máximo número de archivos permitidos
  const maxSize = 20 * 1024 * 1024; // 20 MB
  const [ maxFilesReached, setMaxFilesReached ] = useState(false);
  const [ fileTooLarge, setFileTooLarge ] = useState(false); // Estado para manejar si el archivo es demasiado grande
  const [ errorMessage, setErrorMessage ] = useState(""); // Mensaje de error para tipo de archivo

  useEffect(() =>
  {
    if (marcoJuridicoData && marcoJuridicoData.length > 0)
    {
      const updatedFiles = marcoJuridicoData.map((doc) =>
      {
        if (doc && doc.documento)
        {
          return {
            id: doc.id,
            title: doc.documento.split('/').pop(),
            url: doc.documento, // Usando la URL completa del campo `documento`
            isTooLarge: false,
          };
        }
        return null;
      }).filter((doc) => doc !== null);

      setFiles(updatedFiles);
      setMaxFilesReached(updatedFiles.length >= maxFiles);
    } else
    {
      setFiles([]);
      setMaxFilesReached(false);
    }
  }, [ marcoJuridicoData, maxFiles ]);

  const handleFileChange = async (event) =>
  {
    setFileTooLarge(false);
    setErrorMessage("");
    const incomingFiles = Array.from(event.target.files);
    const filesExceedingMaxSize = incomingFiles.filter((file) => file.size > maxSize);

    if (filesExceedingMaxSize.length > 0)
    {
      setFileTooLarge(true);
      return; // Podrías decidir no retornar aquí para permitir la carga de archivos válidos en el mismo lote
    }

    // Agregar verificación de tipo de archivo
    const filesNotPdf = incomingFiles.filter((file) => !file.type.includes('pdf'));
    if (filesNotPdf.length > 0)
    {
      setFileTooLarge(false); // Restablecer el estado de fileTooLarge en caso de que se haya establecido previamente
      setErrorMessage("Por favor, seleccione archivos en formato PDF.");
      return;
    }

    const validFiles = incomingFiles.filter((file) => file.size <= maxSize);
    if (validFiles.length === 0)
    {
      return;
    }

    const availableSlots = maxFiles - files.length;
    if (availableSlots <= 0)
    {
      setMaxFilesReached(true);
      return;
    }

    const filesToUpload = validFiles.slice(0, availableSlots);
    for (const file of filesToUpload)
    {
      await onFilesChanged(file);
    }

    document.getElementById('fileInput').value = ''; // Resetear el input de archivo

    if ((files.length + filesToUpload.length) >= maxFiles)
    {
      setMaxFilesReached(true);
    }
  };

  const handleDeleteDoc = (index) =>
  {
    const documentoId = files[ index ].id;
    handleDelete(documentoId);
    setFiles((currentFiles) =>
    {
      const updatedFiles = currentFiles.filter((_, fileIndex) => fileIndex !== index);
      setMaxFilesReached(updatedFiles.length >= maxFiles);
      return updatedFiles;
    });
  };

  const handleDownloadDoc = (url) =>
  {
    window.open(url, '_blank'); // Abre la URL en una nueva pestaña
  };

  return (
    <>
      {readOnly ? (
        files.map((fileObj, index) => (
          <div key={index} className={`row align-items-center me-5 pe-5 col-11 mt-2 ${index % 2 === 0 ? 'neutral-line' : 'white-line'}`}>
            <div className="col-1 p-3">{index + 1}</div>
            <div className="col p-3">{fileObj.title}</div>
            <div className="col p-3"></div>
            <div className="col-2 p-3 d-flex">
              <button
                type="button"
                onClick={() => handleDownloadDoc(fileObj.url)}
                className="btn-secundario-s px-0 d-flex align-items-center mx-0"
              >
                <span className="text-sans-b-green mx-2">Descargar</span>
                <i className="material-symbols-rounded mx-2">download</i>
              </button>
            </div>
          </div>
        ))
      ) : (
        <>
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileChange}
            id="fileInput"
            style={{ display: 'none' }}
          />
          {!maxFilesReached && (
            <button className="btn-secundario-s d-flex" onClick={() => document.getElementById('fileInput').click()}>
              <i className="material-symbols-outlined">upgrade</i>
              <u className="align-self-center text-sans-b-white">Subir Archivo</u>
            </button>
          )}
          {fileTooLarge && (
            <h6 className="text-sans-p-bold-darkred my-2">
              El archivo no debe superar los 20 MB.
            </h6>
          )}
          {files.map((fileObj, index) => (
            <div key={index} className={`row align-items-center me-5 pe-5 col-11 mt-2 ${index % 2 === 0 ? 'neutral-line' : 'white-line'}`}>
              <div className="col-1 p-3">{index + 1}</div>
              <div className="col p-3">{fileObj.title}</div>
              <div className="col p-3"></div>
              <div className="col-2 p-3 d-flex">
                <button
                  type="button"
                  onClick={() => handleDownloadDoc(fileObj.url)}
                  className="btn-secundario-s px-0 d-flex align-items-center mx-0"
                >
                  <span className="text-sans-b-green mx-2">Descargar</span>
                  <i className="material-symbols-rounded mx-2">download</i>
                </button>
              </div>
            </div>
          ))}
          {maxFilesReached && (
            <h6 className="text-sans-h6-primary">
              Alcanzaste el número máximo de archivos permitidos ({maxFiles} archivos).
            </h6>
          )}
          {errorMessage && (
            <h6 className="text-sans-p-bold-darkred my-2">
              {errorMessage}
            </h6>
          )}
        </>
      )}
    </>
  );
};
