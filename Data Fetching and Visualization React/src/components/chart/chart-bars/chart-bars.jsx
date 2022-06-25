import React from 'react';
import './chart-bars.css';
/**
 * Generates random color for bars in bar chart
 * @returns {String} - Random color
 */
const generateBarColor = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
      let random = Math.floor(Math.random() * 16);
      let hexValue = random.toString(16);
      color = color.concat(hexValue);
    }
    return color;
}

const ChartBars = ({occ, maxFreq}) => {
  const bars = [];
  for (let num in occ) {
    let freq = occ[num];
    const barStyle = {
      "minHeight": `${100 * (freq / maxFreq)}%`,
      "backgroundColor": generateBarColor()
    }
    bars.push(
      <div className="bar-wrapper" key={num}>
        <label className="bar-label">{`Number: ${num}\nFrequency: ${freq}`}</label>
        <div className="bar" style={barStyle}></div>
      </div>
    )
  }
  return (
    <div className='bar-container'>
      {bars}
    </div>
  )
}

export default ChartBars;