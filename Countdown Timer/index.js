/**
 * Timer class that can Start, Reset, and Pause
 */
class Timer {
    #countdown;
    #seconds;
    #minutes;
    #hours;
    #paused;
    #popupMsg;
    #references;
    
    constructor() {
        this.#countdown = null;
        this.#seconds = 0;
        this.#minutes = 0;
        this.#hours = 0;
        this.#paused = false;
        this.#popupMsg = "Timer is finished!";
        this.#references = {};
    }

    /**
     * Sets the references to timers' elements
     * @param {Object} references - object with references to timers' elements 
     */
    setReferences(references) {
        this.#references = references;
    }

    /**
     * Sets up popup message when timer is done
     */
    setPopupMsg() {
        const setPopup = confirm("Would you like to set a custom message when the timer is finished?");

        if (setPopup) {
            const msg = prompt("Enter a message to be displayed when the timer is finished: ");
            this.#popupMsg = msg;
        }
        else {
            this.#popupMsg = "Timer is finished!";
        }
    }
    
    /**
     * Displays the time inputs or text boxes
     * @param {boolean} shouldDisplay - Decides whether to display inputs or textboxes
     */
    displayCountdown(shouldDisplay) {
        this.#references["time-input-wrapper"].style.display = shouldDisplay ? "none" : "flex";
        this.#references["time-text-wrapper"].style.display = shouldDisplay ? "flex" : "none";
        
    }
    
    /**
     * Displays the start, pause, and reset button
     * @param {boolean} displayStart - Displays start button
     * @param {boolean} displayPause - Displays pause button
     * @param {boolean} displayReset - Displays reset button
     */
    displayButtons(displayStart, displayPause, displayReset) {    
        this.#references["time-btns"][0].style.display = displayStart ? "inline-flex" : "none";
        this.#references["time-btns"][1].style.display = displayPause ? "inline-flex" : "none";
        this.#references["time-btns"][2].style.display = displayReset ? "inline-flex" : "none";
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
        const timeInputs = this.#references["time-inputs"];
        if (this.validInput(timeInputs)) {
            if (!this.#paused) {
                this.setPopupMsg();
                const timeText = this.#references["time-texts"];
                timeInputs.forEach((input, index) => {
                    let time = Number(input.value);
                    timeText[index].textContent = time > 9 ? time : `0${time}`;
                    this.setTimes(timeText[index].classList[1], time);
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
        const timeDisplay = this.#references["time-texts"];
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
            this.reset();
            alert(this.#popupMsg);
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
        this.#references["time-inputs"].forEach(input => input.value = "");
    }

    /**
     * Deletes the timer from the page
     */
    deleteTimer() {
        document.getElementById("timer-wrapper").removeChild(this.#references["timer"]);
    }
}

/**
 * Creates a span with a colon in it to separate time inputs/time texts
 * @returns {HTMLElement} - returns a span with a colon in it
 */
const createColon = () => {
    const colon = document.createElement("span");
    colon.textContent = ":";
    return colon;
}

/**
 * Creates input elements to get time values from user
 * @param {Array} timeUnits - array of units of time (hours, minutes, seconds) 
 * @returns {HTMLElement} - wrapper of all inputs that take in timer values
 */
const createTimeInputs = (timeUnits) => {
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("time-input-wrapper");
    
    const placeholders = {
        "hours": "HH",
        "minutes": "MM",
        "seconds": "SS"
    };

    timeUnits.forEach(unit => {
        const label = document.createElement("label");
        label.setAttribute("for", unit);

        const input = document.createElement("input");
        input.classList.add("time-input");
        input.setAttribute("name", unit);
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", placeholders[unit]);
        input.setAttribute("maxlength", "2");

        inputWrapper.append(label, input);

        if (unit !== "seconds") {
            const colon = createColon();
            inputWrapper.append(colon);
        }
    })

    return inputWrapper;
}

/**
 * Creates paragraph elements to display the timer values
 * @param {Array} timeUnits - array of units of time (hours, minutes, seconds)
 * @returns {HTMLElement} - wrapper of all texts that display the time
 */
const createTimeTexts = (timeUnits) => {
    const textWrapper = document.createElement("div");
    textWrapper.classList.add("time-text-wrapper");

    timeUnits.forEach(unit => {
        const text = document.createElement("p");
        text.classList.add("time-text", unit);
        textWrapper.append(text);

        if (unit !== "seconds") {
            const colon = createColon();
            textWrapper.append(colon);
        }
    })

    return textWrapper;
}

/**
 * Creates the timer buttons to control the timer
 * @param   {Class} timer
 * @returns {HTMLElement} - wrapper of all timer buttons
 */
const createTimeButtons = (timer) => {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("time-btn-wrapper");
    const types = ["Start", "Pause", "Reset"];

    types.forEach(type => {
        const button = document.createElement("button");
        button.classList.add("time-btn");
        button.setAttribute("name", `${type.toLowerCase()}Btn`);
        button.setAttribute("type", "button");
        button.textContent = type;
        button.addEventListener("click", () => {
            switch(type) {
                case "Start":
                    timer.start();
                    break;
                case "Pause":
                    timer.pause();
                    break;
                case "Reset":
                    timer.reset();
                    break;

            }
        })
        buttonWrapper.append(button);
    })

    return buttonWrapper;
}

/**
 * Creates timer delete button
 * @returns {HTMLElement} - the delete button
 */
const createDeleteBtn = () => {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.textContent = "X";

    return deleteBtn;
}

/**
 * Creates all the elements for the timer
 */
const createTimer = () => {
    const timer = new Timer();
    const timerFragment = new DocumentFragment();
    const timeUnits = ["hours", "minutes", "seconds"];

    const timerElements = document.createElement("div");
    timerElements.classList.add("timer");

    // create and append time inputs
    const timeInputs = createTimeInputs(timeUnits);

    // create and append time texts
    const timeTexts = createTimeTexts(timeUnits);

    // create and append time buttons
    const timeBtns = createTimeButtons(timer);

    // add in the delete button if it's the first
    const deleteBtn = createDeleteBtn();
    deleteBtn.addEventListener("click", () => timer.deleteTimer());
    timerElements.append(deleteBtn);

    // append created elements into timerWrapper
    timerElements.append(timeInputs, timeTexts, timeBtns);

    // append timerWrapper into timer
    timerFragment.append(timerElements);

    // append timer to #timer-app
    document.getElementById("timer-wrapper").append(timerFragment);

    // add references of these elements to Timer class
    timer.setReferences({
        "timer": timerElements,
        "time-input-wrapper": timeInputs,
        "time-inputs": [...timeInputs.children].filter((el) => el.tagName === "INPUT"),
        "time-text-wrapper": timeTexts,
        "time-texts": [...timeTexts.children].filter((el) => el.tagName === "P"),
        "time-btn-wrapper": timeBtns,
        "time-btns": [...timeBtns.children].filter((el) => el.tagName === "BUTTON")
    });
}

/**
 * Initializes app with a timer and attaches event listener to Add Timer button
 */
const main = () => {
    createTimer();
    const addTimer = document.getElementById("add-timer-btn");

    addTimer.addEventListener("click", () => createTimer());
}

main();