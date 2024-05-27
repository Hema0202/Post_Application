const userModel = require("./../model/userModel");
const jwt = require("jsonwebtoken");

async function loginController(req, res){
    try {
        
       let data = req.body;
       let email = data.email;
       let password = data.password;

       if(!email)
        return res.send({
          status: false,
          message: "Please enter email",
        })

        if(!password)
            return res.send({
             status: false,
             message: 'Please enter password',
            });

        const user = await userModel.findOne({
            email: email,
        });

        if(!user) {
            return res.send({
                status: false,
                message: `${email} is not registered!`,
            });
        }

        if(user.password != password){
            return res.send({
                status: false,
                message: "Your password is incorrect",
            });
        }

        const token = jwt.sign(
            {
                email: user.email,
                name: user.name,
            },
            process.env.SECRET_KEY
        );

        res.send({
            status: true,
            message: "You are logged in!",
            token: token,
        });
        
    } catch(err) {
        res.send({
            status: false,
            message: err.message,
        })
    }
}

module.exports = loginController;