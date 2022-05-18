import React from 'react'

const timerText = (props) => {
  const {countdown} = props;
    const timeTexts = [];
    ["hours", "minutes", "seconds"].forEach((unit, i) => {
      const time = countdown[i] > 9 ? countdown[i] : `0${countdown[i]}`;
        const text = <p className={`time-text ${unit}`} key={unit}>{time}</p>;
        timeTexts.push(text);

        if (unit !== "seconds") {
            const span = <span key={`span-${unit}`}>:</span>;
            timeTexts.push(span);
        }
    });
    
  return (
    <div className="time-text-wrapper">
        {timeTexts}
    </div>
  )
}

export default timerText