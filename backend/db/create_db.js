const db = require("./config");

// Create the database
const createDatabase = () => {
  return new Promise((resolve, reject) => {
    db.query("CREATE DATABASE pharmacy_management_system;", (err, results) => {
      if (err) reject(err);
      resolve();
    });
  });
};

module.exports = createDatabase;
