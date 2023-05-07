const db = require("./config");

// use the database
const useDatabase = () => {
  return new Promise((resolve, reject) => {
    db.query("USE pharmacy_management_system;", (err, results) => {
      if (err) reject(err);
      resolve();
    });
  });
};
module.exports = useDatabase;
