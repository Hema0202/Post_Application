const router = require('express').Router();
const{
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
} = require('./../controller/userController');

router.get('/test',(req,res) => res.send('Working fine'));

router.get('/create',createUser);

router.get('/user/:id', getUserById);

router.get('/users',getUsers);

router.put('user/:id',updateUser);

router.delete('/user/:id', deleteUser);

router.all('/*',(req,res)=>res.status(404).send({
    status: false,
    message: 'Not found'
}))


module.exports = router;