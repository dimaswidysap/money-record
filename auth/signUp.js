const signUp = (dataBases, Wallet, resetForm) => {
  const form = document.getElementById("signUp");
  const btnSignUp = document.getElementById("signUpBtn");
  const username = document.getElementById("usernameSignUp");
  const password = document.getElementById("passwordSignUp");
  btnSignUp.addEventListener("click", function (event) {
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
      dataBases.push(userWallet);
      localStorage.setItem("wallets", JSON.stringify(dataBases));
      resetForm(form);
    } catch (error) {
      console.log("Error:", error.message);
    }
  });
};

export default signUp;
