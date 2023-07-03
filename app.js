const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Mock user data (replace this with a database in a real application)
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

// Route for user login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Hello World");

  // Validate username format and length
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  const validUsername =
    alphanumericRegex.test(username) &&
    username.length >= 6 &&
    username.length <= 12;

  // Validate password length
  const validPassword = password.length >= 6;

  if (validUsername && validPassword) {
    // Check if the user exists
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Successful login
      res.status(200).json({ message: "Login successful" });
    } else {
      // Invalid credentials
      res.status(401).json({ error: "Invalid username or password" });
    }
  } else {
    // Invalid username or password format/length
    res
      .status(400)
      .json({ error: "Invalid username or password format/length" });
  }
});

// Start the server
const port = 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
