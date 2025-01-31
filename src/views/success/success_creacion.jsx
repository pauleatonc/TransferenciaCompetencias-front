import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import successIcon from '../../static/icons/success.svg';

const SuccessCreacion = () => {
  const history = useNavigate();
  const location = useLocation();
  const origen = location.state?.origen;

  const handleButtonClick = () => {
      // Realizar la navegación condicional según la procedencia del usuario
      switch (origen) {
        case "crear_usuario":
          history('/home/administrar_usuarios');
          break;
        case "crear_competencia":
          history('/home/listado_competencias');
          break;
        default:
          history('/home');
      }
  };
  
  let titulo = "";
  let subtitulo = "";
  let tituloRecuadro = "";
  let nombreBoton = "";
  if (origen === "crear_usuario") {
    titulo = "Administrar Usuarios";
    subtitulo = "Crear Usuario";
    tituloRecuadro = "Creaste un usuario con éxito";
    nombreBoton = "Volver a Administrar Usuarios";
  } else if (origen === "crear_competencia") {
    titulo = "Administrar Competencias";
    subtitulo = "Crear Competencia";
    tituloRecuadro = "Creaste una competencia con éxito";
    nombreBoton = "Volver a Listado de Competencias";
  } else {
    titulo = "Exito!";
    subtitulo = "Plataforma Transferencia de Competencias";
    tituloRecuadro = "Esta es la vista de success";
  }

  return (
    <div className="container ps-5 ms-5">
      <h2 className="text-sans-h2 mt-3">{titulo}</h2>
      <h3 className="text-sans-h3 mt-3 mb-5">{subtitulo}</h3>
  
      <div className="success-container col-7 p-3 px-5">
        <div className="row align-items-center">
          <div className="col-3">
            <img src={successIcon} alt="Éxito"/>
          </div>
          <div className="col-9">
            <h2 className="text-sans-h2 mb-4">{tituloRecuadro}</h2>
            <p className="text-sans-p">Descripción detallada del éxito de la operación realizada.</p>
          </div>
        </div>  
      </div>

      <div className="col-10 d-flex justify-content-center mt-5">
        <button className="btn-secundario-s" onClick={handleButtonClick}>
          <p className="mb-0 text-decoration-underline">{nombreBoton}</p>
        </button>
      </div>
    </div>   
  );
}
    
export default SuccessCreacion ;
