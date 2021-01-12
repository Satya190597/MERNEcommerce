// Import environmental variable.
require("dotenv").config();

// Imports express, mongoose, body-parser, cookie-parser & cors.
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import utility functions.
const {
  BadRequest,
  PageNotFound,
  CustomErrorHandler,
  errorHandler,
} = require("./utils/errors");

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
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

/**
 * Note - In Express, 404 responses are not the result of an error,
 * so the error-handler middleware will not capture them.
 * This behavior is because a 404 response simply indicates
 * the absence of additional work to do; in other words,
 * Express has executed all middleware functions and routes,
 * and found that none of them responded.
 * All you need to do is add a middleware function at the very
 * bottom of the stack (below all other functions) to handle a 404 response.
 */
app.use((request, response, next) => {
  const error = new PageNotFound("Unable to find the requested resource.");
  next(error);
});

app.use(errorHandler);

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
