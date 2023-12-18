const routes = require("express").Router();
const {
  getAllClients,
  createClient,
  removeClient,
  updateClient,
} = require("../controllers/client.controller");

routes.get("/", getAllClients);
routes.post("/", createClient);
routes.delete("/:emailid", removeClient);
routes.put("/:emailid", updateClient);

module.exports = routes;
