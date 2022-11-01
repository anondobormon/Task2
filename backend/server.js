//External Imports
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

//Internal Imports
const errorMiddleware = require("./middleware/errorMiddleware");
const connectDatabase = require("./database/database");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const productModel = require("./model/productModel");

//configuration
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
dotenv.config({ path: "backend/config/config.env" });

//connect database
connectDatabase();

//routing
app.use("/api", userRoute);
app.use("/api", productRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Error middleware
app.use(errorMiddleware);

//Run server port
const server = app.listen(process.env.PORT, () => {
  console.log("Server Running on port", process.env.PORT);
});

//Unhandled promise rejection errors
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
