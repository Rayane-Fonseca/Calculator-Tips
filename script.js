// Seleciona os elementos do DOM
const billInput = document.getElementById('bill');
const customTipInput = document.getElementById('custom');
const numberPeopleInput = document.getElementById('number-of-people');
const tipButtons = document.querySelectorAll('.btn-tip');
const tipAmountEl = document.querySelector('.tip-amount .amount');
const totalAmountEl = document.querySelector('.total-amount .amount');
const resetBtn = document.querySelector('.btn-reset');

// Variável para armazenar a porcentagem da gorjeta
let currentTip = 0;

// Função para formatar valores monetários
const formatCurrency = (amount) => {
    return amount.toFixed(2).replace('.', ',');
};

// Função para calcular e atualizar resultados
const calculateTipAmount = () => {
    const bill = parseFloat(billInput.value) || 0;
    const people = parseFloat(numberPeopleInput.value) || 0;

    if (bill === 0 || people === 0) {
        tipAmountEl.textContent = '$0,00';
        totalAmountEl.textContent = '$0,00';
        return;
    }

    const tipAmountPerPerson = (bill * currentTip) / people;
    const totalPerPerson = (bill * (1 + currentTip)) / people;

    tipAmountEl.textContent = `$${formatCurrency(tipAmountPerPerson)}`;
    totalAmountEl.textContent = `$${formatCurrency(totalPerPerson)}`;
};

// Event listeners para inputs - cálculo em tempo real
billInput.addEventListener('input', calculateTipAmount);
numberPeopleInput.addEventListener('input', calculateTipAmount);
customTipInput.addEventListener('input', () => {
    // Remove classe ativa de todos os botões de gorjeta
    tipButtons.forEach(btn => btn.classList.remove('active'));
    currentTip = parseFloat(customTipInput.value) / 100 || 0;
    calculateTipAmount();
});

// Event listeners para botões de gorjeta
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove classe ativa de todos os botões
        tipButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona classe ativa ao botão clicado
        button.classList.add('active');
        // Limpa input custom
        customTipInput.value = '';
        // Define a gorjeta atual
        currentTip = parseFloat(button.textContent) / 100;
        calculateTipAmount();
    });
});

// Botão Reset
resetBtn.addEventListener('click', () => {
    billInput.value = '';
    customTipInput.value = '';
    numberPeopleInput.value = '';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    currentTip = 0;
    tipAmountEl.textContent = '$0,00';
    totalAmountEl.textContent = '$0,00';
});
