const sql = require("./db.js");

// constructor
const User = function(user) {
  this.EmpID = user.EmpID;
  this.First_name = user.First_name;
  this.Last_name = user.Last_name;
  this.Salary = user.Salary;
  this.Contact = user.Contact;
};

//Create the user query
User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { EmpID: res.insertEmpID, ...newUser });
    result(null, { EmpID: res.insertEmpID, ...newUser });
  });
};


//Get the all users
User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

//Get the user with ID
User.findById = (EmpID, result) => {
  sql.query(`SELECT * FROM users WHERE EmpID = ${EmpID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

//Update a user with Id
User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET EmpID = ?, First_name = ?, Last_name = ?, Salary = ?, Contact = ?, Empcode = ? WHERE EmpID = ?",
    [user.EmpID, user.First_name, user.Last_name, user.Contact, user.Salary, user.Empcode],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { EmpID: EmpID, ...user });
      result(null, { EmpID: EmpID, ...user });
    }
  );
};

//Delete a user
User.remove = (EmpID, result) => {
  sql.query("DELETE FROM users WHERE EmpID = ?", EmpID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with EmpID: ", EmpID);
    result(null, res);
  });
};

//Remove all the users
User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};


module.exports = User;