import React from 'react';
import FormInput from './dataForm-input';
import './dataForm.css';

const dataForm = ({handler}) => {
  const labelTexts = {
    "num": "Total Numbers:",
    "min": "Minimum Value",
    "max": "Maximum Value"
  };

  const inputs = ["num", "min", "max"].map(type => {
    return <FormInput name={type} text={labelTexts[type]} handler={handler} key={type} />
  });
  return (
    <form id="dataset-form">
        {inputs}
    </form>
  )
}

export default dataForm;