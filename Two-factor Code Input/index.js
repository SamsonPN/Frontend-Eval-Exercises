const moveNextField = (e) => {
    if (e.target.name !== "4") {
        e.target.nextElementSibling.focus();
    }
}

const movePreviousField = (e) => {
    e.target.value = "";
    if (e.target.name !== "1") {
        e.target.previousElementSibling.focus();
    }
}

const validateKey = (e) => {
    const regex = /[0-9]/;
    if (e.target.value.match(regex)) {
        moveNextField(e);
    }
    else if (e.target.value !== "") {
        alert('Please enter numbers only!')
        e.target.value = "";
    }
}

const resetFields = () => {
    const code_inputs = [...document.getElementsByTagName('input')];

    code_inputs.forEach(input => input.value = "");
}

const submitCode = (code) => {
    const valid_code = '2468';

    if (code === valid_code) {
        alert("Valid code!")
    }
    else {
        alert("Please enter a valid code!")
    }

    resetFields();
}

const submissionHandler = (e) => {
    e.preventDefault();
    let code = '';
    const code_inputs = [...document.getElementsByTagName('input')];

    for (let i = 0; i < code_inputs.length; i++) {
        let { value } = code_inputs[i];
        if (value.length === '0') {
            alert("Please fill out all fields!")
            return;
        }

        code += value;
    }

    submitCode(code);
}

const main = () => {
    const code_inputs = document.getElementsByTagName('input');
    const code_form = document.getElementById('code-form');

    [...code_inputs].forEach(input => {
        input.addEventListener('input', (e) => {
                validateKey(e)
        })

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                movePreviousField(e);
            }
        })
    })

    code_form.addEventListener('submit', submissionHandler)
}

main();