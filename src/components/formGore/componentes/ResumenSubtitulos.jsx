export const ResumenSubtitulos = ({
  sub22Diferencia,
  sub22Justificados,
  sub22Jutificar,
  sub29Diferencia,
  sub29Justificados,
  sub29Justificar,
}) => {
  return (
    <>
      <table className="table  my-4">
        <thead>
          <tr className="table-secondary">
            <th scope="col align-items-center">
              <span className="py-2">
                Costos Totales Anual <br /> ($M) por subtítulo
              </span>
            </th>
            <th scope="col">
              <span className="py-2">
                Diferencias con <br /> el sector
              </span>
            </th>
            <th scope="col ps-4 py-2">
              Justificados por <br /> GORE
            </th>
            <th scope="col ps-4 py-2 ">
              Diferencia por <br />
              justificar
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center py-5 ">
            <td className="text-start align-middle">
              <span className="mx-3">Subtítulo 22</span>
            </td>
            <td className="py-3">
              <span className="text-sans-p-bold-blue pe-5">{sub22Diferencia || 0 }</span>
            </td>
            <td className="py-3">
              <span className="text-sans-p-bold-blue pe-5">{sub22Justificados || 0}</span>
            </td>
            <td className="py-3">
              <span className="text-sans-p-bold-blue pe-5">{sub22Jutificar || 0}</span>
            </td>
          </tr>
          <tr className="text-center py-5 table-secondary ">
            <td className="text-start align-middle">
              <span className="mx-3">Subtítulo 29</span>
            </td>
            <td className="py-3">
              <span className="text-sans-p-bold-blue pe-5">{sub29Diferencia || 0}</span>
            </td>
            <td className="py-3">
              <span className="text-sans-p-bold-blue pe-5">{sub29Justificados || 0}</span>
            </td>
            <td className="py-3">
              <span className="text-sans-p-bold-blue pe-5">{sub29Justificar || 0}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
