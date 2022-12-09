const db = require("../models");
const User = db.users;
var bcrypt = require("bcryptjs");

// Create and Save a new User
exports.register = async (req, res) => {
  // Get user input
  const { first_name, last_name, email, phone, password } = req.body;

  // Validate user input
  if (!(email && password && first_name && last_name)) {
    res.status(400).send("All input is required");
  }

  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }

  //Encrypt user password
  encryptedPassword = await bcrypt.hash(password, 10);

  // Create a User
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    email: email.toLowerCase(),
    phone: phone,
    password: encryptedPassword,
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).end(
        JSON.stringify({
          data: data.length !== 0 ? data : null,
          status: 500,
          message: "Create data User gagal",
        })
      );
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: email } : {};

    User.find(condition)
      .then((data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            data: data.length !== 0 ? data : null,
            status: 200,
            message: "Berhasil mendapatkan data users",
          })
        );
      })
      .catch((err) => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).end(
          JSON.stringify({
            data: data.length !== 0 ? data : null,
            status: 200,
            message: "Berhasil mendapatkan data users",
          })
        );
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`,
          });
        } else {
          res.send({
            message: "User was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete User with id=" + id,
        });
      });
};
