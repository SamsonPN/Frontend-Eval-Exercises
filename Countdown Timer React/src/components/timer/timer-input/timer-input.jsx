import React from 'react'

const timerInput = (props) => {
    const {inputHandler} = props;
    const placeholders = {
        "hours": "HH",
        "minutes": "MM",
        "seconds": "SS"
    };
    const timeInputs = [];
    ["hours", "minutes", "seconds"].forEach(unit => {
        const label = <label htmlFor={unit} key={`label-${unit}`}/>;
        const input = <input 
                        className="time-input"
                        name={unit}
                        type="text"
                        placeholder={placeholders[unit]}
                        maxLength="2"
                        key={unit}
                        onInput={(e) => inputHandler(e)}
                       />
        timeInputs.push(label, input);
        if (unit !== "seconds") {
            const span = <span key={`span-${unit}`}>:</span>;
            timeInputs.push(span);
        }
    });
  return (
      <div className="time-input-wrapper">
          {timeInputs}
      </div>
  )
}

export default timerInput