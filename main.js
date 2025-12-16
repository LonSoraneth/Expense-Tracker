// ===============================
// CLOSURE (stores private state)
// ===============================
const expenseTracker = (() => {
  let transactions = []; // private variable

  // FIRST CLASS FUNCTION
  const formatMoney = amount => `${amount.toFixed(2)}$`;

  // HIGHER ORDER FUNCTION
  const calculateTotal = (items, callback) =>
    items.reduce((total, item) => callback(total, item), 0);

  // REST OPERATOR
  const addTransactions = (...newTransactions) => {
    transactions = [...transactions, ...newTransactions]; // SPREAD OPERATOR
  };

  const getTransactions = () => [...transactions]; // SPREAD OPERATOR

  return {
    addTransactions,
    getTransactions,
    formatMoney,
    calculateTotal
  };
})();

// ===============================
// ARROW FUNCTION
// ===============================
const addTransaction = () => {
  const desc = description.value;
  const amt = Number(amount.value);

  if (!desc || !amt) return alert("Please enter valid data");

  const transaction = {
    date: new Date().toLocaleDateString(),
    description: desc,
    amount: amt
  };

  expenseTracker.addTransactions(transaction);

  updateUI();
  description.value = "";
  amount.value = "";
};

// ===============================
// UI UPDATE
// ===============================
const updateUI = () => {
  const transactions = expenseTracker.getTransactions();

  const income = expenseTracker.calculateTotal(
    transactions.filter(t => t.amount > 0),
    (total, t) => total + t.amount
  );

  const expense = expenseTracker.calculateTotal(
    transactions.filter(t => t.amount < 0),
    (total, t) => total + t.amount
  );

  const balance = income + expense;

  document.getElementById("income").textContent =
    expenseTracker.formatMoney(income);

  document.getElementById("expense").textContent =
    expenseTracker.formatMoney(Math.abs(expense));

  document.getElementById("balance").textContent =
    expenseTracker.formatMoney(balance);

  renderHistory(transactions);
};

// ===============================
// RENDER TABLE
// ===============================
const renderHistory = transactions => {
  const tbody = document.getElementById("history");
  tbody.innerHTML = "";

  transactions.forEach(({ date, description, amount }) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${date}</td>
      <td>${description}</td>
      <td>${amount}$</td>
    `;

    tbody.appendChild(row);
  });
};