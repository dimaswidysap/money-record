import wallets from "../localStorage/databases.js";
import { resetForm } from "../module/module.mjs";
import { Wallet } from "../bluePrint/class.js";

const form = document.getElementById("signUp");
const btnSignIn = document.getElementById("signUpBtn");
const username = document.getElementById("usernameSignUp");
const password = document.getElementById("passwordSignUp");

// console.log(form);

btnSignIn.addEventListener("click", function (event) {
  event.preventDefault();

  event.preventDefault();

  try {
    let usernameValue = username.value;
    let passwordValue = password.value;
    let idOwner = Math.random().toString(36).slice(2, 9);

    if (!usernameValue || !passwordValue) {
      throw new Error("Username dan password wajib diisi");
    }

    const userWallet = new Wallet(idOwner, usernameValue, passwordValue);

    wallets.push(userWallet);

    localStorage.setItem("wallets", JSON.stringify(wallets));

    // console.log("Semua wallet:", wallets);

    resetForm(form);
  } catch (error) {
    console.log("Error:", error.message);
  }
});
