const form = document.getElementById("form");
const tableBody = document.getElementById("tableBody");
const overlay = document.getElementById("successOverlay");

const passion = document.getElementById("passion");
const growth = document.getElementById("growth");
const passionValue = document.getElementById("passionValue");
const growthValue = document.getElementById("growthValue");

passion.oninput = () => passionValue.textContent = passion.value;
growth.oninput = () => growthValue.textContent = growth.value;

function loadData(){
  const data = JSON.parse(localStorage.getItem("applications")) || [];
  tableBody.innerHTML = "";
  data.forEach(item => addRow(item));
}

function addRow(data){
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${data.name}</td>
    <td>${data.motivation}</td>
    <td>${data.passion}</td>
    <td>${data.growth}</td>
  `;
  tableBody.appendChild(row);
}

form.addEventListener("submit", function(e){
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    motivation: document.getElementById("motivation").value,
    passion: passion.value,
    growth: growth.value
  };

  const stored = JSON.parse(localStorage.getItem("applications")) || [];
  stored.push(data);
  localStorage.setItem("applications", JSON.stringify(stored));

  addRow(data);

  overlay.classList.add("show");
  setTimeout(() => overlay.classList.remove("show"), 2000);

  form.reset();
  passionValue.textContent = "5";
  growthValue.textContent = "5";
});

loadData();
