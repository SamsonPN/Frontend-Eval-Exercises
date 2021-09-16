const hasValidInputs = () => {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i].value;
        let inputNum = Number(input);
        if (isNaN(inputNum) || input === '') {
            return false;
        }

    }

    return true;
}

const calculateMortgage = () => {
    if (hasValidInputs()) {
        const principal_loan = Number(document.getElementById('principal-loan').value);
        const monthly_interest_rate = (Number(document.getElementById('interest-rate').value) / 100) / 12;
        const loan_length_monthly = Number(document.getElementById('loan-length').value) * 12;

        console.log({principal_loan, monthly_interest_rate, loan_length_monthly})

        const numerator = monthly_interest_rate * Math.pow(1 + monthly_interest_rate, loan_length_monthly);
        const denominator = Math.pow(1 + monthly_interest_rate, loan_length_monthly) - 1;
        const mortgage = Math.trunc(principal_loan * (numerator / denominator));

        const mortgage_amount = document.getElementById('mortgage-amount');
        const mortgage_payment = document.getElementById('mortgage-payment');

        mortgage_amount.textContent = `$${mortgage.toLocaleString()}`;
        mortgage_payment.style.display = 'block';
    }
    else {
        alert('Please make sure all forms are numbers only!')
    }
}

const main = () => {
    const calculate_btn = document.getElementById('calculate-btn');

    calculate_btn.addEventListener('click', calculateMortgage);
}

main();