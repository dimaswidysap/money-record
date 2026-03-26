import { currentUser, wallets } from "../localStorage/databases.js";
import { Wallet } from "./../bluePrint/class.js";
import { resetForm } from "./../module/module.mjs";
import addTransactionForm from "./action/add.js";

const userActive = wallets.find(
  (user) =>
    currentUser.idUser === user.id &&
    currentUser.name === user.owner &&
    currentUser.pass === user.passwordOwner,
);

let user = new Wallet(
  userActive.id,
  userActive.owner,
  userActive.passwordOwner,
  userActive.transactions || [],
);

addTransactionForm(resetForm, user);
user.updateUI();
