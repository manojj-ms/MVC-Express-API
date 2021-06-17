module.exports = app => {
  const users = require("../controller/user.controller.js");

  // Create a new User
  app.post("/create/users", users.create);

  // Retrieve all users
  app.get("/users", users.findAll);

   // Retrieve a single user with UserId
  app.get("/users/:EmpID", users.findOne);

  // Retrieve a single user with UserId
  app.get("/users?First_name=[kw]", users.findName);

   // Update a Customer with customerId
  app.put("/users/:EmpID", users.update);
 
  // Delete a Customer with customerId
  app.delete("/users/:EmpID", users.delete);

  // Delete all customer
  app.delete("/users", users.deleteAll);

};

