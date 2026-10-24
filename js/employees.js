// ============================================================
// employees.js - add / delete employees (admin)
// ============================================================

// ---------- Tags select karna ----------
let empName = document.getElementById("empName");
let empDepartment = document.getElementById("empDepartment");
let empSalary = document.getElementById("empSalary");
let empCode = document.getElementById("empCode");
let employeeTable = document.getElementById("employeeTable");
let addEmployeeBtn = document.getElementById("addEmployeeBtn");
let logoutBtn = document.getElementById("logoutBtn");

// ---------- Login check ----------
checkAdmin();

// ---------- Employees ki table dikhana ----------
function showEmployees() {
  let employees = getEmployees();
  employeeTable.innerHTML = "";

  if (employees.length === 0) {
    employeeTable.innerHTML =
      '<tr><td colspan="5">No employees yet. Add one above.</td></tr>';
    return;
  }

  for (let i = 0; i < employees.length; i++) {
    // har employee ke liye ek row aur uske cells banao
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    let departmentCell = document.createElement("td");
    let salaryCell = document.createElement("td");
    let codeCell = document.createElement("td");
    let actionCell = document.createElement("td");
    let deleteBtn = document.createElement("button");

    nameCell.innerText = employees[i].name;
    departmentCell.innerText = employees[i].department;
    salaryCell.innerText = "Rs " + employees[i].salary;
    codeCell.innerText = employees[i].code;

    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", function () {
      deleteEmployee(i);
    });

    actionCell.appendChild(deleteBtn);
    row.append(nameCell, departmentCell, salaryCell, codeCell, actionCell);
    employeeTable.appendChild(row);
  }
}

// ---------- Naya employee add karna ----------
function addEmployee() {
  let name = empName.value.trim();
  let department = empDepartment.value;
  let salary = empSalary.value;
  let code = empCode.value.trim();

  // 1. khali fields check
  if (name === "" || department === "" || salary === "" || code === "") {
    showError("Please fill all the fields.");
    return;
  }

  // 2. salary check
  if (!Number.isFinite(Number(salary)) || Number(salary) <= 0) {
    showError("Salary must be more than 0.");
    return;
  }

  let employees = getEmployees();

  // 3. code admin ka to nahi?
  if (code === localStorage.getItem("adminCode")) {
    showError("This code is not allowed. Choose another.");
    return;
  }

  // 4. code pehle se kisi aur ka to nahi?
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].code === code) {
      showError("This code is already used. Choose another.");
      return;
    }
  }

  // 5. save karo
  employees.push({
    name: name,
    department: department,
    salary: Number(salary),
    code: code,
    paid: false
  });
  saveEmployees(employees);

  // 6. form saaf karo
  empName.value = "";
  empDepartment.value = "";
  empSalary.value = "";
  empCode.value = "";

  showSuccess(name + " added successfully");
  showEmployees();
}

// ---------- Employee delete karna ----------
function deleteEmployee(index) {
  // Swal.fire popup dikhata hai. .then tab chalta hai jab user button dabaye.
  Swal.fire({
    title: "Delete this employee?",
    text: "This cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    confirmButtonText: "Yes, delete"
  }).then(function (result) {
    if (result.isConfirmed) {
      let employees = getEmployees();
      employees.splice(index, 1);
      saveEmployees(employees);
      showEmployees();
      showSuccess("Employee deleted");
    }
  });
}

// ---------- Events ----------
addEmployeeBtn.addEventListener("click", addEmployee);

logoutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  logout();
});

showEmployees();
