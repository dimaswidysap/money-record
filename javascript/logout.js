const btnLogout = document.querySelector(".btn-logout");

btnLogout.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location = "index.html";
});
