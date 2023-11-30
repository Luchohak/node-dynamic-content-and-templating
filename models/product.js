const db = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageURL, description, price) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageURL, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {}
};
