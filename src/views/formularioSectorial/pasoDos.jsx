import { Avance } from "../../components/tables/Avance";
import { ButtonsNavigate } from "../../components/layout/ButtonsNavigate";
const pasoDos = () => {
  return (
  <div className="container vh-100">
  <div className="d-flex">
  <h3 className="mt-3">Arquitectura del Proceso</h3>
  <Avance/>
  </div>
  <span className="text-sans-h6-primary">Texto de apoyo</span>
  {/*Botones navegacion  */}
  <div className="container me-5 pe-5">
          <ButtonsNavigate step="" id=""/>
      </div>
</div> 
  )
}

export default pasoDos