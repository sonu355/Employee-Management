var editingEmployeeIndex = -1;
var editingEmployeeIndex = -1;

function onFormSubmit(event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var position = document.getElementById("position").value;
  var about = document.getElementById("about").value;
  var joiningDate = document.getElementById("joining_date").value;
  var employee = {
    name: name,
    position: position,
    about: about,
    joiningDate: joiningDate
  };
  var employees = JSON.parse(localStorage.getItem("employees")) || [];
  if (editingEmployeeIndex !== -1) {
    employees[editingEmployeeIndex] = employee;
    editingEmployeeIndex = -1;
  } else {
    employees.push(employee);
  }
  localStorage.setItem("employees", JSON.stringify(employees));
  clearFormFields();
  displayEmployeeTable();
}

function clearFormFields() {
  document.getElementById("name").value = "";
  document.getElementById("position").value = "";
  document.getElementById("about").value = "";
  document.getElementById("joining_date").value = "";
}

function editEmployee(index) {
  var employees = JSON.parse(localStorage.getItem("employees")) || [];
  if (index >= 0 && index < employees.length) {
    var employee = employees[index];
    document.getElementById("name").value = employee.name;
    document.getElementById("position").value = employee.position;
    document.getElementById("about").value = employee.about;
    document.getElementById("joining_date").value = employee.joiningDate;
    editingEmployeeIndex = index;
  }
}

function deleteEmployee(index) {
  var employees = JSON.parse(localStorage.getItem("employees")) || [];
  if (index >= 0 && index < employees.length) {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployeeTable();
  }
}

function displayEmployeeTable() {
  var employees = JSON.parse(localStorage.getItem("employees")) || [];
  var tableBody = document.getElementById("employeeTableBody");
  tableBody.innerHTML = "";
  employees.forEach(function (employee, index) {
    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.about}</td>
      <td>${employee.joiningDate}</td>
      <td><button onclick="editEmployee(${index})">Edit</button></td>
      <td><button onclick="deleteEmployee(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

displayEmployeeTable();

var form = document.getElementById("employeeForm");
form.addEventListener("submit", onFormSubmit);
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', searchEmployees);


