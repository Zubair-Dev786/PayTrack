// ============================================================
// admin-login.js - admin login page
// ============================================================

// ---------- Tags select karna ----------
let adminCodeInput = document.getElementById("adminCodeInput");
let loginBtn = document.getElementById("loginBtn");

// ---------- Login function ----------
function loginAdmin() {
  let typedCode = adminCodeInput.value.trim();
  let savedCode = localStorage.getItem("adminCode");

  if (typedCode === "") {
    showError("Please enter the admin code.");
    return;
  }

  if (typedCode === savedCode) {
    sessionStorage.setItem("role", "admin");
    window.location.href = "dashboard.html";
  } else {
    showError("Wrong code. Try again.");
  }
}

// ---------- Events ----------
loginBtn.addEventListener("click", loginAdmin);

// Enter key dabane par bhi login ho
adminCodeInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    loginAdmin();
  }
});
