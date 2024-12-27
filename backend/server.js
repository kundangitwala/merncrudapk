const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 8000;
dotenv.config();
const userRoute = require("./routes/userRoute");
const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.URI)
  .then(() => {
    // console.log("connected to database");
    app.listen(port,'0.0.0.0', () => {
      // if (err) console.log(err);
      // console.log("running successfully at", process.env.PORT);
    });
  })
  .catch((error) => {
    // console.log(error, "error is reflecting...");
  });

app.use(userRoute);
