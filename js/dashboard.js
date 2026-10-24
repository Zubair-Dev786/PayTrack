// ============================================================
// dashboard.js - admin overview page
// ============================================================

// ---------- Tags select karna ----------
let totalEmployees = document.getElementById("totalEmployees");
let paidCount = document.getElementById("paidCount");
let pendingCount = document.getElementById("pendingCount");
let pendingAmount = document.getElementById("pendingAmount");
let logoutBtn = document.getElementById("logoutBtn");

// ---------- Login check ----------
checkAdmin();

// ---------- Overview ke numbers ----------
function showOverview() {
  let employees = getEmployees();
  let paid = 0;
  let pending = 0;
  let amount = 0;

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].paid === true) {
      paid++;
    } else {
      pending++;
      amount += Number(employees[i].salary) || 0;
    }
  }

  totalEmployees.innerText = employees.length;
  paidCount.innerText = paid;
  pendingCount.innerText = pending;
  pendingAmount.innerText = "Rs " + amount;
}

// ---------- Events ----------
logoutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  logout();
});

showOverview();
