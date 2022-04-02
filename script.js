const transactionUl = document.querySelector("#transactions");

const dummyTransactions = [
  { id: 1, name: "Bolo de brigadeiro", amount: -20 },
  { id: 2, name: "Salario", amount: 3800 },
  { id: 3, name: "Hotdog", amount: -10 },
  { id: 4, name: "Suport para notebook", amount: -100 },
];

const addTransactionitonDOM = (transaction) => {
  // cria um elemento HTML com o valor da transação
  const operator = transaction.amount < 0 ? "-" : "+";
  const cssClass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithoutoperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(cssClass);
  li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutoperator}</span><button class="delete-btn">x</button>
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
  const transactionsAmounts = dummyTransactions.map(
    (transaction) => transaction.amount
  );
  const total = transactionsAmounts
    .reduce((acumulator, transaction) => acumulator + transaction, 0)
    .toFixed(2);
  console.log(total);
};

const init = () => {
  // Percorre addTransactionitonDOM e atualiza a tela
  dummyTransactions.forEach(addTransactionitonDOM);
  updatebalanceValues();
};

init();
