const Post = require('../models/post');
const { validationResult } = require('express-validator');
const post = require('../models/post');

const getPosts = async  (req,res) => {
    let page = req.query.page;
    if(!page || page == 0){
        page = 1;
    }
    const Perpage = 10;
    let pagination = (page * 10) - Perpage;
    let posts;
   try{
    posts = await  Post.find().skip(pagination).limit(Perpage);
   }catch(err){
    return res.status(500).json({
        message:"error fetching the posts"
    })
   }
   let allPosts;
   try{
     allPosts = await Post.find();
   }catch(err){
    res.status(500).json({
        message:"error fetching the posts"
    })
   }
   return res.json({
       posts:posts.map(post => post.toObject({getters:true})),
       postCount:allPosts.length
   })
}

const getPostById = async (req,res) => {
    let post;
    try{
         post = await Post.findById(req.params.id);
         return res.json({
             post:post.toObject({getters:true})
         })
    }catch(err){
        return res.status(500).json({
            message:"error fetching post by id"
        })
    }
  
}

const createPost = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {userId,image,title,body} = req.body;
    try{
      await Post.create({
          userId:userId,
          image,
          title,
          body
      });
     return res.status(201).json({
        message:"post created"
    })  
    }catch(err){
     return res.status(500).json({
          message:"error creating post"
      })  
    }
}

exports.getPosts = getPosts;
exports.createPost = createPost;
exports.getPostById = getPostById;