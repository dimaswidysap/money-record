document.addEventListener("DOMContentLoaded", () => {
  const signInSection = document.querySelector(".form");
  const signUpSection = document.querySelector(
    'section[style*="display: none"]',
  );
  const createAccountBtn = document.querySelector(".sjajisk button");

  // Berikan class agar mudah diatur CSS
  signUpSection.classList.add("signUp-section");

  // Bungkus input signUp dengan div untuk styling yang sama
  const signUpInputs = signUpSection.querySelectorAll("div");
  signUpInputs.forEach((div) => div.classList.add("signUp-field"));

  // Tambahkan Tombol Kembali di form Sign Up
  const backBtnContainer = document.createElement("div");
  backBtnContainer.classList.add("back-to-login");
  backBtnContainer.innerHTML =
    '<button type="button" id="backBtn">Login</button>';
  signUpSection.appendChild(backBtnContainer);

  const backBtn = document.getElementById("backBtn");

  createAccountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signInSection.style.display = "none";
    signUpSection.style.display = "block";
  });

  backBtn.addEventListener("click", () => {
    signUpSection.style.display = "none";
    signInSection.style.display = "block";
  });

  document.getElementById("signIn").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  document.getElementById("signUp").addEventListener("submit", (e) => {
    e.preventDefault();
  });
});
