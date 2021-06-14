const User = require("../model/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const user = new User({
        EmpID: req.body.EmpID,
        First_name: req.body.First_name,
        Last_name: req.body.Last_name,
        Salary: req.body.Salary,
        Contact: req.body.Contact,
        Empcode: req.body.Empcode,
    });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

//Retrieve all users
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

//Retrieve a single user
exports.findOne = (req, res) => {
  User.findById(req.params.EmpID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.EmpID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.EmpID
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.customerId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.EmpID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.EmpID
          });
        }
      } else res.send(data);
    }
  );
};


exports.delete = (req, res) => {
  User.remove(req.params.EmpID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.EmpID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.EmpID
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
};
