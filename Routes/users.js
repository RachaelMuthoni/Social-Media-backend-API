const router = require('express').Router();

const {home,login,register} = require('../controller/authController')


router.get('/', home)
router.post('/register', register)
router.post('/login', login)

module.exports= {router};
