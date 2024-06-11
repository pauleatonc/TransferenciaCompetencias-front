import { useState, useEffect } from 'react';
import CustomInput from '../forms/custom_input';
import { Controller } from 'react-hook-form';

export const ListaNombres = ({ control, errors, setValue }) => {
  const [rows, setRows] = useState([{ nombre: '' }, { nombre: '' }]);
  const [duplicateNames, setDuplicateNames] = useState([]);

  useEffect(() => {
    setValue('competencias_agrupadas', rows);
  }, [rows, setValue]);

  const handleAddRow = () => {
    setRows([...rows, { nombre: '' }]);
  };

  const handleRemoveRow = (index) => {
    if (rows.length > 2) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index, event) => {
    const updatedRows = rows.map((row, i) => (i === index ? { ...row, nombre: event.target.value } : row));
    setRows(updatedRows);
    checkDuplicates(updatedRows);
  };

  const checkDuplicates = (updatedRows) => {
    const names = updatedRows.map(row => row.nombre.trim().toLowerCase());
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    setDuplicateNames(duplicates);
  };

  return (
    <>
      {rows.map((row, index) => (
        <div key={index} className={`row ${index % 2 === 0 ? 'white-line' : 'neutral-line'} pt-4 col-11`}>
          <div className="d-flex align-items-center mb-2 mt-2">
            <span className="mx-3 fw-bold mb-auto">{index + 1}</span>
            <Controller
              control={control}
              name={`competencias_agrupadas[${index}].nombre`}
              render={({ field }) => (
                <CustomInput
                  label='Nombre de la Competencia (Obligatorio)'
                  placeholder="Escribe el nombre de la competencia"
                  id={`nombre-${index}`}
                  maxLength={200}
                  error={errors?.competencias_agrupadas?.[index]?.nombre?.message || (duplicateNames.includes(row.nombre.trim().toLowerCase()) && 'Nombre duplicado')}
                  value={row.nombre}
                  onChange={(event) => handleChange(index, event)}
                  {...field}
                />
              )}
            />
          </div>
          {rows.length >= 3 && (
            <div className="d-flex justify-content-end col-12 me-5 pe-4">
              <button type="button" className="btn-terciario-ghost" onClick={() => handleRemoveRow(index)}>
                <i className="material-symbols-rounded mx-1">delete</i>
                <p className="mb-0 text-decoration-underline">Borrar</p>
              </button>
            </div>
          )}
        </div>
      ))}
      {errors.competencias_agrupadas?.message && (
        <div className="text-sans-h6-darkred mt-2 mb-0">{errors.competencias_agrupadas.message}</div>
      )}
      <button type="button" className="btn-secundario-s d-flex my-3" onClick={handleAddRow}>
        <i className="material-symbols-rounded me-2">add</i>
        <p className="mb-0 text-decoration-underline">Agregar Competencia</p>
      </button>
    </>
  );
};
