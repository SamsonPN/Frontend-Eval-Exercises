import React from 'react';
import './chart-yaxis.css';

const ChartYAxis = ({maxFreq}) => {
  const offset = Math.ceil(maxFreq / 10);
  let axes = [];
  for (let i = 0; i <= maxFreq; i += offset) {
    axes.push(i);
  }

  axes = axes.map(val => {
    return <p className="y-axis-value" key={val}>{val}</p>
  });

  return (
    <div className='y-axis'>
      {axes}
    </div>
  )
}

export default ChartYAxis;