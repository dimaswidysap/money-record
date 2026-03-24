import wallets from "../localStorage/databases.js";

class Transaction {
  constructor(id, description, amount, type) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.type = type;
    this.date = new Date().toLocaleDateString();
  }
}

class Wallet {
  constructor(idOwner, ownerName, passwordOwner, transactions = []) {
    this.id = idOwner;
    this.owner = ownerName;
    this.passwordOwner = passwordOwner;
    this.transactions = transactions;
  }

  addTransaction(description, amount, type) {
    const id = Date.now();
    const newTransaction = new Transaction(id, description, amount, type);
    this.transactions.push(newTransaction);

    this.saveToLocalStorageCurrenUser();
    this.saveToLocalStorageWallets();
    this.updateUI();
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.saveToLocalStorageCurrenUser();
    this.saveToLocalStorageWallets();
    this.updateUI();
  }

  updateUI() {
    //
    const totalBalanceContent = document.getElementById("totalBalance");

    if (this.transactions.length === 0) {
      totalBalanceContent.textContent = "Catatan anda masih kosong";
    } else {
      totalBalanceContent.textContent =
        "Rp " + this.totalBalance.toLocaleString();
    }
    //
    const conAllIncomeMoney = document.getElementById("allIncomeMoney");

    conAllIncomeMoney.textContent =
      "Rp " + this.totalBalanceIncome.toLocaleString();
    // console.log(this.totalBalanceIncome);

    //

    const conAllExpenditureMoney = document.getElementById(
      "allExpenditureMoney",
    );

    conAllExpenditureMoney.textContent =
      "Rp " + this.totalBalanceExpenditure.toLocaleString();

    //
    const containerListIncome = document.getElementById("list-desc-money");
    const containerListExpenditure = document.getElementById(
      "list-desc-money-expenditure",
    );

    const allTransactionsIncome = this.filterIncome(this.transactions);
    const allTransactionsExpenditure = this.filterExpenditure(
      this.transactions,
    );

    this.displayListIncome(containerListIncome, allTransactionsIncome);
    this.displayListExpenditure(
      containerListExpenditure,
      allTransactionsExpenditure,
    );
  }

  get totalBalance() {
    return this.transactions.reduce((acc, item) => {
      return item.type === "income" ? acc + item.amount : acc - item.amount;
    }, 0);
  }
  get totalBalanceIncome() {
    const income = this.transactions.filter(
      (income) => income.type === "income",
    );

    return income.reduce((curr, acc) => acc.amount + curr, 0);
  }
  get totalBalanceExpenditure() {
    const income = this.transactions.filter(
      (income) => income.type !== "income",
    );

    return income.reduce((curr, acc) => acc.amount + curr, 0);
  }

  filterIncome(list) {
    return list.filter((income) => income.type === "income");
  }
  filterExpenditure(list) {
    return list.filter((income) => income.type !== "income");
  }

  saveToLocalStorageCurrenUser() {
    localStorage.setItem("currentUser", JSON.stringify(this));
  }
  saveToLocalStorageWallets() {
    // cek apakah wallet sudah ada (berdasarkan id)
    const index = wallets.findIndex((w) => w.id === this.id);

    // console.log(index);

    if (index !== -1) {
      // update data jika sudah ada
      wallets[index] = this;
    } else {
      // tambah data baru jika belum ada
      wallets.push(this);
    }

    // simpan kembali ke localStorage
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }

  displayListIncome(containerList, lists) {
    containerList.innerHTML = "";

    lists.forEach((items) => {
      let idList = items.id;

      const list = document.createElement("li");
      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
      const div = document.createElement("div");
      const buttonDelete = document.createElement("button");

      list.classList.add("containerLists");

      buttonDelete.textContent = "Delete";

      containerList.appendChild(list);
      list.append(span1, span2, div);
      div.append(buttonDelete);

      span1.textContent = items.description;
      span2.textContent = `Rp ${items.amount.toLocaleString()}`;

      buttonDelete.addEventListener("click", () => {
        this.deleteTransaction(idList);
      });
    });
  }
  displayListExpenditure(containerList, lists) {
    containerList.innerHTML = "";

    lists.forEach((items) => {
      let idList = items.id;

      const list = document.createElement("li");
      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
      const div = document.createElement("div");
      const buttonDelete = document.createElement("button");

      list.classList.add("containerLists");

      buttonDelete.textContent = "Delete";

      containerList.appendChild(list);
      list.append(span1, span2, div);
      div.append(buttonDelete);

      span1.textContent = items.description;
      span2.textContent = `Rp ${items.amount.toLocaleString()}`;

      buttonDelete.addEventListener("click", () => {
        this.deleteTransaction(idList);
      });
    });
  }
}

export { Transaction, Wallet };
