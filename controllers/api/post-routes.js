const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

router.get('/', (req,res)=>{
    Post.findAll({
        order:[['created_at', 'DESC']],
        include:{
            model:Post,
            attributes:['username']
        }
    }).then(dbPostData => {
        res.json(dbPostData)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id',(req,res) =>{
    Post.findOne({
        where:{
            id:req.params.id
        },
        include:{
            model:User,
            attributes:['username']
        }
    }).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message:'Could not find the post with this id'})
        }
        else {
            res.json(dbPostData)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

//create a post
router.post('/', (req,res) => {
    Post.create({
        where:{
            title:req.body.title,
            post_url:req.body.post_url,
            user_id:req.body.user_id
        }
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


//update post
router.put('/:id', (req,res) => {
    Post.update(
    {
       title:req.body.title
    },
    {   
    Where: {
            id:req.params.id
        }
    }
).then(dbPostData => {
    if(!dbPostData) {
        res.status(404).json({message:'no post found with this id'})
    }
    else {
        res.json(dbPostData)
    }
})    
.catch(err => {
    console.log(err)
    res.status(500).json(err)
})

})

router.delete('/:id',(req,res)=> {
    Post.delete({
        where:{
            id:req.param.id
        }
    }).then(dbPostData=> {
        if(!dbPostData) {
            res.status(400).json({message:'this post does not exist'})
        }
        else {
            res.json(dbPostData)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
    
})


module.exports = router