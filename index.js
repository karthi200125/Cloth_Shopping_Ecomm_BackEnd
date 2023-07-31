// index.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
const searchRoute = require("./routes/search");

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection failed", err));

  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", authRoute);
  app.use("/api/products", productRoute);
  app.use("/api/checkout", stripeRoute);
  app.use("/api/search", searchRoute);
  
  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });
  