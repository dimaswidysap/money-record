const addTransactionForm = (resetForm, user) => {
  const form = document.getElementById("formMoneyRecord");
  const btnSubmit = document.getElementById("submitMoneyRecord");
  const moneyInput = document.getElementById("inputNominal");
  const descMoney = document.getElementById("descMoney");

  btnSubmit.addEventListener("click", (e) => {
    const pilihan = document.querySelector('input[name="type-money"]:checked');
    e.preventDefault();

    const nominal = parseInt(moneyInput.value);
    const category = pilihan.value;
    const description = descMoney.value;

    if (!nominal || !category || !description) {
      alert("Semua input wajib diisi!");
      return;
    }

    resetForm(form);

    const data = {
      nominal: nominal,
      type: category,
      desc: description,
    };

    user.addTransaction(data.desc, data.nominal, data.type);
  });
};

export default addTransactionForm;
