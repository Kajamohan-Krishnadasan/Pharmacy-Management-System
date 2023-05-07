const categoriesTable = document.getElementById('categories-table');

// Make a request to the server to get all categories
fetch('/categories')
  .then(response => response.json())
  .then(categories => {
    categories.forEach(category => {
      // Create a new row for the category and add it to the table
      const row = categoriesTable.insertRow();
      const idCell = row.insertCell();
      const nameCell = row.insertCell();
      const descriptionCell = row.insertCell();
      idCell.innerText = category.id;
      nameCell.innerText = category.name;
      descriptionCell.innerText = category.description;
    });
  })
  .catch(error => console.error(error));
