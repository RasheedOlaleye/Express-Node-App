const ProductDAO = require('../dao/product.dao');

// Create a new product
const create = (req, res) => {
  // Validate the request
  if (!req.body) {
    res.status(400).json({ message: "Request body is required" });
    return;
  }

  // Create a new product object
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };

  // Call the DAO method to create the product
  ProductDAO.create(newProduct, (err, data) => {
    if (err) {
      res.status(500).json({ error: "Error creating product" });
    } else {
      res.status(201).json(data);
    }
  });
};


const findAll = (req, res) => {
    const name = req.query.name
    ProductDAO.getAll(name,(err, products) => {
      if (err) {
        res.status(500).send({ error: "Error retrieving products" });
      } else {
        res.send(products);
      }
    });
  };

  // Retrieve a single product by ID
const findOne = (req, res) => {
    const productId = req.params.id;
  
    ProductDAO.findById(productId, (err, product) => {
      if (err) {
        res.status(500).send({ error: "Error retrieving product" });
      } else if (!product) {
        res.status(404).send({ error: `Product not found with ${req.params.id}`});
      } else {
        res.send(product);
      }
    });
  };

  // Retrieve all costly products
const findAllCostlyProducts = (req, res) => {
    const price = req.query.price;
    ProductDAO.getCostlyProducts(price, (err, products) => {
      if (err) {
        res.status(500).send({ error: err.message|| "Error retrieving costly products" });
      } else {
        res.send(products);
      }
    });
  };


  
// Update a single product by ID
const update = (req, res) => {

    // validate productrequest
    if(!req.body){
        res.status(404).send({
            message:"content is required"
        });

    }
    console.log(req.body);
    const productId = req.params.id;
    const { name, description, price } = req.body;
  
    const updatedProduct = {
      id: productId,
      name,
      description,
      price,
    };
  
    ProductDAO.updateById(productId, updatedProduct, (err, result) => {
      if (err) {
        res.status(500).send({ error: "Error updating product" });
      } else if (result === 'Product not found') {
        res.status(404).send({ error: "Product not found" });
      } else {
        res.send({ message: "Product updated successfully" });
      }
    });
  };

  
  // Delete a single product by ID
  const deleteBYID = (req, res) => {
    const productId = req.params.id;
  
    ProductDAO.remove(productId, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Error deleting product" });
      } else if (result === 'Product not found') {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.json({ message: "Product deleted successfully" });
      }
    });
  };
  
// delete all product
  const deleteAll = (req, res) => {
    ProductDAO.removeAll((err, result) => {
      if (err) {
        res.status(500).send({ error: "Error deleting products" });
      } else {
        res.send({ message: "All products deleted successfully" });
      }
    });
  };


module.exports={
  create,
  findAll,
  findAllCostlyProducts,
  findOne,
  deleteAll,
  deleteBYID,
  update,
  
}