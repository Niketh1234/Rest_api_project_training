let products = [
  { id: "1001", price: 2000, name: "pankaj" },
  { id: "1002", price: 1000, name: "niketh" },
  { id: "1003", price: 2000, name: "abid" },
  { id: "1004", price: 1696, name: "sathvik" },
  { id: "1005", price: 1000, name: "ajay" },
  { id: "1006", price: 2000, name: "bhumika" },
  { id: "1007", price: 1000, name: "vujwalla" },
  { id: "1008", price: 1000, name: "madhu" },
];

const GetProducts = (req, res) => {
  res.status(200).send(products);
};

const AddProducts = (req, res) => {
  var newProduct = req.body;
  products.push(newProduct);
  res.status(200).send(newProduct);
};

const GetProduct = (req, res) => {
  let index = req.params.id;
  let productIndex = products.findIndex((product) => product.id === index);
  if (productIndex != -1) res.status(200).send(products[productIndex]);
  else res.status(400).send("Product not found");
};

const DeleteProduct = (req, res) => {
  let index = req.params.id;
  let productIndex = products.findIndex((product) => product.id === index);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.status(200).send("Entity deleted successfully");
  } else {
    res.status(400).send("Product not found");
  }
};

const UpdateProduct = (req, res) => {
  let index = req.params.id;
  let productIndex = products.findIndex((product) => product.id === index);

  if (productIndex !== -1) {
    let updatedProduct = req.body;
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.status(200).send(products[productIndex]);
  } else {
    res.status(400).send("Product not found");
  }
};

module.exports = {
  GetProducts,
  AddProducts,
  GetProduct,
  DeleteProduct,
  UpdateProduct,
};
