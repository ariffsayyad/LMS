const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password", // Change this to your database password
  database: "lms"
});

// User login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    if (result.length === 0) {
      return res.status(404).send("User not found");
    }

    // Increment login count
    const user = result[0];
    const newLoginCount = user.login_count + 1;
    db.query("UPDATE users SET login_count = ? WHERE email = ?", [newLoginCount, email], (err, updateResult) => {
      if (err) {
        return res.status(500).send("Error updating login count");
      }
      res.status(200).json({ email: user.email, login_count: newLoginCount });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


function userLogin(email, password) {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      console.log("User logged in: ", data);
      // Do something with the response, e.g., update UI
    })
    .catch(error => console.error("Error:", error));
  }
  