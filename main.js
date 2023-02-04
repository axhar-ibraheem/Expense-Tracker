const form = document.getElementById("form");
const list = document.getElementById("list");

form.addEventListener("submit", addExpense);
function addExpense(e) {
  e.preventDefault();
  //storing the expense details to the local storage
  const amount = document.getElementById("expenseAmount");
  const description = document.getElementById("description");
  const category = document.getElementById("category");
  const expenseDetails = {
    amount: amount.value,
    description: description.value,
    category: category.value,
  };
  const expenseDetailsString = JSON.stringify(expenseDetails);
  localStorage.setItem(`${amount.value}`, expenseDetailsString);

  //creating delete and edit buttons
  var row = document.createElement("div");
  row.className =
    "row justify-content-between mt-2 bg-success-subtle pt-2 border rounded";

  var div1 = document.createElement("div");
  div1.className = "col-sm-10 col-md-6 mb-2";
  var amountTextNode = document.createTextNode(amount.value);
  var descriptionTextNode = document.createTextNode(`, ${description.value}, `);
  var categoryTextNode = document.createTextNode(`${category.value} `);
  div1.append(amountTextNode, descriptionTextNode, categoryTextNode);

  var div2 = document.createElement("div");
  div2.className = "col-auto mb-2 ";
  const delButton = document.createElement("button");
  const editButton = document.createElement("button");
  delButton.className = "btn btn-danger mx-1 delete";
  editButton.className = "btn btn-dark mx-1 edit";
  var editButtonTextNode = document.createTextNode("Edit");
  var delButtonTextNode = document.createTextNode("Delete");
  delButton.appendChild(delButtonTextNode);
  editButton.appendChild(editButtonTextNode);

  div2.append(delButton, editButton);
  row.append(div1, div2);
  list.appendChild(row);
}
//delete functionality

list.addEventListener("click", deleteUser);
function deleteUser(e) {
  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    localStorage.removeItem(
      li.parentElement.firstElementChild.childNodes[0].nodeValue
    );
    list.removeChild(li.parentElement);
  }
}

//edit functionality
list.addEventListener("click", editUser);
function editUser(e) {
  if (e.target.classList.contains("edit")) {
    var li = e.target.parentElement;
    var amount = li.parentElement.firstElementChild.childNodes[0].nodeValue;
    var obj = JSON.parse(localStorage.getItem(amount));
    document.getElementById("expenseAmount").value = obj.amount;
    document.getElementById("description").value = obj.description;
    document.getElementById("category").value = obj.category;
    list.removeChild(li.parentElement);
    localStorage.removeItem(obj.amount);
  }
}
