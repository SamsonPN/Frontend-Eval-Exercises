import React from 'react';
import './refetchBtn.css';

const refetchBtn = ({handler}) => {
  return (
    <div className='btn-wrapper'>
        <button id='refetch-btn' onClick={() => handler()}>Generate New Data</button>
    </div>
  )
}

export default refetchBtn;