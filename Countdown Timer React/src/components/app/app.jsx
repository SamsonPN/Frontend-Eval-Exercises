import './app.css';
import Timer from '../timer';
import {useState} from 'react';


function App() {
  const [timers, setTimers] = useState([<Timer id="timer0" key={0} deleteTimer={deleteTimer}/>]);
  
  function deleteTimer(id) {
    setTimers((timers) => timers.filter(timer => timer.props.id !== id));
  };

  const addTimer = () => {
    setTimers(timers => {
      const newTimer = <Timer id={`timer${timers.length}`} key={timers.length} deleteTimer={deleteTimer}/>;
      return [...timers, newTimer];
      }
    );
  }
  
  return (
    <div id="App">
      <h1>Countdown Timer</h1>
      <div id="timer-wrapper">
        {timers}
      </div>
      <button id="add-timer-btn" onClick={() => addTimer()}>Add Timer</button>
    </div>
  );
}

export default App;
