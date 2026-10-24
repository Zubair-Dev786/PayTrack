// ============================================================
// salary.js - pending aur paid salary lists (admin)
// ============================================================

// ---------- Tags select karna ----------
let pendingTable = document.getElementById("pendingTable");
let paidTable = document.getElementById("paidTable");
let logoutBtn = document.getElementById("logoutBtn");

// ---------- Login check ----------
checkAdmin();

// ---------- Dono lists dikhana ----------
function showSalaries() {
  let employees = getEmployees();

  pendingTable.innerHTML = "";
  paidTable.innerHTML = "";

  let pendingFound = false;
  let paidFound = false;

  for (let i = 0; i < employees.length; i++) {
    let employee = employees[i];

    let row = document.createElement("tr");
    let nameCell = document.createElement("td");
    let departmentCell = document.createElement("td");
    let salaryCell = document.createElement("td");
    let actionCell = document.createElement("td");

    nameCell.innerText = employee.name;
    departmentCell.innerText = employee.department;
    salaryCell.innerText = "Rs " + employee.salary;

    row.append(nameCell, departmentCell, salaryCell, actionCell);

    if (employee.paid === true) {
      // paid list ki row
      let status = document.createElement("span");
      status.className = "paid-tag";
      status.innerText = "Paid";

      actionCell.appendChild(status);
      paidTable.appendChild(row);
      paidFound = true;
    } else {
      // pending list ki row: 2 buttons
      let pendingBtn = document.createElement("button");
      let payBtn = document.createElement("button");

      pendingBtn.className = "btn-pending";
      pendingBtn.innerText = "Pending";

      payBtn.className = "btn-pay";
      payBtn.innerText = "Pay Salary";

      pendingBtn.addEventListener("click", function () {
        showPending(i);
      });

      payBtn.addEventListener("click", function () {
        paySalary(i);
      });

      actionCell.append(pendingBtn, payBtn);
      pendingTable.appendChild(row);
      pendingFound = true;
    }
  }

  if (pendingFound === false) {
    pendingTable.innerHTML = '<tr><td colspan="4">No pending salaries.</td></tr>';
  }

  if (paidFound === false) {
    paidTable.innerHTML = '<tr><td colspan="4">No salary paid yet.</td></tr>';
  }
}

// ---------- "Pending" button: batata hai ke salary baqi hai ----------
function showPending(index) {
  let employee = getEmployees()[index];

  Swal.fire({
    icon: "info",
    title: "Salary pending",
    text: employee.name + "'s salary of Rs " + employee.salary + " is still pending.",
    confirmButtonColor: "#4f46e5"
  });
}

// ---------- "Pay Salary" button: employee ko paid list mein bhejna ----------
function paySalary(index) {
  let employee = getEmployees()[index];

  Swal.fire({
    title: "Pay salary?",
    text: "Pay Rs " + employee.salary + " to " + employee.name + "?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    confirmButtonText: "Yes, pay"
  }).then(function (result) {
    if (result.isConfirmed) {
      let employees = getEmployees();
      employees[index].paid = true;
      saveEmployees(employees);
      showSalaries();
      showSuccess("Salary paid");
    }
  });
}

// ---------- Events ----------
logoutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  logout();
});

showSalaries();
