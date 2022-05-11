class Timer {
    #countdown;
    #seconds;
    #minutes;
    #hours;
    #paused;
    
    constructor() {
        this.#countdown = null;
        this.#seconds = 0;
        this.#minutes = 0;
        this.#hours = 0;
        this.#paused = false;
    }
    
    /**
     * Displays the time inputs or text boxes
     * @param {boolean} shouldDisplay - Decides whether to display inputs or textboxes
     */
    displayCountdown(shouldDisplay) {
        // replace input field with text field
        document.getElementById("time-input-wrapper").style.display = shouldDisplay ? "none" : "flex";
        document.getElementById("time-text-wrapper").style.display = shouldDisplay ? "flex" : "none";
        
    }
    
    /**
     * Displays the start, pause, and reset button
     * @param {boolean} displayStart - Displays start button
     * @param {boolean} displayPause - Displays pause button
     * @param {boolean} displayReset - Displays reset button
     */
    displayButtons(displayStart, displayPause, displayReset) {    
        // replace Start with Pause and Reset buttons
        document.getElementById("startBtn").style.display = displayStart ? "inline-flex" : "none";
        document.getElementById("pauseBtn").style.display = displayPause ? "inline-flex" : "none";
        document.getElementById("resetBtn").style.display = displayReset ? "inline-flex" : "none";
    }

    /**
     * Sets the units of time with their respective values
     * @param {String} unit - unit of time (seconds, minutes, hours)
     * @param {Number} time - value of unit of time
     */
    setTimes(unit, time) {
        switch(unit) {
            case "seconds":
                this.#seconds = time;
                break;
            case "minutes":
                this.#minutes = time;
                break;
            case "hours":
                this.#hours = time;
                break;
        }
    }


    /**
     * Validates whether timer input values are numbers
     * @param   {Array} timeInputs - Array of time input elements
     * @returns {boolean} Whether inputs are valid
     */
    validInput(timeInputs) {
        const maxTime = {
            hours: 24,
            minutes: 59,
            seconds: 59
        };
    
        timeInputs.forEach(inputs => {
            const {name, value} = inputs;
            const time = Number(value);
            let valid = true;
    
            // if the input isn't a number, return false
            if (isNaN(time)) {
                alert(`Please enter a valid number for the ${name} input field!`);
                valid = false;
            }
            // if the input is larger/lower than allowed, return false
            if (time < 0 || time > maxTime[name]) {
                alert(`Please enter a number between 0 and ${maxTime[name]} for the ${name} input field!`);
                valid = false;
            }
    
            if (!valid) return false;
        })
    
        return true;
    }
    
    
    /**
     * Starts timer, replaces inputs with plain text
     * and replaces Start button with Pause and Reset buttons
     */
    start() {
        // validate input here
        // numbers only
        // hours: 0 --> 24
        // minutes/seconds: 0 --> 59
        const timeInputs = [...document.getElementsByClassName("time-input")];

        if (this.validInput(timeInputs)) {

            if (!this.#paused) {
                // grab input values and place them in timer/text fields
                const timeText = [...document.getElementsByClassName("time-text")];
                timeInputs.forEach((input, index) => {
                    let time = Number(input.value);
                    timeText[index].textContent = time > 9 ? time : `0${time}`;
                    this.setTimes(timeText[index].id, time);
                })
            }

            this.displayCountdown(true);
            this.displayButtons(false, true, true);
            this.updateBrowserTitle();

            // start the timer
            this.#countdown = setInterval(() => this.countdownHandler(), 1000);
        }
        else {
            alert("Please only enter in numbers into the fields!");
        }
    }

    /**
     * Function that handles the timer counting down
     */
    countdownHandler() {
        const timeDisplay = [...document.getElementsByClassName('time-text')];
        const secondDisplay = timeDisplay[2];
        const minuteDisplay = timeDisplay[1];
        const hourDisplay = timeDisplay[0];
                
        // decrement seconds
        if (this.#seconds === 0 && (this.#minutes >= 0 && this.#hours > 0)) {
            this.#seconds = 59;
        }
        else if (this.#seconds > 0) {
            this.#seconds--;
        }
        secondDisplay.textContent = this.#seconds > 10 ? this.#seconds : `0${this.#seconds}`;

        // decrement minutes
        if (this.#seconds === 59) {
            if (this.#minutes === 0) {
                this.#minutes = this.#hours > 0 ? 59 : 0;
            }
            else {
                this.#minutes--;
            }
            minuteDisplay.textContent = this.#minutes > 9 ? this.#minutes : `0${this.#minutes}`;
        }

        
        // decrement hours
        if (this.#seconds === 59 && this.#minutes === 59 && this.#hours > 0) {
            this.#hours--;
            hourDisplay.textContent = this.#hours > 9 ? this.#hours : `0${this.#hours}`;
        }

        // update the browser title with timer
        // document.title = `Timer: ${hourDisplay.textContent} : ${minuteDisplay.textContent} : ${secondDisplay.textContent}`;
        this.updateBrowserTitle();

        // once timer is done, notify user and reset timer
        if (this.#seconds === 0 && this.#minutes === 0 && this.#hours === 0) {
            alert("Timer is finished!");
            this.reset();
        }

    }

    /**
     * Updates the browser title with timer
     */
    updateBrowserTitle() {
        let hours = this.#hours > 9 ? this.#hours : `0${this.#hours}`;
        let minutes = this.#minutes > 9 ? this.#minutes : `0${this.#minutes}`;
        let seconds = this.#seconds > 9 ? this.#seconds : `0${this.#seconds}`;

        document.title = `Timer: ${hours} : ${minutes} : ${seconds}`;
    }
    
    /**
     * Pauses the timer
     */
    pause() {
        clearInterval(this.#countdown);
        this.displayButtons(true, false, true);
        this.#paused = true;
    }
    
    /**
     * Resets timer back to its initial state
     */
    reset() {
        this.#seconds = 0;
        this.#minutes = 0;
        this.#hours = 0;
        this.#paused = false;

        clearInterval(this.#countdown);
        this.displayCountdown(false);
        this.displayButtons(true, false, false);

        document.title = 'Countdown Timer';
        [...document.getElementsByClassName('time-input')].forEach(input => input.value = "");
    }
}


/**
 * Attaches event listeners to buttons
 */
const main = () => {
    const timer = new Timer();
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");

    startBtn.addEventListener('click', () => timer.start());
    pauseBtn.addEventListener('click', () => timer.pause());
    resetBtn.addEventListener('click', () => timer.reset());
}

main();