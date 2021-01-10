// Import environmental variable.
require("dotenv").config();

// Imports express, mongoose, body-parser, cookie-parser & cors.
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import Routes.
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");


// Middleware.
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes.
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);



// Database Connection.
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED ..");
  })
  .catch(() => {
    console.log("UNABLE TO CONNECT TO DB ..");
  });

const port = 4000;

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.listen(port, () => {
  console.log(`NodeJS Server Started On Port Number ${port}`);
});
