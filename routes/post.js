const express = require('express');
const postController = require('../controllers/post-controller')
const { body } = require('express-validator');

const router = express.Router();

router.get('/posts',postController.getPosts);
router.get('/post/:id',postController.getPostById);
router.post('/post',[
    body('title').isLength({min:1}),
    body('userId').isLength({min:1}),
    body('image').isLength({min:1}),
    body('body').isLength({min:1})
],postController.createPost);

module.exports = router;