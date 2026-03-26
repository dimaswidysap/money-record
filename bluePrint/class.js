import { wallets } from "../localStorage/databases.js";
import edit from "../server/action/edit.js";

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

    this.saveToLocalStorageWallets();
    this.updateUI();
  }

  deleteTransaction(id) {
    this.transactions = this.transactions.filter((t) => t.id !== id);

    this.saveToLocalStorageWallets();
    this.updateUI();
  }

  updateUI() {
    // tampilan nama user
    const userOwnerContent = document.getElementById("nameOwner");
    userOwnerContent.textContent = this.kapitalSetiapKata(this.owner);

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

    // list pemasukan & pengeluaran
    const incomeLabel = document.querySelector(".labelIncome");
    const expendLabel = document.querySelector(".expendLabel");

    const containerListIncome = document.getElementById("list-desc-money");
    const containerListExpenditure = document.getElementById(
      "list-desc-money-expenditure",
    );

    const allTransactionsIncome = this.filterType(this.transactions, "income");
    const allTransactionsExpenditure = this.filterType(
      this.transactions,
      "expenditure",
    );

    if (allTransactionsIncome.length === 0) {
      incomeLabel.style.display = "none";
    } else {
      incomeLabel.style.display = "flex";
    }
    if (allTransactionsExpenditure.length === 0) {
      expendLabel.style.display = "none";
    } else {
      expendLabel.style.display = "flex";
    }

    this.displayList(containerListIncome, allTransactionsIncome);
    this.displayList(containerListExpenditure, allTransactionsExpenditure);
  }

  kapitalSetiapKata(kalimat) {
    return kalimat
      .toLowerCase() // Ubah semua jadi kecil dulu agar rapi
      .split(" ") // Bagi kalimat menjadi array kata
      .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1)) // Kapital huruf pertama
      .join(" "); // Gabungkan kembali jadi kalimat
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

  filterType(list, type) {
    return list.filter((income) => income.type === type);
  }

  saveToLocalStorageWallets() {
    // cek apakah wallet sudah ada (berdasarkan id)
    const index = wallets.findIndex((w) => w.id === this.id);

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

  displayList(containerList, lists) {
    containerList.innerHTML = "";

    lists.forEach((items) => {
      let idList = items.id;

      // console.log(lists);

      const list = document.createElement("li");
      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
      const div = document.createElement("div");

      Object.assign(div.style, {
        margin: "1.5rem 0 0 0",
        display: "flex",
        gap: "0.5rem",
      });

      const button = ["Delete", "Edit"];

      button.forEach((items, index) => {
        const buttonDelete = document.createElement("button");
        const conIconDelet = document.createElement("div");
        const iconDelete = document.createElement("img");

        list.classList.add("containerLists");

        buttonDelete.textContent = items;
        iconDelete.setAttribute(
          "src",
          index === 0 ? "asset/icon/delete.svg" : "asset/icon/edit.svg",
        );

        containerList.appendChild(list);
        list.append(span1, span2, div);
        div.append(buttonDelete);
        buttonDelete.appendChild(conIconDelet);
        conIconDelet.appendChild(iconDelete);

        Object.assign(iconDelete.style, {
          width: "100%",
          objectFit: "cover",
        });

        Object.assign(buttonDelete.style, {
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexDirection: "row-reverse",
          cursor: "pointer",
          backgroundColor: "var(--secondary)",
          padding: "0.5rem",
          borderRadius: "10px",
          fontWeight: "800",
          color: "var(--white)",
          boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
        });

        Object.assign(conIconDelet.style, {
          height: "1.3rem",
          padding: "0.2rem",
          aspectRatio: "1/1",
          backgroundColor: index === 0 ? "orange" : "rgb(0, 193, 0)",
          borderRadius: "50%",
        });

        if (index === 0) {
          buttonDelete.addEventListener("click", () => {
            this.deleteTransaction(idList);
          });
        } else {
          buttonDelete.addEventListener("click", () => {
            const containerFormEdit =
              document.querySelector(".containerFormEdit");

            containerFormEdit.style.display = "flex";
            // console.log(idList);

            edit(wallets, this.id, idList);
          });
        }
      });

      span1.textContent = this.kapitalSetiapKata(items.description) + " ";
      span2.textContent = `Rp ${items.amount.toLocaleString()}`;

      // console.log(list);
    });
  }
}

export { Transaction, Wallet };
