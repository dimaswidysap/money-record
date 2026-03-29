const button = document.querySelector(".btn-hamburger");
const hamburger = document.querySelector(".hamburger-logo");
const close = document.querySelector(".close");
const sideBar = document.querySelector(".sidebar");

button.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger-gone");
  close.classList.toggle("close-arrive");
  sideBar.classList.toggle("close-arrive");
});
