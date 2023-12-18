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

mongoose.connect(`${process.env.MONGO__URL}`).then(() => {
  console.log("DB CONNECTED");
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
