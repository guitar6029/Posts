const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/add', (req,res)=>{
    res.render('../views/posts/add');
});

router.get('/edit/:id', async (req,res)=>{
    const post = await Post.findById(req.params.id)
    res.render('../views/posts/edit',{ post:post });
});


router.get('/:id', async (req, res) => {
    
    const post = await Post.findById(req.params.id);
    if (post == null) res.redirect('/');
    res.render('../views/posts/posts', { post: post });
    
    
});

router.post('/', async (req, res) => {
    
    let post = new Post({
        title: req.body.title,
        text: req.body.text,
    })
    try {
       
        post = await post.save();
       res.redirect(`/posts/${post.id}`);

    } catch (error) {
        res.render('../views/posts/add', { post : post });
    }

});


router.put('/:id', async (req,res, next)=>{
  req.post = await Post.findById(req.params.id)
  next()
}, savePostAndRedirect('edit') );

router.delete('/:id', async (req,res)=>{

    await Post.findByIdAndDelete(req.params.id);
    res.redirect('../');
});

function savePostAndRedirect(path){
    return async (req,res) => {
        let post = req.post
        post.title = req.body.title
        post.text = req.body.text
        try{
            post = await post.save()
            res.redirect('/');
        } catch (e){
            res.render('/');
        }
    }
}



module.exports = router;