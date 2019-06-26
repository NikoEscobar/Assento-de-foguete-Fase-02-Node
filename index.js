const express = require("express");

const server = express();

server.use(express.json());

//Players
const users = ["Player01", "Player02", "Player03", "Player04"];

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

// Request body = { "name": Lobo, "email": "lobo@mau.com.br"}
server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//Update Player name by index
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//Delete Player by index
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
