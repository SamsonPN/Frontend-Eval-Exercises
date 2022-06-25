import React, {useState, useEffect} from 'react';
import XAxis from './chart-xaxis';
import YAxis from './chart-yaxis';
import Bars from './chart-bars';
import './chart.css';

const Chart = ({minNum, maxNum, occ, maxFreq}) => {

  return (
    <div className="chart">
      <div className="chart-container">
        <YAxis maxFreq={maxFreq} />
        <Bars occ={occ} maxFreq={maxFreq} />
      </div>
      <XAxis occ={occ} minNum={minNum} maxNum={maxNum} />
    </div>
  )
}

export default Chart;