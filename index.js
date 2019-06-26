const express = require("express");

const server = express();

//Players
const users = ["Player01", "Player02", "Player03"];

server.get("/server", (req, res) => {
  return res.send({ message: "Server on" });
});

// Query params = ?name=Wolf
server.get("/user", (req, res) => {
  const { name } = req.query;
  return res.json({ message: `${name} Profile ` });
});

// Route params = /users/1
server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.listen(3000);

// Request body = { "name": Lobo, "email": "lobo@mau.com.br"}
