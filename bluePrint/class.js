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
    this.saveToLocalStorageWallets(); // 🔥 tambahkan ini
    this.updateUI();
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter((t) => t.id !== id);

    this.saveToLocalStorageCurrenUser();
    this.saveToLocalStorageWallets(); // 🔥 tambahkan ini
    this.updateUI();
  }

  get totalBalance() {
    return this.transactions.reduce((acc, item) => {
      return item.type === "income" ? acc + item.amount : acc - item.amount;
    }, 0);
  }

  updateUI() {
    const totalBalanceContent = document.getElementById("totalBalance");

    if (this.transactions.length === 0) {
      totalBalanceContent.textContent = "Catatan anda masih kosong";
    } else {
      totalBalanceContent.textContent =
        "Rp " + this.totalBalance.toLocaleString();
    }
  }

  saveToLocalStorageCurrenUser() {
    localStorage.setItem("currentUser", JSON.stringify(this));
  }
  saveToLocalStorageWallets() {
    // cek apakah wallet sudah ada (berdasarkan id)
    const index = wallets.findIndex((w) => w.id === this.id);

    console.log(index);

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
}

export { Transaction, Wallet };
