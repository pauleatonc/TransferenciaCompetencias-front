import { useState, useRef, useEffect } from "react";

const CustomTextarea = ({ loading, saved, label, placeholder, id, maxLength, rows, value = "", onChange, onBlur, readOnly, name }) =>
{
  const [ inputValue, setInputValue ] = useState(value); // Inicialización segura de inputValue
  const textareaRef = useRef(null);

  useEffect(() =>
  {
    adjustHeight();
  }, [ inputValue ]);

  const handleChange = (event) =>
  {
    event.preventDefault()
    setInputValue(event.target.value);
    onChange(event); // Pasa el evento completo
  };

  const handleBlur = (e) =>
  {
    console.log("Input Blurred");
    e.preventDefault()
    if (onBlur) onBlur(e); // Propaga el evento onBlur al componente padre
  };

  const adjustHeight = () =>
  {
    if (textareaRef.current)
    {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() =>
  {
    setInputValue(value); // Actualiza el inputValue cuando el prop 'value' cambia
  }, [ value ]);

  const counterClass = maxLength !== undefined && inputValue.length === maxLength
    ? "text-sans-h6-darkred"
    : "text-sans-h6";

  const renderSpinnerOrCheck = () =>
  {
    console.log(`loading: ${loading}, saved: ${saved}`); // Agrega esta línea para depurar
    if (loading)
    {
      return <div className="spinner-border text-primary my-4 mx-3" role="status"></div>;
    }
    if (saved)
    {
      return <i className="material-symbols-outlined my-4 mx-3 text-success ">check</i>;
    }
    return null;
  };
  return (
    <div>
      {readOnly ? (
        <div className="d-flex flex-column textarea-container">
          <label className="text-sans-h5 input-label ms-3 ms-sm-0">{label}</label>
          <textarea
            ref={textareaRef}
            className="teaxtarea-text input-textarea p-3"
            placeholder={placeholder}
            id={id}
            value={inputValue}
            onChange={handleChange}
            rows={rows}
            style={{ overflow: 'hidden' }}
            name={name}
            disabled
          />
        </div>
      ) : (
        <>
          <div className="d-flex input-container">
            <label className="text-sans-h5 input-label ms-3 ms-sm-0">{label}</label>
            <textarea
              ref={textareaRef}
              className="input-textarea input-s p-3 p-2 col-11"
              type="text"
              placeholder={placeholder}
              id={id}
              value={inputValue}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{ overflow: 'hidden' }}
              name={name}
            />
          <div className=" d-flex align-self-end align-items-center">
            {renderSpinnerOrCheck()}
          </div>
          </div>
            {maxLength !== null && maxLength !== undefined && (
              <div className="d-flex justify-content-end mb-0 col-11">
                <span className={counterClass}>
                  {inputValue.length}/{maxLength} caracteres.
                </span>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default CustomTextarea;
