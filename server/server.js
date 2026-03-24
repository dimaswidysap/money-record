import { Wallet } from "../bluePrint/class.js";
import { resetForm } from "../module/module.mjs";
// import wallets from "../localStorage/databases.js";

let currentUserData = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUserData) {
  console.log("User belum login");
}

const currentUser = new Wallet(
  currentUserData.id,
  currentUserData.owner,
  currentUserData.passwordOwner,
  currentUserData.transactions || [],
);

const userOwnerContent = document.getElementById("nameOwner");
userOwnerContent.textContent = currentUser.owner;

currentUser.updateUI();

// ================= FORM =================
const form = document.getElementById("formMoneyRecord");
const btnSubmit = document.getElementById("submitMoneyRecord");
const moneyInput = document.getElementById("inputNominal");

const descMoney = document.getElementById("descMoney");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const pilihan = document.querySelector('input[name="type-money"]:checked');

  const nominal = parseInt(moneyInput.value);
  const category = pilihan.value;
  const description = descMoney.value;

  if (!nominal || !category || !description) {
    alert("Semua input wajib diisi!");
    return;
  }

  currentUser.addTransaction(description, nominal, category);

  resetForm(form);
});
