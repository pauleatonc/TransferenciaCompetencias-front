import { useNavigate } from 'react-router-dom';
import successIcon from '../../static/icons/success.svg';

export const SuccessMinutaDipres = ({ idCompetencia }) => {
  const history = useNavigate();

  const handleBackButtonClick = () => {
    history(`/home/estado_competencia/${idCompetencia}`);
  };

  return (
    <div className="container view-container ms-5">

      <div className="success-container col-7 p-3 px-5 mt-5">
        <div className="row align-items-center">
          <div className="col-3">
            <img src={successIcon} />
          </div>
          <div className="col-9">
            <h2 className="text-sans-h2 mb-4">Enviaste la Minuta DIPRES con éxito</h2>
            {/* FALTA MENSAJE SUCCESS ENVIO MINUTA DIPRESS */}
            <p className="text-sans-p"> </p>
          </div>
        </div>
      </div>

      <div className="col-10 d-flex justify-content-center mt-5">
        <button className="btn-secundario-s" onClick={handleBackButtonClick}>
          <i className="material-symbols-rounded me-2">home</i>
          <p className="mb-0 text-decoration-underline">Volver al estado de compentencia</p>
        </button>
      </div>
    </div>
  );
}
