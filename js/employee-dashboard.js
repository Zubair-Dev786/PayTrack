// ============================================================
// employee-dashboard.js - employee ka apna page
// ============================================================

// ---------- Tags select karna ----------
let welcomeText = document.getElementById("welcomeText");
let myDepartment = document.getElementById("myDepartment");
let mySalary = document.getElementById("mySalary");
let myStatus = document.getElementById("myStatus");
let logoutBtn = document.getElementById("logoutBtn");

// ---------- Login check ----------
checkEmployee();

// ---------- Apni details dikhana ----------
function showMyDetails() {
  let myCode = sessionStorage.getItem("employeeCode");
  let employees = getEmployees();

  let me = employees.find(function (employee) {
    return employee.code === myCode;
  });

  // admin ne employee delete kar diya ho to logout
  if (me === undefined) {
    logout();
    return;
  }

  welcomeText.innerText = "Welcome, " + me.name;
  myDepartment.innerText = me.department;
  mySalary.innerText = "Rs " + me.salary;

  if (me.paid === true) {
    myStatus.innerText = "Paid";
    myStatus.className = "paid-tag";
  } else {
    myStatus.innerText = "Pending";
    myStatus.className = "pending-tag";
  }
}

// ---------- Events ----------
logoutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  logout();
});

showMyDetails();
