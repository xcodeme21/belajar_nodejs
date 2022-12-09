const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to belajar nodejs application." });
});

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
