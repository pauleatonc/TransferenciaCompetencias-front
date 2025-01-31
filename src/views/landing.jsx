import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const Landing = () => {
  const { loginWithKeycloak } = useLogin();

  return (
    <>
      <div className="container">
        <div className="container d-flex flex-column my-4">
          <p className="text-serif-h1 text-center my-4">Plataforma de Gestión de <br /> Transferencia de Competencias</p>
          <div className="container line my-2">
            <div className="blue" />
            <div className="red" />
          </div>
        </div>
        <div className="container d-flex flex-column my-4">
          <div className="text-center text-sans-h3 mt-3 mb-4">Ingresa con tu ClaveÚnica</div>
          <div className="d-flex justify-content-center my-4">
            <Link className="btn-clave-unica" to="/login">
              <img className="icono-xs" src="/logo_clave_unica.svg" alt="CalveUnica" />
              <p className="mb-0 ms-2 text-decoration-underline">Iniciar sesión</p>
            </Link>
          </div>
          <div className="text-center text-sans-p mb-4 mx-5 px-5">Profundicemos la descentralización entregando más poder, competencias y capacidades a las regiones,<br/> para que sean éstas quienes lideren los procesos que les son propios, sumando talentos, proyectos,<br/> instituciones y recursos.</div>
        </div>
      </div>
    </>
  );
}

export default Landing;