import wallets from "../localStorage/databases.js";
import { resetForm } from "../module/module.mjs";

console.log(wallets);

const form = document.getElementById("signIn");
const signInBtn = document.getElementById("signInBtn");
const username = document.getElementById("usernameSignIn");
const password = document.getElementById("passwordSignIn");

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let usernameValue = username.value;
  let passwordValue = password.value;

  const userLogin = wallets.filter((user) => {
    return user.owner === usernameValue && user.passworOwner === passwordValue;
  });

  console.log(userLogin);

  resetForm(form);
});
