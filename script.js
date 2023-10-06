import { studentsData } from './resultFilter.js';

// Global variables
var itemsPerPage = parseInt(document.getElementById("maxEntry").value);
let currentPage = 1;
let students = [];
var count = 1;
// Get the table body and pagination elements
var tableBody = document.getElementById('studentTableBody');
var pagination = document.getElementById('pagination');
//load table on start
window.onload = load
//on click submit
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  load()
});

function load() {
  var searchKey = document.getElementById("textInput").value;
  itemsPerPage = parseInt(document.getElementById("maxEntry").value);
  currentPage = 1;
  count = 1;
  //check for key value
  if (searchKey == "" || searchKey == null) {
    students = [];
    // Read the JSON data from a file (assumes the file is named 'data.json')
    fetch('marks.json')
      .then(response => response.json())
      .then(data => createTable(data.students, true))
      .catch(error => console.log(error));
  }
  else {
    var keyType = document.getElementById("dropdown").value;
    createTable(studentsData(students, keyType, searchKey), false)
  }
}

// Function to create the table
function createTable(studentData, isComplete) {
  if (isComplete)
    students = studentData;
  var res = studentData;
  if (res == "")
    alert("No data found. Try searching with different parameters")
  // Calculate total pages
  var totalPages = Math.ceil(res.length / itemsPerPage);

  // Clear the table body and pagination
  tableBody.innerHTML = '';
  pagination.innerHTML = '';

  // Determine the start and end index of the current page
  var startIndex = (currentPage - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;
  //serial no count
  count = (currentPage -1) * itemsPerPage + 1;
  // Get the students for the current page
  var currentPageStudents = res.slice(startIndex, endIndex);
  // Iterate over the students and create rows
  currentPageStudents.forEach(student => {
    var row = document.createElement('tr');
	count = count++;
    // Create cells for each student property
    var countCell = document.createElement('td');
    countCell.textContent = count++;
    row.appendChild(countCell);

    var idCell = document.createElement('td');
    idCell.textContent = student.id;
    row.appendChild(idCell);

    var nameCell = document.createElement('td');
    nameCell.textContent = student.name;
    row.appendChild(nameCell);

    var marksCell = document.createElement('td');
    marksCell.textContent = student.marks;
    row.appendChild(marksCell);

    var resultCell = document.createElement('td');
    resultCell.textContent = student.result;
    row.appendChild(resultCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });

  // Create pagination links
  for (let i = 1; i <= totalPages; i++) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = i;
    if (i === currentPage) {
      link.className = 'active';
    }
    link.addEventListener('click', () => {
      currentPage = i;
      createTable(res);
    });
    pagination.appendChild(link);
  }
}