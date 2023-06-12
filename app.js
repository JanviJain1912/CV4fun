// for express
const express = require("express");
const app = express();

const dotenv = require("dotenv").config();

// for db auth
const db = require("./routes/auth");

// for cookies
const cookie = require("cookie-parser");
app.use(cookie());

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));

// for ejs templates
app.set("view engine", "ejs");
app.set("views" , "./views");

// parse json bodies as sent by api clients
app.use(express.json());

//  for database connection
db.connect(function(error){
    if(error){
        console.log(error)
    }
    else{
        console.log("MYSQL Connected...")
    }
});

// Define routes
app.use("/" , require("./routes/pages"));
app.use("/api", require("./controllers/auth"));

app.listen(5000, function(){
    console.log("server started on port 5000")
});


