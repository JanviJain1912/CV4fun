const express =  require("express");
const loggedIn = require("../controllers/loggedin");
const authController = require("../controllers/auth");
const logout = require("../controllers/logout");
const { spawn } = require('child_process');
const router = express.Router();

router.get("/", loggedIn, (req,res) => {
    if (req.user){
        res.render("index", {status:"loggedIn", user: req.user});
    }
    else{
        res.render("index", {status:"no", user: "nothing"});
    }
   
});
router.get("/login",function(req,res){
    res.sendFile("login.html", {root: "./public/"});
});

router.get("/signup",function(req,res){
    res.sendFile("signup.html", {root: "./public"});

});

// Define a route that executes a Python script
router.get('/python', (req, res) => {
    const pythonProcess = spawn('python', ['cartoon.py']);
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Data from Python script: ${data}`);
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from Python script: ${data}`);
    });
    pythonProcess.on('exit', (code) => {
      console.log(`Python script exited with code ${code}`);
    });
});

// Define a route that executes a Python script
router.get('/tom', (req, res) => {
    const pythonProcess = spawn('python', ['talking-tom.py']);
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Data from Python script: ${data}`);
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from Python script: ${data}`);
    });
    pythonProcess.on('exit', (code) => {
      console.log(`Python script exited with code ${code}`);
    });
});

// Define a route that executes a Python script
router.get('/emoji', (req, res) => {
  const pythonProcess = spawn('python', ['GUI.py']);
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Data from Python script: ${data}`);
  });
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python script: ${data}`);
  });
  pythonProcess.on('exit', (code) => {
    console.log(`Python script exited with code ${code}`);
  });
});



// router.get('/profile', authController.isLoggedIn, (req, res) => {
//     if (req.user) {
//         res.sendFile("profile.html", { root: './public/' })
//     } else {
//         res.sendFile("login.html", { root: './public/' });
//     }
// })

router.get("/logout" , logout);
// when ever you use logout button use href="/api/logout"
module.exports = router;