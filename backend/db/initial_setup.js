const checkIfDatabaseExists = require("./check_db");
const createDatabase = require("./create_db");
const createTable = require("./create_table");
const checkIfTablesExists = require("./check_table");

// Initialize the database and tables
const initialSetup = (err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");

  // Check if the database exists
  checkIfDatabaseExists()
    .then((databaseExists) => {
      console.log(`Database exists: ${databaseExists}`);

      if (!databaseExists) {
        // Create the database
        createDatabase()
          .then(() => {
            // Create the tables

            createTable()
              .then(() => {
                console.log("New Database and Tables are created successfully");
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      } else if (databaseExists) {
        // Check if the tables are existed
        checkIfTablesExists()
          .then((tablesExists) => {
            console.log(`Tables exists: ${tablesExists}`);

            if (!tablesExists) {
              // Create the tables
              createTable()
                .then(() => {
                  console.log(
                    "Database is existed. And Tables are created successfully"
                  );
                })
                .catch((err) => console.error(err));
            } else if (tablesExists) {
              console.log("Database and Tables are existed");
            }
          })
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));
};

module.exports = initialSetup;
