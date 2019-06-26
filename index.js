const express = require("express");

const server = express();

server.use(express.json());

//Players
const users = ["Player01", "Player02", "Player03", "Player04"];

//Global Middleware for logs
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Method: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

//Local Middleware
function checkUserExists(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const { index } = req.params;
  const user = users[index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

server.get("/server", (req, res) => {
  return res.send({ message: "Server on" });
});

// Query params = ?name=Wolf
server.get("/user", (req, res) => {
  const { name } = req.query;
  return res.json({ message: `${name} Profile` });
});

// Route params = /users/1
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

// Request body = { "name": Lobo, "email": "lobo@mau.com.br"}
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

//Update Player name by index
server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//Delete Player by index
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
