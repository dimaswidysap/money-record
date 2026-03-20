// import { Transaction, Wallet } from "./class.js";

let wallets = JSON.parse(localStorage.getItem("wallets")) || [];

// const wallet = new Wallet("Budi");
// wallet.addTransaction("Gaji Bulanan", 5000000, "income");
// wallet.addTransaction("Beli Kopi", 25000, "expense");

export default wallets;
