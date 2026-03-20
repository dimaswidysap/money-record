let currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

const userOwnerContent = document.getElementById("nameOwner");
userOwnerContent.textContent = currentUser.owner;
