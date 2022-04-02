const transactionUl = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

/* let transactions = [
  { id: 1, name: "Bolo de brigadeiro", amount: -20 },
  { id: 2, name: "Salario", amount: 3800 },
  { id: 3, name: "Hotdog", amount: -10 },
  { id: 4, name: "Suport para notebook", amount: -100 },
]; */

//Adciona no LocalStorege
const localStorageTransactios = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactios : [];

const removeTransaction = (ID) => {
  transactions = transactions.filter(
    (transaction) => transaction.id !== ID
  );
  init();
};

const addTransactionitonDOM = (transaction) => {
  // cria um elemento HTML com o valor da transação
  const operator = transaction.amount < 0 ? "-" : "+";
  const cssClass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithoutoperator = Math.abs(transaction.amount);
  const li = document.createElement("li");
  // Cria div com para excluir elemento do campo "Transações"
  li.classList.add(cssClass);
  li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutoperator}</span>
    <button class="delete-btn onClick="removeTransaction(${transaction.id})">x</button>
    `;
  transactionUl.prepend(li);
  {
    /* <li class="minus">
    Salário <span>-$400</span>
    <button class="delete-btn">x</button>
  </li>; */
  }
};

const updatebalanceValues = () => {
  // percorre o array com map e soma os valares usando o reduce
  const transactionsAmounts = transactions.map(
    (transaction) => transaction.amount
  );
  const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);
  //faz o calculo do saldo atual
  const income = transactionsAmounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
  //soma os valores das despesas
  const expense = Math.abs(
    transactionsAmounts
      .filter((value) => value < 0)
      .reduce((accumulator, value) => accumulator + value, 0)
  ).toFixed(2);
  //Exibe no display os valores receitas, despesas e total
  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
  transactionUl.innerHTML = "";
  // Percorre addTransactionitonDOM e atualiza a tela
  transactions.forEach(addTransactionitonDOM);
  updatebalanceValues();
};

init();

//Gera número um aleatório
const genarateID = () => Math.round(Math.random() * 1000);

//Vefica se o input esta vazio alerta caso verdadeiro
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const transactionName = inputTransactionName.value.trim();
  const transactionsAmount = inputTransactionAmount.value.trim();

  if (transactionName === "" || transactionsAmount === "") {
    alert("Por favor, digite tant o nome da transação quanto o valor");
    return;
  }

  const transaction = {
    id: genarateID(),
    name: transactionName,
    amount: Number(transactionsAmount),
  };

  // Adiciona no display os input
  transactions.push(transaction);
  init();

  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
});