import { useState, useEffect } from "react";

const RadioButtons = ({ initialState, handleEstadoChange, errors }) => {
    const [activeButton, setActiveButton] = useState(initialState);
    console.log("activeButton en compo radio button". activeButton);
  
    // Efecto para actualizar el estado interno cuando cambia la propiedad initialState
    useEffect(() => {
      setActiveButton(initialState);
    }, [initialState]);
  
    return (
      <div className="mb-5">
        
          <>
            <h5 className="text-sans-h5">Estado</h5>
            <div className="d-flex mb-2">
              <button
              type="button"
              className={` ${activeButton === 'activo' ? 'btn-primario-s' : 'btn-secundario-s'}`}
              onClick={() => {
                handleEstadoChange('estado', 'activo'); 
                setActiveButton('activo');
              }}
              >
                <p className="mb-0 text-decoration-underline">Activo</p>
                {activeButton === 'activo' && <i className="material-symbols-rounded ms-2">check</i>}
              </button>
              <button
              type="button"
              className={`ms-2 ${activeButton === 'inactivo' ? 'btn-primario-s' : 'btn-secundario-s'}`}
              onClick={() => {
                handleEstadoChange('estado', 'inactivo'); 
                setActiveButton('inactivo');
              }}
              >
                <p className="mb-0 text-decoration-underline">Inactivo</p>
                {activeButton === 'inactivo' && <i className="material-symbols-rounded ms-2">check</i>}
              </button>
            </div>
          </>
        
        {errors.estado && <p className="text-sans-h6-darkred mt-2 mb-0">{errors.estado.message}</p>}
      </div>
    );
  };
  
  export default RadioButtons;