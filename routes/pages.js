const express =  require("express");
const loggedIn = require("../controllers/loggedin");
const logout = require("../controllers/logout");
const router = express.Router();

router.get("/", loggedIn, (req,res) => {
    if (req.user){
        res.render("index", {status:"loggedIn", user: req.user});
    }
    else{
        res.render("index", {status:"no", user: "nothing"});
    }
   
});
// router.get("/", loggedIn, (req,res) => {
//     if (!req.user) return res.redirect('/login')
//     if(req.baseUrl =='/main')return res.sendFile("main.html", {root: "./public/"})
//     res.render("index", {status:"loggedIn", user: req.user});
// });
router.get("/login",function(req,res){
    res.sendFile("login.html", {root: "./public/"});
});

router.get("/signup",function(req,res){
    res.sendFile("signup.html", {root: "./public"});
});

router.get("/logout" , logout);
// when ever you use logout button use href="/api/logout"
module.exports = router;