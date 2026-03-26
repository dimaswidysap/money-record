const wallets = JSON.parse(localStorage.getItem("wallets")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

export { wallets, currentUser };
