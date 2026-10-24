// ============================================================
// common.js - har page par add hoti hai (SweetAlert ke baad)
// ============================================================

// ---------- 1. Admin code save karna (sirf pehli baar) ----------
if (localStorage.getItem("adminCode") === null) {
  localStorage.setItem("adminCode", "admin123");
}

// ---------- 2. Employees ki list lena ----------
function getEmployees() {
  let data = localStorage.getItem("employees");

  if (data === null) {
    return [];
  }

  return JSON.parse(data);
}

// ---------- 3. Employees ki list save karna ----------
function saveEmployees(list) {
  localStorage.setItem("employees", JSON.stringify(list));
}

// ---------- 4. Login check ----------
function checkAdmin() {
  if (sessionStorage.getItem("role") !== "admin") {
    window.location.href = "index.html";
  }
}

function checkEmployee() {
  if (sessionStorage.getItem("role") !== "employee") {
    window.location.href = "index.html";
  }
}

// ---------- 5. Logout ----------
function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

// ---------- 6. SweetAlert popups ----------
// Error popup (laal cross)
function showError(text) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
    confirmButtonColor: "#4f46e5"
  });
}

// Success popup (hara tick, 1.5 second baad khud band ho jata hai)
function showSuccess(title) {
  Swal.fire({
    icon: "success",
    title: title,
    timer: 1500,
    showConfirmButton: false
  });
}
