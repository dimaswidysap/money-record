class Transaction {
  constructor(id, description, amount, type) {
    this.id = id;
    this.description = description;
    this.amount = amount; // Angka positif
    this.type = type; // 'income' atau 'expense'
    this.date = new Date().toLocaleDateString();
  }
}

class Wallet {
  constructor(idOwner, ownerName, passworOwner) {
    this.id = idOwner;
    this.owner = ownerName;
    this.passworOwner = passworOwner;
    this.transactions = [];
  }

  addTransaction(description, amount, type) {
    const id = Date.now();
    const newTransaction = new Transaction(id, description, amount, type);
    this.transactions.push(newTransaction);
    this.updateUI();
  }

  get totalBalance() {
    return this.transactions.reduce((acc, item) => {
      return item.type === "income" ? acc + item.amount : acc - item.amount;
    }, 0);
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.updateUI();
  }

  updateUI() {
    console.log(`Saldo terbaru ${this.owner}: Rp${this.totalBalance}`);

    const totalBalanceContent = document.getElementById("totalBalance");
    totalBalanceContent.textContent = this.totalBalance.toLocaleString();
  }
}

export { Transaction, Wallet };
