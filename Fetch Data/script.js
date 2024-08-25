function showProduct() {
  fetch("http://localhost:3000/api/v1/products")
    .then((res) => res.json())
    .then((info) => {
      console.log(info);
      let table = document.getElementById("myTable");
      for (let product of info) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${product.id}</td>
          <td contenteditable="false">${product.name}</td>
          <td contenteditable="false">${product.price}</td>
          <td>
            <button onclick="editProduct(this, ${product.id})" class="edit-btn">Edit</button>
            <button onclick="updateProduct(${product.id})" class="update-btn" style="display:none;">Update</button>
            <button onclick="deleteProduct(${product.id})" class="delete-btn">Delete</button>
          </td>
        `;
        table.appendChild(newRow);
      }
    });
}

function editProduct(button, id) {
  let row = button.parentElement.parentElement;
  let cells = row.getElementsByTagName("td");
  for (let i = 1; i < cells.length - 1; i++) {
    cells[i].setAttribute("contenteditable", "true");
  }
  button.style.display = "none";
  row.querySelector(".update-btn").style.display = "inline-block";
}

function updateProduct(id) {
  let row = document.querySelector(`button[onclick="updateProduct(${id})"]`)
    .parentElement.parentElement;
  let cells = row.getElementsByTagName("td");
  let updatedProduct = {
    name: cells[1].innerText,
    price: cells[2].innerText,
  };

  fetch(`http://localhost:3000/api/v1/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedProduct),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((info) => {
      alert("Product updated successfully");
      for (let i = 1; i < cells.length - 1; i++) {
        cells[i].setAttribute("contenteditable", "false");
      }
      row.querySelector(".edit-btn").style.display = "inline-block";
      row.querySelector(".update-btn").style.display = "none";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addProduct() {
  var id = document.getElementById("idText");
  var title = document.getElementById("nameText");
  var price = document.getElementById("priceText");

  fetch("http://localhost:3000/api/v1/products", {
    method: "POST",
    body: JSON.stringify({
      id: id.value,
      name: title.value,
      price: price.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((info) => {
      alert("Product added successfully");
      let table = document.getElementById("myTable");
      table.innerHTML = `<tr>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th></tr>`;
      showProduct();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  document.getElementById("idText").value = "";
  document.getElementById("nameText").value = "";
  document.getElementById("priceText").value = "";
}

function deleteProduct(id) {
  let url = `http://localhost:3000/api/v1/products/${id}`;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        let table = document.getElementById("myTable");
        table.innerHTML = `<tr>
        <th>Id</th>
        <th>Name</th>
        <th>Price</th>
        <th>Actions</th></tr>`;
        showProduct(); // Fetch and display updated product list
        alert("Product deleted successfully");
      } else {
        alert("Product not found");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function searchProduct() {
  let search = document.getElementById("searchBox");
  let url = `http://localhost:3000/api/v1/products/`;
  let table = document.getElementById("myTable");
  table.innerHTML = `<tr>
    <th>Id</th>
    <th>Name</th>
    <th>Price</th>
    <th>Actions</th></tr>`;
  fetch(url + search.value.toString())
    .then((res) => res.json())
    .then((info) => {
      let newRow = document.createElement("tr");
      newRow.innerHTML = `
          <td>${info.id}</td>
          <td contenteditable="false">${info.name}</td>
          <td contenteditable="false">${info.price}</td>
          <td>
            <button onclick="editProduct(this, ${info.id})" class="edit-btn">Edit</button>
            <button onclick="updateProduct(${info.id})" class="update-btn" style="display:none;">Update</button>
            <button onclick="deleteProduct(${info.id})" class="delete-btn">Delete</button>
          </td>
        `;
      table.appendChild(newRow);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function cancelProductSearch() {
  showProduct();
  document.getElementById("searchBox").value = "";
}
