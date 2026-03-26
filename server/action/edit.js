const edit = (dataBases, idUser, idList) => {
  const containerFormEdit = document.querySelector(".containerFormEdit");
  const btnClose = document.querySelector(".editClose");

  const inputValue = document.getElementById("newNominal");
  const opsiIncome = document.getElementById("incomeEdit");
  const opsiExpend = document.getElementById("expenditureEdit");
  const inputDesc = document.getElementById("newDesc");
  const btnSave = document.querySelector(".btnEdit");

  btnClose.addEventListener("click", (e) => {
    containerFormEdit.style.display = "none";
  });

  const user = dataBases.find((key) => key.id === idUser);

  //   cari transaksi
  const transaksiEdit = user.transactions.find((user) => user.id === idList);
  const type = transaksiEdit.type;

  inputValue.setAttribute("value", `${transaksiEdit.amount}`);
  if (type === "income") {
    opsiIncome.checked = true;
  } else {
    opsiExpend.checked = true;
  }
  inputDesc.setAttribute("value", `${transaksiEdit.description}`);

  //   ketika btn save diklik
  btnSave.addEventListener("click", (e) => {
    const validasi = confirm("apakah anda yakin?");

    if (validasi === true) {
      const pilihan = document.querySelector('input[name="edit-type"]:checked');
      const newNominal = inputValue.value;
      const newDesc = inputDesc.value;
      const pilihanNew = pilihan.value;

      let transaksiNew = {
        id: idList,
        description: newDesc,
        amount: parseInt(newNominal),
        date: transaksiEdit.date,
        type: pilihanNew,
      };

      // hapus transaksi lama lalu tambah baru
      const newArray = user.transactions.filter((key) => key.id !== idList);
      newArray.push(transaksiNew);

      const { transactions, ...rest } = user;

      let userTransactionsEdit = {
        ...rest,
        transactions: newArray,
      };

      const indexUser = dataBases.findIndex((u) => u.id === idUser);
      dataBases[indexUser] = userTransactionsEdit;

      localStorage.setItem("wallets", JSON.stringify(dataBases));

      //   console.log(dataBases);

      containerFormEdit.style.display = "none";
    } else {
      return;
    }
  });
};

export default edit;
