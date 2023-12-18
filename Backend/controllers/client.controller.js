const CLIENT__MODEL = require("../models/clients.model");

const getAllClients = async (req, res) => {
  try {
    const data = await CLIENT__MODEL.find({});
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

const createClient = async (req, res) => {
  const { firstname, lastname, email, mobno, project } = req.body;
  if (firstname === "" || lastname  === "" ||email  === "" || mobno === "" || project  === "" )  {
    res.status(401).json({message : "All fields are mandatory"})
  }
  
  const client = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    mobno: mobno,
    project: project,
  };
  try {
    const data = await CLIENT__MODEL.create(client);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

const removeClient = async (req, res) => {
  try {
    const { emailid } = req.params;

    await CLIENT__MODEL.deleteOne({ email: emailid });
    res.status(200).send({ message: "deleted successfully" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

const updateClient = async (req, res) => {
  try {
    const UPCOMING__UPDATED__DATA = req.body;
    const { emailid } = req.params;
    await CLIENT__MODEL.updateOne(
      { email: emailid },
      { $set: { ...UPCOMING__UPDATED__DATA } }
    );
    res.send({ message: "Succesfully updated" });
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

module.exports = { createClient, removeClient, updateClient, getAllClients };
