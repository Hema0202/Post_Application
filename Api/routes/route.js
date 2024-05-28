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

router.post('/user/login', login);

router.post('/user/create',createUser);

router.get('/user/get/:id', getUserById);

router.get('/user/getAll',getUsers);

router.put('/user/update/:id',updateUser);

router.delete('/user/delete/:id', deleteUser);

router.all('/*',(req,res)=>res.status(404).send({
    status: false,
    message: 'Not found'
}))


module.exports = router;