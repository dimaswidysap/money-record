const containerForm = document.querySelector(".container-form-input");
// console.log(containerForm);

const bntShow = document.getElementById("show-form");
const btnClose = document.getElementById("close-form");

bntShow.addEventListener("click", () => {
  containerForm.style.display = "flex";
  bntShow.style.opacity = "0";
});
btnClose.addEventListener("click", () => {
  containerForm.style.display = "none";
  bntShow.style.opacity = "1";
});
