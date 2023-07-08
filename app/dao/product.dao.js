const sql = require('./db');

class Product {
  constructor(id, name, description, price) {
    this.id = Product.id;
    this.name = Product.name;
    this.description = Product.description;
    this.price = Product.price;
  }
  // Method to get all products
  static getAll(name, callback) {
    let query = 'SELECT * FROM product';
    if (name) {
      query += `WHERE name LIKE ' %${name}%'`;
    }
    sql.query(query, (error, results) => {
      if (error) {
        console.log("Error: ", error);
        callback(error, null);
        return;
      }
      console.log("Success:", results);
      callback(null, results);
    });
  }
  // Method to create a new product
  static create(newProduct, callback) {
    var query = `INSERT INTO product SET ?`;
    sql.query(query, newProduct, (error, result) => {
      if (error) {
        console.log("error", error);
        callback(error, null);
      } else {
        console.log("created product", result);
        const newProductId = result.insertId;
        callback(null, newProductId);
      }
    });
  }
  // Method to get a product by ID
  static findById(id, callback) {
    sql.query(
      `SELECT * FROM product WHERE id = ${id}`,
      [id],
      (error, results) => {
        if (error) {
          callback(error, null);
        } else if (results.length === 0) {
          callback(null, null);
        } else {
          const productData = results[0];
          const product = new Product(
            productData.id,
            productData.name,
            productData.description,
            productData.price
          );
          callback(null, product);
        }
      }
    );
  }
  // Method to update a product by ID
  static updateById(id, product, callback) {
    var query = `UPDATE product SET name = ? , description =?, price =? WHERE id = ${id}`;
    sql.query(query, [product.name, product.description, product.price], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        callback(null, err);
        return;
      } else if (result.affectedRows === 0) {
        callback(new Error('Product not found'), null);
      } else {
        callback(null, 'Product updated successfully');
      }
    });
  }
  // Method to find all costly products
  static findAllCostlyProducts(price, callback) {
    let query = "SELECT * FROM product";
    if (price) {
      query += `WHERE price > ${price}`;
    }
    sql.query(query, (err, result) => {
      if (err) {
        console.log("Error: ", err);
        callback(null, err);
        return;
      }
      console.log("products:", result);
      callback(null, result);
    });
  }
  // Method to delete a product by ID
  static remove(id, callback) {
    var query = `DELETE FROM product WHERE id = ?`;
    sql.query(query, [id], (err, result) => {
      if (err) {
        console.log("Error: ", err);
        callback(null, err);
        return;
      } else if (result.affectedRows === 0) {
        callback(new Error('Product not found'), null);
      } else {
        callback(null, 'Product deleted successfully');
      }
    });
  }
  // Method to delete all products
  static removeAll(callback) {
    var query = "DELETE FROM Product";
    sql.query(query, (err, result) => {
      if (err) {
        console.log("Error: ", err);
        callback(null, err);
        return;
      }
      console.log(`deleted: ${result.affectedRows} products`);
      result(null, result);
    }); //
  }
}










       //Method to delete all product

  
  module.exports = Product;