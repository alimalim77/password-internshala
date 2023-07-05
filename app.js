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

// Route for user login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Hello World");

  // Validate username format and length
  const isAlphanumeric = (str) => {
    // Check if the string contains only alphanumeric characters
    const alphanumericChars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < str.length; i++) {
      if (!alphanumericChars.includes(str[i])) {
        return false;
      }
    }

    return true;
  };

  const validUsername =
    isAlphanumeric(username) && username.length >= 6 && username.length <= 12;

  // Validate password length
  const validPassword = password.length >= 6;

  if (validUsername && validPassword) {
    // Successful login
    res.status(200).json({ message: "Login successful" });
  } else {
    // Invalid credentials
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// Start the server
const port = 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
