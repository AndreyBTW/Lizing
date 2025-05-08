// Функция для форматирования чисел (10000 → "10 000")
function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
}

// Функция расчета аннуитетного платежа
function firstPayment(amount, months, pv) {
    const firstPay = amount*pv*0.01;
    return Math.round(firstPay);
}


function calculateMonthlyPayment(amount, months, pv) {
    const getMonthlyPayment = (((amount - firstPayment(amount, months, pv)) * 0.16 / 12 * Math.pow((1 + 0.16 / 12), months)))
        / (Math.pow(1 + 0.16 / 12, months) - 1);
    return Math.round(getMonthlyPayment);
}

function calculateTotalPayment(amount, months, pv) {

    const getTotalPayment = (firstPayment(amount, months, pv) + (calculateMonthlyPayment(amount,months,pv) * months));
    return Math.round(getTotalPayment);
}

function calculateSaveNDS(amount, months, pv) {

    const getSaveNDS = calculateTotalPayment(amount, months, pv) * 0.4;
    return Math.round(getSaveNDS);
}

function calculateSumWithSaveNDS(amount, months, pv) {

    const getSumWithSaveNDS = calculateTotalPayment(amount, months, pv) - calculateSaveNDS(amount, months, pv);
    return Math.round(getSumWithSaveNDS);
}

// Обновляем результат при изменении ползунков
function updateResult() {
    const amount = parseInt(document.getElementById('range1').value);
    const months = parseInt(document.getElementById('range2').value);
    const pv = parseFloat(document.getElementById('range3').value);


    const payment = calculateMonthlyPayment(amount, months, pv);
    document.getElementById('result').textContent = formatNumber(payment);

    const payment2 = calculateTotalPayment(amount, months, pv);
    document.getElementById('result2').textContent = formatNumber(payment2);

    const payment3 = calculateSaveNDS(amount, months, pv);
    document.getElementById('result3').textContent = formatNumber(payment3);

    const payment4 = calculateSumWithSaveNDS(amount, months, pv);
    document.getElementById('result4').textContent = formatNumber(payment4);

    const payment5 = firstPayment(amount, months, pv);
    document.getElementById('result5').textContent = formatNumber(payment5);
}

// Назначаем обработчики событий
document.getElementById('range1').addEventListener('input', function() {
    document.getElementById('range1Value').textContent = formatNumber(this.value);
    updateResult();
});

document.getElementById('range2').addEventListener('input', function() {
    document.getElementById('range2Value').textContent = this.value;
    updateResult();
});

document.getElementById('range3').addEventListener('input', function() {
    document.getElementById('range3Value').textContent = this.value;
    updateResult();
});


// Инициализация при загрузке
updateResult();