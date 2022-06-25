import React from 'react';
import './chart-xaxis.css';

const ChartXAxis = ({occ, minNum, maxNum}) => {
  let axes = [];
  if (maxNum > 30) {
      let offset = Math.floor(maxNum / 100) * 10;
      if (offset <= 10) {
          offset = (10 - offset) + offset;
      }
      else if (offset < 100) {
          offset = (100 - offset) + offset;
      }
      for (let i = minNum; i < maxNum + offset; i += offset) {
          axes.push(i);
      }
  }
  else {
      axes = Object.keys(occ);
  }

  axes = axes.map(val => {
    return <p className='x-axis-value' key={val}>{val}</p>
  })

  return (
    <div className='x-axis'>
      {axes}
    </div>
  )
}

export default ChartXAxis;