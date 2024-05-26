const router = require('express').Router();
const{
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
} = require('./controller/userController');

router.get('/test',(req,res) => res.send('Working fine'));

router.get('api/user/create',createUser);

router.get('api/user/get/:id', getUserById);

router.get('api/user/getAll',getUsers);

router.put('api/user/update/:id',updateUser);

router.delete('api/user/delete/:id', deleteUser);

router.all('/*',(req,res)=>res.status(404).send({
    status: false,
    message: 'Not found'
}))


module.exports = router;