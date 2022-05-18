import React, {useState} from 'react';
import TimerInput from './timer-input';
import TimerText from './timer-text';
import TimerButton from './timer-button';
import './timer.css';

const validInput = (timeInputs) => {
  const maxTime = {
    hours: 24,
    minutes: 59,
    seconds: 59
  };
  const units = Object.keys(maxTime);

  timeInputs.forEach((inputs, i) => {
    const time = Number(inputs);
    const unit = units[i];
    let valid = true;

    // if the input isn't a number, return false
    if (isNaN(time)) {
        alert(`Please enter a valid number for the ${unit} input field!`);
        valid = false;
    }
    // if the input is larger/lower than allowed, return false
    if (time < 0 || time > maxTime[unit]) {
        alert(`Please enter a number between 0 and ${maxTime[unit]} for the ${unit} input field!`);
        valid = false;
    }

    if (!valid) return false;
})

  return true;
}

const Timer = (props) => {
  const {id, deleteTimer} = props;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [popup, setPopup] = useState("Timer is finished!");
  const [countdown, setCountdown] = useState(null);
  const [displayCountdown, setDisplayCountdown] = useState(false);
  const [displayButtons, setDisplayButtons] = useState([true, false, false]);

  const setPopupMsg = () => {
    const confirm = window.confirm("Would you like to set a custom message when the timer is finished?");
    if (confirm) {
        const msg = prompt("Enter a message to be displayed when the timer is finished: ");
        setPopup(msg);
    }
  }

  const start = () => {
    if (validInput([hours, minutes, seconds])) {
      if (!paused) {
        setPopupMsg();
      }
      setDisplayButtons([false, true, true]);
      setDisplayCountdown(true);

      setCountdown(setInterval(() => countdownHandler(), 1000));
    }
  }

  const pause = () => {
    clearInterval(countdown);
    setDisplayButtons([true, false, false]);
    setPaused(true);
  }

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setPaused(false);
    clearInterval(countdown);
    setDisplayButtons([true, false, false]);
  }

  const countdownHandler = () => {
    if(seconds === 0 && (minutes >= 0 && hours > 0)) {
      setSeconds(59);
    }
    else if (seconds > 0) {
      setSeconds(seconds - 1);
    }

    if (seconds === 59) {
      if (minutes === 0) {
        setMinutes(hours > 0 ? 59 : 0);
      }
      else {
        setMinutes(minutes - 1);
      }
    }

    if (seconds === 59 && minutes === 59 && hours > 0) {
      setHours(hours - 1);
    }

    if (seconds === 0 && minutes === 0 && hours === 0) {
      reset();
      alert(popup);
    }
  }

  const clickHandler = (e) => {
    const {name} = e.target;
    switch(name) {
      case "start":
        start();
        break;
      case "pause":
        pause();
        break;
      case "reset":
        reset();
        break;
      default:
        break;
    }
  }

  const inputHandler = (e) => {
    const {name, value} = e.target;
    switch(name) {
      case "hours":
        setHours(value);
        break;
      case "minutes":
        setMinutes(value);
        break;
      case "seconds":
        setSeconds(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="timer">
      <button className="delete-btn" type="button" onClick={() => deleteTimer(id)}>X</button>
      {!displayCountdown ? <TimerInput inputHandler={inputHandler}/> : <TimerText countdown={[hours, minutes, seconds]}/>}
      <TimerButton clickHandler={clickHandler} display={displayButtons}/>
    </div>
  )
}

export default Timer