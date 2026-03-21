import wallets from "../localStorage/databases.js";
import { resetForm } from "../module/module.mjs";

const form = document.getElementById("signIn");
const signInBtn = document.getElementById("signInBtn");
const username = document.getElementById("usernameSignIn");
const password = document.getElementById("passwordSignIn");

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (!usernameValue || !passwordValue) {
    alert("Username dan Password wajib diisi!");
    return;
  }

  const user = wallets.find((user) => user.owner === usernameValue);

  if (!user) {
    alert("Username tidak ditemukan!");
    resetForm(form);
    return;
  }

  if (user.passwordOwner !== passwordValue) {
    alert("Password salah!");
    password.value = "";
    return;
  }

  alert("Login berhasil!");

  localStorage.setItem("currentUser", JSON.stringify(user));

  // console.log("User login:", user);

  resetForm(form);

  // redirect (opsional)
  window.location.href = "dashboard.html";
});
