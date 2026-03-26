const signIn = (dataBases, resetForm) => {
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

    const user = dataBases.find(
      (user) =>
        user.owner === usernameValue && user.passwordOwner === passwordValue,
    );

    if (!user) {
      alert("Username tidak ditemukan!");
      return;
    }

    alert("Login berhasil!");
    resetForm(form);

    const currentUser = {
      idUser: user.id,
      name: user.owner,
      pass: user.passwordOwner,
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    window.location = "dashboard.html";
  });
};

export default signIn;
