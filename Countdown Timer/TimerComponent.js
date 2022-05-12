const createColon = () => {
    const colon = document.createElement("span");
    colon.textContent = ":";
    return colon;
}

// create time inputs
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

//  create time text
const createTimeTexts = (timeUnits) => {
    const textWrapper = document.createElement("div");
    textWrapper.classList.add("time-text-wrapper");

    timeUnits.forEach(unit => {
        const text = document.createElement("p");
        text.id = unit;
        text.classList.add("time-text");
        textWrapper.append(text);

        if (unit !== "seconds") {
            const colon = createColon();
            textWrapper.append(colon);
        }
    })

    return textWrapper;
}

// create buttons
const createTimeButtons = () => {
    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("time_btn-wrapper");
    const types = ["Start", "Pause", "Reset"];

    types.forEach(type => {
        const button = document.createElement("button");
        button.classList.add("time-btn");
        button.setAttribute("name", `${type.toLowerCase()}Btn`);
        button.setAttribute("type", "button");
        button.textContent = type;
        buttonWrapper.append(button);
    })

    return buttonWrapper;
}

export const createTimer = () => {
    const timer = new DocumentFragment();
    const timeUnits = ["hours", "minutes", "seconds"];

    const timerWrapper = document.createElement('div');
    timerWrapper.classList.append('timer-wrapper');

    // create and append time inputs
    const timeInputs = createTimeInputs(timeUnits);

    // create and append time texts
    const timeTexts = createTimeTexts(timeUnits);

    // create and append time buttons
    const timeBtns = createTimeButtons();

    // append timerWrapper to timer
    timer.append(timeInputs, timeTexts, timeBtns);

    // append timer to #timer-app
    document.getElementById("timer-app").append(timer);
}