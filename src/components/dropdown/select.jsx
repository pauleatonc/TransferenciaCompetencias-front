import { useState, useRef, useEffect } from 'react';

const DropdownSelect = ({ label, placeholder, options, onSelectionChange, selected, readOnly }) =>
{
  const [ isOpen, setIsOpen ] = useState(false);
  const [ selectedOption, setSelectedOption ] = useState(selected); // Usa el prop 'selected' para establecer la opción seleccionada
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selected) {
      setSelectedOption(selected); // Actualizar la opción seleccionada si el prop 'selected' cambia
    }
  }, [selected]);

  useEffect(() =>
  {
    function handleClickOutside(event)
    {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
      {
        setIsOpen(false);
      }
    }

    if (isOpen)
    {
      document.addEventListener('mousedown', handleClickOutside);
    } else
    {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () =>
    {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ isOpen ]);

  const toggleDropdown = () =>
  {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelectionChange(option); 
  };
  return (
    <div className={`input-container ${readOnly ? 'readonly' : ''}`}>
      <label className="text-sans-h5 input-label">{label}</label>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`text-sans-p dropdown-btn ${readOnly ? "disabled" : ""}`}
      >
        {selectedOption ? selectedOption.label : placeholder}
        {!readOnly && <i className="material-symbols-rounded ms-2">{isOpen ? 'expand_less' : 'expand_more'}</i>}
      </button>
      {isOpen && !readOnly && (
        <div className="dropdown d-flex flex-column" ref={dropdownRef}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`p-3 ${option.value === selectedOption?.value ? 'selected-option' : 'unselected-option'}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;