const db = require("./config");

// Check if the database exists or not
const checkIfDatabaseExists = () => {
  return new Promise((resolve, reject) => {
    db.query("SHOW DATABASES;", (err, results) => {
      if (err) {
        reject(err);
        // return; // if there is an error, un-comment this line
      }

      const databases = results.map((result) => result.Database);

      const databaseExists = databases.includes("pharmacy_management_system");
      resolve(databaseExists);
    });
  });
};

module.exports = checkIfDatabaseExists;
