import { wallets } from "../localStorage/databases.js";

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
    const userOwnerContent = document.getElementById("nameOwner");
    userOwnerContent.textContent = this.kapitalSetiapKata(this.owner);

    const totalBalanceContent = document.getElementById("totalBalance");

    if (this.transactions.length === 0) {
      totalBalanceContent.textContent = "Catatan anda masih kosong";
    } else {
      totalBalanceContent.textContent =
        "Rp " + this.totalBalance.toLocaleString();
    }

    const conAllIncomeMoney = document.getElementById("allIncomeMoney");
    conAllIncomeMoney.textContent =
      "Rp " + this.totalBalanceIncome.toLocaleString();

    const conAllExpenditureMoney = document.getElementById(
      "allExpenditureMoney",
    );
    conAllExpenditureMoney.textContent =
      "Rp " + this.totalBalanceExpenditure.toLocaleString();

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
      .toLowerCase()
      .split(" ")
      .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
      .join(" ");
  }

  get totalBalance() {
    return this.transactions.reduce((acc, item) => {
      return item.type === "income" ? acc + item.amount : acc - item.amount;
    }, 0);
  }

  get totalBalanceIncome() {
    const income = this.transactions.filter((t) => t.type === "income");
    return income.reduce((acc, curr) => acc + curr.amount, 0);
  }

  get totalBalanceExpenditure() {
    const expenditure = this.transactions.filter((t) => t.type !== "income");
    return expenditure.reduce((acc, curr) => acc + curr.amount, 0);
  }

  filterType(list, type) {
    return list.filter((item) => item.type === type);
  }

  saveToLocalStorageWallets() {
    const index = wallets.findIndex((w) => w.id === this.id);

    if (index !== -1) {
      wallets[index] = this;
    } else {
      wallets.push(this);
    }

    localStorage.setItem("wallets", JSON.stringify(wallets));
  }

  edit(dataBases, idUser, idList) {
    const containerFormEdit = document.querySelector(".containerFormEdit");
    const btnClose = document.querySelector(".editClose");

    const inputValue = document.getElementById("newNominal");
    const opsiIncome = document.getElementById("incomeEdit");
    const opsiExpend = document.getElementById("expenditureEdit");
    const inputDesc = document.getElementById("newDesc");
    const btnSave = document.querySelector(".btnEdit");

    btnClose.onclick = (e) => {
      containerFormEdit.style.display = "none";
    };

    const user = dataBases.find((key) => key.id === idUser);
    const transaksiEdit = user.transactions.find((t) => t.id === idList);
    const type = transaksiEdit.type;

    inputValue.value = transaksiEdit.amount;
    if (type === "income") {
      opsiIncome.checked = true;
    } else {
      opsiExpend.checked = true;
    }
    inputDesc.value = transaksiEdit.description;

    btnSave.onclick = (e) => {
      e.preventDefault();
      const validasi = confirm("Apakah anda yakin?");

      if (validasi) {
        const pilihan = document.querySelector(
          'input[name="edit-type"]:checked',
        );
        const newNominal = inputValue.value;
        const newDesc = inputDesc.value;
        const pilihanNew = pilihan.value;

        const transaksiNew = {
          id: idList,
          description: newDesc,
          amount: parseInt(newNominal),
          date: transaksiEdit.date,
          type: pilihanNew,
        };

        const newArray = user.transactions.filter((key) => key.id !== idList);
        newArray.push(transaksiNew);

        const { transactions, ...rest } = user;
        const userTransactionsEdit = {
          ...rest,
          transactions: newArray,
        };

        const indexUser = dataBases.findIndex((u) => u.id === idUser);
        dataBases[indexUser] = userTransactionsEdit;

        this.transactions = newArray;

        localStorage.setItem("wallets", JSON.stringify(dataBases));

        this.updateUI();

        containerFormEdit.style.display = "none";
      }
    };
  }

  displayList(containerList, lists) {
    containerList.innerHTML = "";

    lists.forEach((item) => {
      const idList = item.id;

      const list = document.createElement("li");
      list.classList.add("containerLists");

      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
      const div = document.createElement("div");

      Object.assign(div.style, {
        margin: "1.5rem 0 0 0",
        display: "flex",
        gap: "0.5rem",
      });

      const buttons = ["Delete", "Edit"];

      buttons.forEach((btnText, index) => {
        const buttonAction = document.createElement("button");
        const conIconAction = document.createElement("div");
        const iconAction = document.createElement("img");

        buttonAction.textContent = btnText;
        iconAction.setAttribute(
          "src",
          index === 0 ? "asset/icon/delete.svg" : "asset/icon/edit.svg",
        );

        div.append(buttonAction);
        buttonAction.appendChild(conIconAction);
        conIconAction.appendChild(iconAction);

        Object.assign(iconAction.style, {
          width: "100%",
          objectFit: "cover",
        });

        Object.assign(buttonAction.style, {
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
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        });

        Object.assign(conIconAction.style, {
          height: "1.3rem",
          padding: "0.2rem",
          aspectRatio: "1/1",
          backgroundColor: index === 0 ? "orange" : "rgb(0, 193, 0)",
          borderRadius: "50%",
        });

        if (index === 0) {
          buttonAction.addEventListener("click", () => {
            this.deleteTransaction(idList);
          });
        } else {
          buttonAction.addEventListener("click", () => {
            const containerFormEdit =
              document.querySelector(".containerFormEdit");
            containerFormEdit.style.display = "flex";
            this.edit(wallets, this.id, idList);
          });
        }
      });

      span1.textContent = this.kapitalSetiapKata(item.description) + " ";
      span2.textContent = `Rp ${item.amount.toLocaleString()}`;

      list.append(span1, span2, div);
      containerList.appendChild(list);
    });
  }
}

export { Transaction, Wallet };
