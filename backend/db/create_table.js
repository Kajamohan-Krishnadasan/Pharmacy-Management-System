const db = require("./config");
const useDatabase = require("./use_db");


// Create the tables in the database queries
const createUsersTableQuery = `
    CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT, 
        username VARCHAR(50) NOT NULL, 
        password VARCHAR(100) NOT NULL, 
        email VARCHAR(100) NOT NULL, 
        is_admin BOOLEAN DEFAULT 0, 
        PRIMARY KEY (id), 
        UNIQUE KEY (username), 
        UNIQUE KEY (email)
    ); `;

const createCategoriesTableQuery = `
    CREATE TABLE categories (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        PRIMARY KEY (id)
    );`;

const createProductsTableQuery = `
    CREATE TABLE products (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        category_id INT(11),
        stock INT(11) NOT NULL,
        image_url VARCHAR(255),
        PRIMARY KEY (id),
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);`;

const createOrdersTableQuery = `
    CREATE TABLE orders (
        id INT(11) NOT NULL AUTO_INCREMENT,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );`;

const createOrderItemsTableQuery = `
    CREATE TABLE order_items (
        id INT(11) NOT NULL AUTO_INCREMENT,
        order_id INT(11) NOT NULL,
        product_id INT(11) NOT NULL,
        quantity INT(11) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );`;

// Create the tables in the database
const createTable = () => {
  return new Promise((resolve, reject) => {
    useDatabase().then(() => {
      db.query(createUsersTableQuery, (err, results) => {
        if (err) reject(err);
        db.query(createCategoriesTableQuery, (err, results) => {
          if (err) reject(err);
          db.query(createProductsTableQuery, (err, results) => {
            if (err) reject(err);
            db.query(createOrdersTableQuery, (err, results) => {
              if (err) reject(err);
              db.query(createOrderItemsTableQuery, (err, results) => {
                if (err) reject(err);
                resolve();
              });
            });
          });
        });
      });
    });
  });
};

module.exports = createTable;
