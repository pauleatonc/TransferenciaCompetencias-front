import { useState, useRef, useEffect } from 'react';

const DropdownSelect = ({ label, placeholder, options, onSelectionChange, readOnly }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ selectedOption, setSelectedOption ] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ isOpen ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelectionChange(option.value); 
  };

  return (
    <div className={`input-container ${readOnly ? 'readonly' : ''}`}>
      {readOnly ? (
        <>
          <label className="text-sans-h5 input-label">{label}</label>
          <p className="text-sans-p ms-3 pt-3">Opcion seleccionada: {selectedOption ? selectedOption.label : placeholder}</p>
        </>
      ) : (
        <>
          <label className="text-sans-h5 input-label">{label}</label>
          <button type="button" onClick={toggleDropdown} className="text-sans-p-lightgrey dropdown-btn">
            {selectedOption ? selectedOption.label : placeholder}
          </button>
        </>
      )}
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