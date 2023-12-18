require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/clients.routes");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.use("/clients", routes);

mongoose.connect("mongodb+srv://nitish2002:nitish2002@clients.lbuufhg.mongodb.net/clients?retryWrites=true&w=majority").then(() => {
  console.log("DB CONNECTED");
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
