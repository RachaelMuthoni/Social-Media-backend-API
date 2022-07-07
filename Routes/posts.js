const router1 = require('express').Router();
const {Create,View} = require('../controller/postController')

router1.post('/createPost', Create)
router1.get('/viewPost', View)

module.exports= {router1};
