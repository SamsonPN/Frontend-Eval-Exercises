import React from 'react';
import './dataForm-input.css';

const dataFormInput = ({name, text, handler}) => {
  return (
    <>
        <label htmlFor={name}>{text}</label>
        <input type="text" name={name} maxLength="4" onInput={(e) => handler(e)}/>
    </>
  )
}

export default dataFormInput;