const express = require("express");
const app = express();
const mysql = require("mysql");

app.get("/posts/:id", (req, res, next) => {
  const postID = req.params.id;
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loginsystem",
    port: 3306,
  });
  const queryString = "SELECT * FROM posts WHERE id=?";
  connection.query(queryString, [postID], (err, rows, fields) => {
    if (err) {
      res.send(`Something is wrong ${err}`);
      next();
    }
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
