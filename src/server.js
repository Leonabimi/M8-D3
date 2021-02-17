const express = require("express");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");

const usersRouter = require("./services/users")

const server = express();

const port = process.env.PORT;
server.use(express.json());

server.use("/users", usersRouter)

console.log(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((error) => console.log(error));
