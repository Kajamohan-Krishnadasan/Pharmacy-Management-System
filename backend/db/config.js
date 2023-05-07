const initialSetup = require("./initial_setup");
const mysql = require("mysql");

const config = {
  host: "localhost",
  user: "root",
  password: "",
};

// Create a connection to MySQL
const db = mysql.createConnection(config);

// Connect to MySQL
db.connect((err) => {
  initialSetup(err);
});

module.exports = db;
