import { useState, useEffect } from "react";
import { BtnOrganigrama } from "../commons/btnOrganigrama";

export const SubirArchivo = ({ index,  readOnly,tituloDocumento,  archivoDescargaUrl, handleFileSelect, fieldName, handleDeleteFile }) => {

  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (tituloDocumento) {
      const parts = tituloDocumento.split('/');
      let name = parts.pop() || tituloDocumento;
      
      // Remove any query parameters or additional text after ".pdf"
      const pdfIndex = name.indexOf('.pdf');
      if (pdfIndex !== -1) {
        name = name.substring(0, pdfIndex + 4); // "+4" to include ".pdf"
      }

      setFileName(name);
      setFileUploaded(true);
    } else {
      setFileUploaded(false);
    }
  }, [tituloDocumento]);

  const displayFileType = fileUploaded ? "Archivo guardado" : "No seleccionado";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Solo se permiten archivos PDF.");
        return;
      }
      if (file.size > 20971520) {
        setError("El archivo no debe superar los 20 MB.");
        return;
      }
      setError('');
      setFileName(file.name);
      setFileUploaded(true);
      handleFileSelect(file, fieldName);
    }
  };

  const handleDelete = () => {
    setFileUploaded(false);
    setFileName('');
    setError('');
    handleFileSelect('', fieldName);
    handleDeleteFile();
  };

  const handleDownload = () => {
    if (archivoDescargaUrl) {
      window.open(archivoDescargaUrl, '_blank');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-2 neutral-line align-items-center">
        <div className="d-flex mb-2">
          <div className="p-3">{index}</div>
          {fileName && (
            <div className="py-3 text-wrap ms-4">{fileName}</div>
          )}
          {!readOnly && (
            <div className="py-3 px-2">{error ? <div className="text-sans-p-bold-darkred">{error}</div> : displayFileType}</div>
          )}
        </div>
        <div>
          {!readOnly ? (
            <div className="col p-3 d-flex">
              <BtnOrganigrama onFileChange={handleFileChange} fileUploaded={fileUploaded} />
              {fileUploaded && (
                <>
                  <button onClick={handleDelete} className="btn-terciario-ghost px-2 d-flex align-items-center mx-1">
                    <span className="text-sans-b-red">Borrar</span>
                    <i className="material-symbols-rounded">delete</i>
                  </button>
                </>
              )}
            </div>
          ) : archivoDescargaUrl && (
            <button onClick={handleDownload} className="btn-secundario-s px-2 d-flex align-items-center m-3">
              <span className="text-sans-b-green text-decoration-underline mx-1">Descargar</span>
              <i className="material-symbols-rounded ms-2">download</i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
