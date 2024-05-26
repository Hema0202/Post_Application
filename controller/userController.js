const userModel = require('./../model/userModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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

        let emp = await userModel.findById(id).select({
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

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
}