
let empName = document.getElementById("empName");
let empDepartment = document.getElementById("empDepartment");
let empSalary = document.getElementById("empSalary");
let empCode = document.getElementById("empCode");
let employeeTable = document.getElementById("employeeTable");
let addEmployeeBtn = document.getElementById("addEmployeeBtn");
let logoutBtn = document.getElementById("logoutBtn");

checkAdmin();

function showEmployees() {
  let employees = getEmployees();
  employeeTable.innerHTML = "";

  if (employees.length === 0) {
    employeeTable.innerHTML += `
      <tr>
        <td colspan="5">No employees yet. Add one above.</td>
      </tr>
    `;
    return;
  }

  for (let i = 0; i < employees.length; i++) {
    employeeTable.innerHTML += `
      <tr>
        <td>${employees[i].name}</td>
        <td>${employees[i].department}</td>
        <td>Rs ${employees[i].salary}</td>
        <td>${employees[i].code}</td>
        <td>
          <button class="btn-delete" id="delete-${i}">Delete</button>
        </td>
      </tr>
    `;
  }

  for (let i = 0; i < employees.length; i++) {
    let deleteBtn = document.getElementById(`delete-${i}`);

    deleteBtn.addEventListener("click", function () {
      deleteEmployee(i);
    });
  }
}


function addEmployee() {
  let name = empName.value.trim();
  let department = empDepartment.value;
  let salary = empSalary.value;
  let code = empCode.value.trim();

  if (name === "" || department === "" || salary === "" || code === "") {
    showError("Please fill all the fields.");
    return;
  }

  if (!Number.isFinite(Number(salary)) || Number(salary) <= 0) {
    showError("Salary must be more than 0.");
    return;
  }

  let employees = getEmployees();

  if (code === localStorage.getItem("adminCode")) {
    showError("This code is not allowed. Choose another.");
    return;
  }

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].code === code) {
      showError("This code is already used. Choose another.");
      return;
    }
  }

  employees.push({
    name: name,
    department: department,
    salary: Number(salary),
    code: code,
    paid: false
  });

  saveEmployees(employees);

  empName.value = "";
  empDepartment.value = "";
  empSalary.value = "";
  empCode.value = "";

  showSuccess(name + " added successfully");
  showEmployees();
}

function deleteEmployee(index) {
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

addEmployeeBtn.addEventListener("click", addEmployee);

logoutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  logout();
});

showEmployees();
