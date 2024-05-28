const userModel = require('./../model/userModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');

async function createUser(req, res){
    try {
      let data = req.body;
      if(!data) return res.status(400).send({
        status: false,
        message: 'Please provide user details'
      })

      let fields = [
        'name',
        'email',
        'password'
      ];

      //check all the fields are available in req body
      for(let field of fields) {
        if(data[field]) data[field] = data[field].toString().trim();
        if(!data[field]) return res.status(400).send({
            satus: false,
            message:`${field} is required`
        })
      }

      //Handle Unique email
      let oldUser = await userModel.findOne({ email: data.email});

      if(oldUser) return res.status(400).send({
        status: false,
        message:`${data.email} is already registered`
      })

      //Hash the password
      const hash = await bcrypt.hash(password, 10);

      //Store in database
      await userModel.create(data);

      return res.status(201).send({
        status:true,
        message: 'Your profile is created successfully'
      })

    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


async function getUserById(req, res){
    try {
        
        let id = req.params.id;

        if(!ObjectId.isValid(id)) return res.status(400).send({
            status:false,
            message: 'Invalid user id'
        })

        let user = await userModel.findById(id).select({
            name:1,
            email:1
        });

        if(!user) return res.status(404).send({
            status: false,
            message: 'User not found'
        })

        return res.status(200).send({
            status:true,
            data: user
        })

    } catch (err) {
        res.status(500).send({
            status:false,
            message: err.message
        })
    }
}

async function getUsers(req, res){
    try {
        
        let users = await userModel.find({isDeleted: false}).select({
            name:1,
            email:1
        });

        return res.status(200).send({
            status: true,
            data: users
        })

    } catch (err) {
        res.status(500).send({
            status:false,
            message:err.messgae
        })
    }
}

async function updateUser(req, res){
    try {
        
        // Take user id and data to update
        let id = req.params.id;
        let data = req.body;

        // Validate id
        if(!ObjectId.isValid(id)) return res.status(400).send({
            status:false,
            message: 'Invalid user id'
        })

        let fields = [
            'name'
        ]

        let isAnyField = false;

        for(let field of fields){
            if(data[field]) data[field] = data[field].toString().trim();
            if(data[field]) isAnyField = true;
        }

        if(!isAnyField) return res.status(400).send({
           status: false,
           message: 'Please provide any field that you want to update'
        })

        //update in database
        let updatedData = await userModel.findOneAndUpdate({
            _id: id
        },data,
        {
            new:true
        })

        if(!updatedData) return res.status(400).send({
            status: false,
            message: 'Incorrect id'
        })

        return res.status(200).send({
            status: true,
            message: 'Updated Successfully',
            data: updatedData
        })
        
            
    } catch(err) {
        res.status(500).send({
            status:false,
            message:err.message
        })
    }
}


async function deleteUser(req, res){
    try {
        
        //Take user id
        let id = req.params.id;

        //Validate user id
        if(!ObjectId.isValid(id)) return res.status(400).send({
            status: false,
            message: 'Invalid user id'
        })

        let user = await userModel.findByIdAndUpdate({
            _id: id
        },{
            isDeleted: true
        })

        if(!user) return status(400).send({
            status: false,
            message: 'User not found'
        })

        return res.status(200).send({
            status:true,
            message: 'User has been deleted successfully.'
        })
    } catch(err) {
        res.status(500).send({
            status:false,
            message: err.message
        })
    }
}


async function login(req, res){
    try {
        
       let data = req.body;
       let email = data.email;
       let password = data.password;

       if(!email)
        return res.status(400).send({
          status: false,
          message: "Please enter email",
        })

        if(!password)
            return res.send({
             status: false,
             message: 'Please enter password',
            });

        // Find any user is available with this email
        const user = await userModel.findOne({
            email: email,
        });

        if(!user) {
            return res.status(404).send({
                status: false,
                message: `${email} is not registered!`,
            });
        }

        //Match the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).send({
            status: false,
            message: 'Password is incorrect'
        })

        const token = jwt.sign(
            {
                email: user.email,
                name: user.name,
            },
            process.env.SECRET_KEY,
            {
               expiresIn: "1h"
            }
        );

        res.send({
            status: true,
            message: "You are logged in!",
            token: token,
        });
        
    } catch(err) {
        res.status(500).send({
            status: false,
            message: err.message,
        })
    }
}


module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    login
}