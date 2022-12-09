module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/register", users.register);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Get detail User
  router.get("/:id", users.findOne);

  // Delete User by id
  router.delete("/:id", users.delete);

  app.use("/api/users", router);
};
