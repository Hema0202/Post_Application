const router = require('express').Router();
const{
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    login
} = require('./controller/userController');

const auth = require('./middlewares/auth')

function testHandler(req,res){
    res.send('everything working fine');
}

router.get('/test',testHandler);

//Public routes
router.post('/user/login', login);

router.post('/user/create',createUser);

//Protected routes
router.get('/user/get/:id',auth, getUserById);

router.get('/user/getAll',auth, getUsers);

router.put('/user/update/:id',auth, updateUser);

router.delete('/user/delete/:id',auth, deleteUser);

router.all('/*',(req,res)=>res.status(404).send({
    status: false,
    message: 'Not found'
}))


module.exports = router;