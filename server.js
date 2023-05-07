const express = require("express");
const { uuid } = require("uuidv4");
const bodyParser = require("body-parser");
const db = require("./backend/db/config");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// add new users
app.post("/users", (req, res) => {
  const user = req.body;
  user.id = uuid();

  db.query("INSERT INTO users SET ?", user, (err, result) => {
    if (err) throw err;
    res.send("User added to database with ID: " + user.id);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000.");
});
