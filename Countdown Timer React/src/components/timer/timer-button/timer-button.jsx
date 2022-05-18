import React from 'react';
import './timer-button.css';

const timerButton = (props) => {
  const {clickHandler, display} = props;
  const timerButtons = [];
  ["Start", "Pause", "Reset"].forEach((button, index) => {
    if (display[index]) {
      const element = <button 
                className="time-btn" 
                name={button.toLowerCase()} 
                type="button"
                onClick={(e) => clickHandler(e)}
                key={button}>{button}
             </button>;
      timerButtons.push(element);
    }
  });
  
  return (
    <div className="time-btn-wrapper">
      {timerButtons}
    </div>
  )
}

export default timerButton