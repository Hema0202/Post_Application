const router = require('express').Router();
const{
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
} = require('./controller/userController');
const signupController = require('./controller/signupController');
const loginController = require('./controller/loginController');
const auth = require('./middlewares/auth')

function testHandler(req,res){
    res.send('everything working fine');
}

router.get('/test',auth,testHandler);

router.post('/signup',signupController);

router.post('/login', loginController);

router.get('api/user/create',createUser);

router.get('api/user/get/:id',auth, getUserById);

router.get('api/user/getAll',getUsers);

router.put('api/user/update/:id',auth ,updateUser);

router.delete('api/user/delete/:id',auth, deleteUser);

router.all('/*',(req,res)=>res.status(404).send({
    status: false,
    message: 'Not found'
}))


module.exports = router;