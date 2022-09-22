const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/codeial_development");

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"));

db.once('open',function(){
    console.log("connected to databse");
})

module.exports=db;