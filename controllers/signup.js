const db = require("../routes/auth");
const bcrypt = require("bcryptjs");

const signup = async(req, res) => {

    const {email, password:Npassword } = req.body
    if (!email || !Npassword ) return res.json({status : "error" , error : "please enter your email and password"});
    else{
        db.query("SELECT email FROM users WHERE email = ?" , [email] , async(err , result) => {

            if(err) throw err;
            if(result[0]) return res.json({ status : "error" , error : "Email has already been registered" });
            else{
                const password = await bcrypt.hash(Npassword, 8);
                db.query("INSERT INTO users SET ?",{email:email , password: password}, (error, results) => {
                    if(error) throw error;
                    return res.json({ status : "success" , success : "User has already been registered"});
                });
            }
        });
    }
};


module.exports = signup;