import { Wallet } from "../bluePrint/class.js";
import { resetForm } from "../module/module.mjs";
import { wallets, currentUser } from "../localStorage/databases.js";

import signUp from "../auth/signUp.js";
import signIn from "../auth/signIn.js";

signUp(wallets, Wallet, resetForm);
signIn(wallets, resetForm);
