const userModel = require('./../model/userModel');

async function signupController(req,res){
    try {
       
        let data = req.body;
        console.log(data);

        let {name, email, password} = data;

        if(!name){
            return res.send({
                status:false,
                message: 'name is required'
            })
        }
        if(!email){
            return res.send({
                status:false,
                message: 'email is required'
            })
        }
        if(!password){
            return res.send({
                status:false,
                message: 'password is required'
            })
        }

        //handle unique email
        const oldUser = await userModel.findOne({
            email: email,
        });

        if(oldUser){
            return res.send({
                status: false,
                message: `${email} is already registered`,
            });
        }

        const user = await userModel.create({
            name: name,
            email: email,
            password: password,
        });
        res.send({
            status: true,
            data: user,
            message: "You are registered successfully",
        });

    } catch(err) {
        res.send({
            status: false,
            message: err.message,
        });
    }
}

module.exports = signupController;