require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/user");

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED ..");
  }).catch(() => {
      console.log("UNABLE TO CONNECT TO DB ..")
  })


const port = 3000;

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.listen(port, () => {
  console.log(`NodeJS Server Started On Port Number ${port}`);
});
