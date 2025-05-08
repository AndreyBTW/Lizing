// Функция для форматирования чисел (10000 → "10 000")
function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
}

// Функция расчета аннуитетного платежа
function calculateMonthlyPayment(amount, months, percent) {
    const getMonthlyPayment = (((amount - percent) * 0.16 / 12 * Math.pow((1 + 0.16 / 12), months)))
        / (Math.pow(1 + 0.16 / 12, months) - 1);
    return Math.round(getMonthlyPayment);
}

function calculateTotalPayment(amount, months, percent) {

    const getTotalPayment = (percent + (calculateMonthlyPayment(amount,months,percent) * months));
    return Math.round(getTotalPayment);
}

function calculateSaveNDS(amount, months, percent) {

    const getSaveNDS = calculateTotalPayment(amount, months, percent) * 0.4;
    return Math.round(getSaveNDS);
}

function calculateSumWithSaveNDS(amount, months, percent) {

    const getSumWithSaveNDS = calculateTotalPayment(amount, months, percent) - calculateSaveNDS(amount, months, percent);
    return Math.round(getSumWithSaveNDS);
}

// Обновляем результат при изменении ползунков
function updateResult() {
    const amount = parseInt(document.getElementById('range1').value);
    const months = parseInt(document.getElementById('range2').value);
    const percent = parseFloat(document.getElementById('range3').value);

    const payment = calculateMonthlyPayment(amount, months, percent);
    document.getElementById('result').textContent = formatNumber(payment);

    const payment2 = calculateTotalPayment(amount, months, percent);
    document.getElementById('result2').textContent = formatNumber(payment2);

    const payment3 = calculateSaveNDS(amount, months, percent);
    document.getElementById('result3').textContent = formatNumber(payment3);

    const payment4 = calculateSumWithSaveNDS(amount, months, percent);
    document.getElementById('result4').textContent = formatNumber(payment4);
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