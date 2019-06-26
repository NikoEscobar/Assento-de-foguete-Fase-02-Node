const express = require("express");

const server = express();

server.get("/server", (req, res) => {
  return res.send({ message: "Server on" });
});

// Query params = ?name=Wolf
server.get("/user", (req, res) => {
  const { name } = req.query;
  return res.json({ message: `${name} Profile ` });
});

// Route params = /users/1
server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ message: `User id: ${id}` });
});

server.listen(3000);

// Request body = { "name": Lobo, "email": "lobo@mau.com.br"}
