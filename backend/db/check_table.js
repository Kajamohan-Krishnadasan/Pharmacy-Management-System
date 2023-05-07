const db = require("./config");
const useDatabase = require("./use_db");


// check if the tables are existed or not
const checkIfTablesExists = () => {
  return new Promise((resolve, reject) => {
    useDatabase().then(() => {
      db.query("SHOW TABLES;", (err, results) => {
        if (err) {
          reject(err);
          //   return; // if there is an error, un-comment this line
        }

        const tables = results.map((result) => Object.values(result)[0]);

        // console.log("tables", tables);

        const tablesExists =
          tables.includes("users") &&
          tables.includes("categories") &&
          tables.includes("products") &&
          tables.includes("orders") &&
          tables.includes("order_items");
        resolve(tablesExists);
      });
    });
  });
};

export default checkIfTablesExists;
