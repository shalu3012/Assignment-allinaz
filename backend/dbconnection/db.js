const mongoose=require("mongoose")

//Establishing connection to mongoose.
mongoose.connect("mongodb://localhost:27017/Calcs", {
    useNewUrlParser: true,
  })
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Mongoose Connected successfully");
  });
module.exports=db