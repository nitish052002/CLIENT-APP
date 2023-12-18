const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstname: {type : String , require : true},
  lastname: String,
  email: {type : String ,require : true, unique : true},
  mobno: {type : String ,require : true, unique : true},
  project: String,
});


 



module.exports =  mongoose.model("clients" , clientSchema)
