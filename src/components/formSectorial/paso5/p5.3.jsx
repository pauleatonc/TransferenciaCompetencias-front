import CustomTextarea from "../../forms/custom_textarea";

const Subpaso_CincoPuntoTres = () => {
  return (
    <div className="my-4">
      <h4 className="text-sans-h4">5.3 Cálculo de personal asociado al ejercicio de la competencia</h4>
      <h6 className="text-sans-h6-primary mt-3">El objetivo de este apartado es cuantificar el personal necesario para realizar los procedimientos y tareas identificadas en el paso 2, Arquitectura de Procesos.</h6>

      <p className="text-sans-m-semibold mt-4">a. Personal que ejerce directamente la competencia</p>
      <h6 className="text-sans-h6-primary mt-3">Por ejercicio directo se entenderán todas aquellas tareas y procedimientos específicos y exclusivos de la competencia. En la renta bruta se deben considerar aquellas asignaciones propias del cargo. </h6>

      <div>COMPONENTE PERSONAL - DIRECTO</div>

      <div className="mt-3">
        <CustomTextarea 
        label="Descripción de funciones"
        placeholder="Describe las funciones asociadas a otras competencias"
        maxLength={1100}/>
        <div className="d-flex text-sans-h6-primary">
          <i className="material-symbols-rounded me-2">info</i>
          <h6>En el caso de que los/as funcionarios/as identificados/as realicen funciones asociadas a otras competencias, describa brevemente sus características, y si existe relación entre ellas y el ejercicio de la competencia en estudio.</h6>
        </div>
      </div>

      <p className="text-sans-m-semibold mt-4">b. Personal de soporte</p>
      <h6 className="text-sans-h6-primary mt-3">Por personal de soporte se entenderán todas personas que realizan tareas y procedimientos indirectos a la competencia. </h6>

      <div>COMPONENTE PERSONAL - INDIRECTO</div>

      <div className="mt-3">
        <CustomTextarea 
        label="Descripción de funciones"
        placeholder="Describe las funciones asociadas a otras competencias"
        maxLength={1100}/>
        <div className="d-flex text-sans-h6-primary">
          <i className="material-symbols-rounded me-2">info</i>
          <h6>En el caso de que los/as funcionarios/as identificados/as realicen funciones asociadas a otras competencias, describa brevemente sus características, y si existe relación entre ellas y el ejercicio de la competencia en estudio.</h6>
        </div>
      </div>
      
    </div>
  ) 
}

export default Subpaso_CincoPuntoTres;