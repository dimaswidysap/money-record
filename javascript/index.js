// 1. Buat fungsi yang lebih fleksibel (Reusable)
function handleLabelVisibility(input, label) {
  const updateStatus = () => {
    // Jika input sedang focus ATAU input tidak kosong
    if (document.activeElement === input || input.value.length > 0) {
      label.classList.add("displayNone");
    } else {
      label.classList.remove("displayNone");
    }
  };

  // Pasang listener ke input tersebut
  input.addEventListener("focus", updateStatus);
  input.addEventListener("blur", updateStatus);
  input.addEventListener("input", updateStatus);

  // Jalankan sekali saat halaman dimuat (untuk menangani autofill)
  updateStatus();
}

// 2. Ambil elemen
const usernameInput = document.getElementById("usernameSignIn");
const usernameLabel = document.querySelector(".usernameSingInLabel");

const passInput = document.getElementById("passwordSignIn");
const passLabel = document.querySelector(".passwordSignInLabel");

// 3. Panggil fungsinya untuk masing-masing pasangan
if (usernameInput && usernameLabel) {
  handleLabelVisibility(usernameInput, usernameLabel);
}

if (passInput && passLabel) {
  handleLabelVisibility(passInput, passLabel);
}
