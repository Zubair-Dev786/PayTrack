// ============================================================
// employee-login.js - employee login page
// ============================================================

// ---------- Tags select karna ----------
let employeeCodeInput = document.getElementById("employeeCodeInput");
let loginBtn = document.getElementById("loginBtn");

// ---------- Login function ----------
function loginEmployee() {
  let typedCode = employeeCodeInput.value.trim();

  if (typedCode === "") {
    showError("Please enter your code.");
    return;
  }

  let employees = getEmployees();

  // find = list mein wo employee dhoondo jiska code match kare
  let employee = employees.find(function (item) {
    return item.code === typedCode;
  });

  if (employee) {
    sessionStorage.setItem("role", "employee");
    sessionStorage.setItem("employeeCode", typedCode);
    window.location.href = "employee-dashboard.html";
  } else {
    showError("Wrong code. Ask your admin.");
  }
}

// ---------- Events ----------
loginBtn.addEventListener("click", loginEmployee);

employeeCodeInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    loginEmployee();
  }
});
